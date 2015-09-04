import Modal from 'flarum/components/Modal';
import Group from 'flarum/models/Group';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';
import SelectDropdown from 'flarum/components/SelectDropdown';
import GroupBadge from 'flarum/components/GroupBadge';

export default class DefaultGroupSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    const user = app.session.user;

    this.defaultGroup = app.config['hyn.default_group.group'] || Group.MEMBER_ID;
    this.group = app.store.getById('groups', this.defaultGroup);

    this.groups = app.store.all('groups')
        .filter(group => [Group.GUEST_ID].indexOf(group.id()) === -1)
        .map(group => Button.component({
            children: [GroupBadge.component({group, label: null}), ' ', group.namePlural()],
            active: group.id() == this.defaultGroup ? true : null,
            onclick:  (e) => {
              e.stopPropagation();
              this.save(group.id());
            }
        }));
  }

  className() {
    return 'DefaultGroupSettingsModal Modal--small';
  }

  title() {
    return 'Default group Settings';
  }

  content() {
    return (
      <div className="Modal-body" style="min-height: 400px">
        <div className="Form">


          <div className="Form-group">
            <label>Default group</label>
            <div className="Form-group">

              {SelectDropdown.component({
                  children: this.groups
              })}

            </div>
          </div>

        </div>
      </div>
    );
  }

  save(groupId) {
    this.loading = true;

    saveConfig({
      'hyn.default_group.group': groupId
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
