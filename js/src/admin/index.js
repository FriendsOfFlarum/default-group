import DefaultGroupSettingsPage from './components/DefaultGroupSettingsPage';

app.initializers.add('fof/default-group', () => {
    app.extensionData.for('fof-default-group').registerPage(DefaultGroupSettingsPage);
});
