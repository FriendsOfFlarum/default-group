<?php namespace Hyn\DefaultGroup\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Events\UserWasActivated;
use Flarum\Core\Groups\Group;
use Flarum\Core\Settings\SettingsRepository;

class AddDefaultGroup
{
    /**
     * SettingsRepository
     */
    protected $settings;

    public function __construct(SettingsRepository $settings) {
        $this->settings = $settings;
    }
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserWasActivated::class, [$this, 'addGroup']);
    }
    public function addGroup(UserWasActivated $event) {
        $event->user->groups()->attach($this->settings->get('hyn.default_group.group', Group::MEMBER_ID));
    }
}