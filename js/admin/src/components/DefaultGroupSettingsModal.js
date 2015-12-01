import SettingsModal from 'flarum/components/SettingsModal';
import Group from 'flarum/models/Group';
import SelectDropdown from 'flarum/components/SelectDropdown';

export default class DefaultGroupSettingsModal extends SettingsModal {
    className() {
        return 'DefaultGroupSettingsModal Modal--small';
    }

    title() {
        return 'Default group Settings';
    }

    form() {
        this.defaultGroup = this.setting('hyn.default_group.group') || Group.MEMBER_ID;
        this.groups = app.store.all('groups')
            .filter(group => [Group.GUEST_ID].indexOf(group.id()) === -1);
        return [
            <div className="Form-group">
                <label>Default group</label>
                <select name="defaultGroup" bidi={this.defaultGroup}>
                    {this.groups.map(group =>
                    <option value={group.id()}>
                        {group.namePlural()}
                    </option>
                    )}
                </select>
            </div>
        ];
    }
}
