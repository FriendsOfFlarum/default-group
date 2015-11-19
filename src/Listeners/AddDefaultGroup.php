<?php namespace Hyn\DefaultGroup\Listeners;

use Flarum\Event\UserWasActivated;
use Flarum\Core\Group;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

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

    public function __construct(SettingsRepositoryInterface $settings) {
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
        if($this->defaultGroup == Group::MEMBER_ID) {
            return;
        }
        $event->user->groups()->attach($this->defaultGroup);
    }
}