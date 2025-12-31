import app from 'flarum/admin/app';
import DefaultGroupSettingsPage from './components/DefaultGroupSettingsPage';

app.initializers.add('fof/default-group', () => {
  app.registry.for('fof-default-group').registerPage(DefaultGroupSettingsPage);
});
