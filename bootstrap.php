<?php namespace Hyn\DefaultGroup;

require __DIR__.'/vendor/autoload.php';

use Illuminate\Events\Dispatcher;

return function(Dispatcher $events) {
    $events->subscribe(Listeners\AddApiAttributes::class);
    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddDefaultGroup::class);
};