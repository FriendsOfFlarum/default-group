<?php namespace Hyn\DefaultGroup\Listeners;

use Flarum\Event\PrepareApiAttributes;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
    }

    public function addAttributes(PrepareApiAttributes $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            $event->attributes['defaultUserGroup'] = $this->settings->get('hyn.default_group.group');
        }
    }
}
