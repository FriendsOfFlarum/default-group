System.register('hyn/default-group/components/DefaultGroupSettingsModal', ['flarum/components/Modal', 'flarum/models/Group', 'flarum/components/Button', 'flarum/utils/saveConfig', 'flarum/components/SelectDropdown', 'flarum/components/GroupBadge'], function (_export) {
  'use strict';

  var Modal, Group, Button, saveConfig, SelectDropdown, GroupBadge, DefaultGroupSettingsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumModelsGroup) {
      Group = _flarumModelsGroup['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveConfig) {
      saveConfig = _flarumUtilsSaveConfig['default'];
    }, function (_flarumComponentsSelectDropdown) {
      SelectDropdown = _flarumComponentsSelectDropdown['default'];
    }, function (_flarumComponentsGroupBadge) {
      GroupBadge = _flarumComponentsGroupBadge['default'];
    }],
    execute: function () {
      DefaultGroupSettingsModal = (function (_Modal) {
        babelHelpers.inherits(DefaultGroupSettingsModal, _Modal);

        function DefaultGroupSettingsModal() {
          babelHelpers.classCallCheck(this, DefaultGroupSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          babelHelpers.get(Object.getPrototypeOf(DefaultGroupSettingsModal.prototype), 'constructor', this).apply(this, args);

          var user = app.session.user;

          this.defaultGroup = this.setting('hyn.default_group.group') || Group.MEMBER_ID;
          this.group = app.store.getById('groups', this.defaultGroup);

          this.groups = app.store.all('groups').filter(function (group) {
            return [Group.GUEST_ID].indexOf(group.id()) === -1;
          });
        }

        babelHelpers.createClass(DefaultGroupSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'DefaultGroupSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Default group Settings';
          }
        }, {
          key: 'content',
          value: function content() {
            var _this = this;

            return m(
              'div',
              { className: 'Modal-body', style: 'min-height: 400px' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    'Default group'
                  ),
                  m(
                    'div',
                    { className: 'Form-group' },
                    this.groups.map(function (group) {
                      return _this.radio(group);
                    })
                  )
                )
              )
            );
          }
        }, {
          key: 'radio',
          value: function radio(option) {
            var className = 'Checkbox ' + (option.id() == this.defaultGroup ? 'on' : 'off');
            if (this.loading) className += ' loading';
            return m(
              'label',
              { className: className },
              m('input', { type: 'radio',
                value: option.id(),
                checked: option.id() == this.defaultGroup,
                onchange: (m.withAttr('value'), this.save.bind(this))
              }),
              GroupBadge.component({ group: option }),
              ' ',
              option.namePlural()
            );
          }
        }, {
          key: 'save',
          value: function save(e, groupId) {
            var _this2 = this;

            this.loading = true;
            saveConfig({
              'hyn.default_group.group': e.target.value
            }).then(function () {
              return _this2.hide();
            }
            //,
            //() => m.redraw()
            );
          }
        }]);
        return DefaultGroupSettingsModal;
      })(Modal);

      _export('default', DefaultGroupSettingsModal);
    }
  };
});;
System.register('hyn/default-group/main', ['flarum/extend', 'flarum/app', 'hyn/default-group/components/DefaultGroupSettingsModal'], function (_export) {
  'use strict';

  var extend, app, DefaultGroupSettingsModal;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_hynDefaultGroupComponentsDefaultGroupSettingsModal) {
      DefaultGroupSettingsModal = _hynDefaultGroupComponentsDefaultGroupSettingsModal['default'];
    }],
    execute: function () {

      app.initializers.add('hyn-default-group', function (app) {
        app.extensionSettings['hyn-default-group'] = function () {
          return app.modal.show(new DefaultGroupSettingsModal());
        };
      });
    }
  };
});