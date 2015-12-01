System.register('hyn/default-group/components/DefaultGroupSettingsModal', ['flarum/components/SettingsModal', 'flarum/models/Group', 'flarum/components/SelectDropdown'], function (_export) {
    'use strict';

    var SettingsModal, Group, SelectDropdown, DefaultGroupSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal['default'];
        }, function (_flarumModelsGroup) {
            Group = _flarumModelsGroup['default'];
        }, function (_flarumComponentsSelectDropdown) {
            SelectDropdown = _flarumComponentsSelectDropdown['default'];
        }],
        execute: function () {
            DefaultGroupSettingsModal = (function (_SettingsModal) {
                babelHelpers.inherits(DefaultGroupSettingsModal, _SettingsModal);

                function DefaultGroupSettingsModal() {
                    babelHelpers.classCallCheck(this, DefaultGroupSettingsModal);
                    babelHelpers.get(Object.getPrototypeOf(DefaultGroupSettingsModal.prototype), 'constructor', this).apply(this, arguments);
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
                    key: 'form',
                    value: function form() {
                        this.defaultGroup = this.setting('hyn.default_group.group') || Group.MEMBER_ID;
                        this.groups = app.store.all('groups').filter(function (group) {
                            return [Group.GUEST_ID].indexOf(group.id()) === -1;
                        });
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                'Default group'
                            ),
                            m(
                                'select',
                                { name: 'defaultGroup', bidi: this.defaultGroup },
                                this.groups.map(function (group) {
                                    return m(
                                        'option',
                                        { value: group.id() },
                                        group.namePlural()
                                    );
                                })
                            )
                        )];
                    }
                }]);
                return DefaultGroupSettingsModal;
            })(SettingsModal);

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