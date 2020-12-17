import ExtensionPage from 'flarum/components/ExtensionPage';
import Button from 'flarum/components/Button';
import Dropdown from 'flarum/components/Dropdown';
import icon from 'flarum/helpers/icon';
import Group from 'flarum/models/Group';

export default class DefaultGroupSettingsPage extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);

        this.selected = this.setting('fof-default-group.group');
    }

    content() {
        const icons = {
            3: 'fas fa-user',
        };
        const group = app.store.getById('groups', this.selected()) || app.store.getById('groups', Group.MEMBER_ID);

        return [
            <div className="container">
                <div className="FoFDefaultGroupSettingsPage">
                    <div className="Form-group">
                        <p>{app.translator.transChoice('fof-default-group.admin.settings.info')}</p>

                        <Dropdown label={[icon(group.icon() || icons[group.id()]), '\t', group.namePlural()]} buttonClassName="Button Button--danger">
                            {app.store
                                .all('groups')
                                .filter((g) => g.id() != 2)
                                .map((g) =>
                                    Button.component(
                                        {
                                            active: group.id() === g.id(),
                                            disabled: group && group.id() === g.id(),
                                            icon: g.icon() || icons[g.id()],
                                            onclick: () => {
                                                this.selected(g.id());
                                            },
                                        },
                                        g.namePlural()
                                    )
                                )}
                        </Dropdown>
                    </div>
                    {this.submitButton()}
                </div>
            </div>,
        ];
    }
}
