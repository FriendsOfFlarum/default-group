import app from 'flarum/admin/app';
import Extend from 'flarum/common/extenders';
import type Group from 'flarum/common/models/Group';

export default [
  new Extend.Admin() //
    .setting(() => {
      const groups = app.store.all<Group>('groups').filter((g) => g.id() !== '2');
      const options: Record<string, string> = {};

      groups.forEach((g) => {
        options[g.id()!] = g.namePlural();
      });

      return {
        setting: 'fof-default-group.group',
        type: 'select',
        label: app.translator.trans('fof-default-group.admin.settings.label'),
        help: app.translator.trans('fof-default-group.admin.settings.info'),
        default: '3', // Member group
        options,
      };
    }),
];
