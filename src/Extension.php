<?php namespace Hyn\DefaultGroup;

use Flarum\Support\Extension as BaseExtension;
use Illuminate\Events\Dispatcher;

class Extension extends BaseExtension
{
    public function listen(Dispatcher $events)
    {
        $events->subscribe(Listeners\AddApiAttributes::class);
        $events->subscribe(Listeners\AddClientAssets::class);
        $events->subscribe(Listeners\AddDefaultGroup::class);
    }

    public function boot()
    {
    }
}
