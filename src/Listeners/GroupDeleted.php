<?php

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
