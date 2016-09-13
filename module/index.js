var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
OS.installModule('Calendar', {
  Widget: Widget,
  Shortcut: Shortcut
});
