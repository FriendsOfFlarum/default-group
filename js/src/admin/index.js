import DefaultGroupSettingsModal from './components/DefaultGroupSettingsModal';

app.initializers.add('fof/default-group', () => {
    app.extensionSettings['fof-default-group'] = () => app.modal.show(DefaultGroupSettingsModal);
});
