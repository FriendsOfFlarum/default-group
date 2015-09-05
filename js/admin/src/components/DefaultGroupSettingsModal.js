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
        .filter(group => [Group.GUEST_ID].indexOf(group.id()) === -1);
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

              {this.groups.map(group =>
                this.radio(group)
              )}


            </div>
          </div>

        </div>
      </div>
    );
  }

  radio(option) {
    let className = 'Checkbox ' + (option.id() == this.defaultGroup ? 'on' : 'off');
    if (this.loading) className += ' loading';
    return (
      <label className={className}>
        <input type="radio"
          value={option.id()}
          checked={option.id() == this.defaultGroup}
          onchange={m.withAttr('value'), this.save.bind(this)}
          />
        {GroupBadge.component({group: option})} {option.namePlural()}
      </label>
    );
  }

  save(e, groupId) {
    this.loading = true;
    saveConfig({
      'hyn.default_group.group': e.target.value
    }).then(
      () => this.hide()
        //,
      //() => m.redraw()
    );
  }
}
