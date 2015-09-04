import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveConfig from 'flarum/utils/saveConfig';

export default class DefaultGroupSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.defaultGroup = m.prop(app.config['hyn.default_group.group'] || '');
  }

  className() {
    return 'DefaultGroupSettingsModal Modal--small';
  }

  title() {
    return 'Default group Settings';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>Default group</label>
            <input className="FormControl" value={this.defaultGroup()} oninput={m.withAttr('value', this.defaultGroup)}/>
          </div>
          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary DefaulgGroupSettingsModal-save',
              loading: this.loading,
              children: 'Save Changes'
            })}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveConfig({
      'hyn.default_group.group': this.defaultGroup()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
