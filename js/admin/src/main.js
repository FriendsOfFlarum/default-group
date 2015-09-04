import { extend } from 'flarum/extend';
import app from 'flarum/app';

import DefaultGroupSettingsModal from 'default-group/components/DefaultGroupSettingsModal';

app.initializers.add('default-group', app => {
  app.extensionSettings.default_group = () => app.modal.show(new DefaultGroupSettingsModal());
});
