<?php

/*
 * This file is part of fof/default-group.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\DefaultGroup\Listeners;

use Flarum\Group\Event\Deleted;
use Flarum\Settings\SettingsRepositoryInterface;

class GroupDeleted
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function handle(Deleted $event)
    {
        $defaultGroupId = $this->settings->get('fof-default-group.group');

        if ($defaultGroupId === $event->group->id) {
            $this->settings->set('fof-default-group.group', null);
        }
    }
}
