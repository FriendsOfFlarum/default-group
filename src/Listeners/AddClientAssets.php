<?php namespace Hyn\DefaultGroup\Listeners;

use Flarum\Event\ConfigureClientView;
use Flarum\Events\RegisterLocales;
use Flarum\Events\BuildClientView;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAssets']);
    }

    public function addAssets(ConfigureClientView $event)
    {
        if($event->isAdmin()) {
            $event->addAssets([
                __DIR__ . '/../../js/admin/dist/extension.js',
                __DIR__ . '/../../less/admin/extension.less'
            ]);

            $event->addBootstrapper('hyn/default-group/main');
        }
    }
}
