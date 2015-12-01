import { extend } from 'flarum/extend';
import app from 'flarum/app';

import DefaultGroupSettingsModal from 'hyn/default-group/components/DefaultGroupSettingsModal';

app.initializers.add('hyn-default-group', app => {
  app.extensionSettings['hyn-default-group'] = () => app.modal.show(new DefaultGroupSettingsModal());
});
