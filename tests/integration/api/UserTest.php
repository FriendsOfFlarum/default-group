<?php

/*
 * This file is part of fof/default-group.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\DefaultGroup\tests\integration\api;

use Flarum\Group\Group;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;

class UserTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-default-group');
        $this->setting('mail_driver', 'log');
    }

    /**
     * @test
     */
    public function new_activated_user_belongs_to_member_group_by_default()
    {
        $response = $this->send(
            $this->request(
                'POST',
                '/api/users',
                [
                    'authenticatedAs' => 1,
                    'json'            => [
                        'data' => [
                            'attributes' => [
                                'username'         => 'test',
                                'password'         => 'too-obscure',
                                'email'            => 'test@machine.local',
                                'isEmailConfirmed' => 1,
                            ],
                        ],
                    ],
                ]
            )
        );

        $this->assertEquals(201, $response->getStatusCode());

        /** @var User $user */
        $user = User::query()->with('groups')->where('username', 'test')->firstOrFail();

        $this->assertEquals(1, $user->is_email_confirmed);

        // The `Member` group is the default group for new users, and does not appear in the `groups` relationship.
        $this->assertEmpty($user->groups->pluck('id')->all());
    }

    /**
     * @test
     */
    public function new_activated_user_belongs_to_default_selected_group()
    {
        $this->setting('fof-default-group.group', Group::MODERATOR_ID);

        $response = $this->send(
            $this->request(
                'POST',
                '/api/users',
                [
                    'authenticatedAs' => 1,
                    'json'            => [
                        'data' => [
                            'attributes' => [
                                'username'         => 'test2',
                                'password'         => 'too-obscure',
                                'email'            => 'test2@machine.local',
                                'isEmailConfirmed' => 1,
                            ],
                        ],
                    ],
                ]
            )
        );

        $this->assertEquals(201, $response->getStatusCode());

        /** @var User $user */
        $user = User::query()->with('groups')->where('username', 'test2')->firstOrFail();

        $this->assertEquals(1, $user->is_email_confirmed);

        $this->assertEquals([Group::MODERATOR_ID], $user->groups->pluck('id')->all());
    }
}
