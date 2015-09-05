<?php namespace Hyn\DefaultGroup\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Events\UserWasActivated;
use Flarum\Core\Groups\Group;
use Flarum\Core\Settings\SettingsRepository;

class AddDefaultGroup
{
    /**
     * @var SettingsRepository
     */
    protected $settings;

    /**
     * @var int
     */
    protected $defaultGroup;

    public function __construct(SettingsRepository $settings) {
        $this->settings = $settings;

        $this->defaultGroup = (int) $this->settings->get('hyn.default_group.group', Group::MEMBER_ID);
    }

    /**
     * Subscribe to event dispatcher
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(UserWasActivated::class, [$this, 'addGroup']);
    }

    /**
     * Attaches the default group to the activated user
     * @param UserWasActivated $event
     */
    public function addGroup(UserWasActivated $event) {
        if($this->defaultGroup == Group::MEMBER_ID)
            return;
        $event->user->groups()->attach($this->defaultGroup);
    }
}