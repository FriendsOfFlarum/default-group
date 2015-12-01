<?php namespace Hyn\DefaultGroup;

use Illuminate\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->subscribe(Listeners\AddApiAttributes::class);
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddDefaultGroup::class);
};