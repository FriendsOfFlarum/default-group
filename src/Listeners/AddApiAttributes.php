<?php namespace Hyn\DefaultGroup\Listeners;

use Flarum\Events\ApiAttributes;
use Flarum\Events\RegisterApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Serializers\ForumSerializer;

class AddApiAttributes
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ApiAttributes::class, [$this, 'addAttributes']);
    }

    public function addAttributes(ApiAttributes $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            $event->attributes['defaultUserGroup'] = app('Flarum\Core\Settings\SettingsRepository')->get('hyn.default_group.group');
        }
    }
}
