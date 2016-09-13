(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var HForm = global.OS.HForm,
    Input = global.OS.Input;

var CalendarConfigsForm = React.createClass({displayName: "CalendarConfigsForm",
  handleSubmit: function (e) {
    e.preventDefault();

    var settings = this.props.settings;

        monthStyles = _.extend(
          _.clone(settings.monthStyles),
          { fontSize: this.refs.monthFontSize.getValue() }
        ),

        dayStyles = _.extend(
          _.clone(settings.dayStyles),
          { fontSize: this.refs.dayFontSize.getValue() }
        );

    settings = _.extend(
      _.clone(this.props.settings),
      {
        monthStyles: monthStyles,
        dayStyles: dayStyles
      }
    );

    this.props.onSubmit(settings);
  },

  render: function () {
    var settings = this.props.settings;

    return (
      React.createElement(HForm.Form, {onSubmit:  this.handleSubmit}, 
        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('calendar.day_font_size.label') }, 
          React.createElement(Input, {
            ref: "dayFontSize", 
            value:  settings.dayStyles.fontSize}
          )
        ), 

        React.createElement(HForm.Field, {
          labelText:  global.I18n.t('calendar.month_font_size.label') }, 
          React.createElement(Input, {
            ref: "monthFontSize", 
            value:  settings.monthStyles.fontSize}
          )
        ), 

        React.createElement(HForm.Submit, {value:  global.I18n.t('configurator.submit.value') })
      )
    );
  }
});

module.exports = CalendarConfigsForm;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
var Configurator = global.OS.Configurator,
    PositionAndSizeForm = global.OS.PositionAndSizeForm,
    Mixins = global.OS.Mixins,

    settings = require('./settings'),
    CalendarConfigsForm = require('./calendar_configs_form');

var _Configurator = React.createClass({displayName: "_Configurator",
  mixins: [Mixins.NavHelper, Mixins.ConfiguratorHelper],

  getInitialState: function () {
    return {
      tab: 'calendarConfigs'
    };
  },

  getSubmitHandler: function (tab) {
    var handlers = {
      calendarConfigs: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this),

      positionAndSize: function (settings) {
        this.props.onSubmit(settings);
      }.bind(this)
    };

    return handlers[tab];
  },

  getTabs: function () {
    var settings = this.props.settings;

    return {
      calendarConfigs: {
        navText: global.I18n.t('calendar.calendar_configs.nav_text'),
        content: function () {
          return (
            React.createElement(CalendarConfigsForm, {
              onSubmit:  this.getSubmitHandler('calendarConfigs'), 
              settings:  settings }
            )
          );
        }.bind(this) ()
      },

      positionAndSize: {
        navText: global.I18n.t('position_and_size_form.nav_text'),
        content: function () {
          return (
            React.createElement(PositionAndSizeForm, {
              onSubmit:  this.getSubmitHandler('positionAndSize'), 
              settings:  settings }
            )
          );
        }.bind(this) ()
      }
    };
  },

  render: function () {
    return (
      React.createElement(Configurator.DefaultDialog, {
        ref:  this.getRefName(), 
        name:  this.props.name, 
        onClose:  this.props.onClose}, 

         this.getNavHTML(), 

        React.createElement("div", {className: "row", style: { marginTop: '20px'}}, 
          React.createElement("div", {className: "col-md-10 col-md-offset-1"}, 
             this.getContentHTML() 
          )
        )
      )
    );
  }
});

module.exports = _Configurator;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./calendar_configs_form":1,"./settings":7}],3:[function(require,module,exports){
(function (global){
var Widget = require('./widget'),
    Shortcut = require('./shortcut'),
    locales = require('./locales');

global.I18n.registryDict(locales);
OS.installModule('Calendar', {
  Widget: Widget,
  Shortcut: Shortcut
});


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./locales":5,"./shortcut":8,"./widget":9}],4:[function(require,module,exports){
var en = {
  'calendar.calendar_configs.nav_text': 'Calendar Configs',
  'calendar.day_font_size.label': 'day font size:',
  'calendar.month_font_size.label': 'month font size:'
};

module.exports = en;


},{}],5:[function(require,module,exports){
module.exports = {
  en: require('./en'),
  ru: require('./ru')
};


},{"./en":4,"./ru":6}],6:[function(require,module,exports){
var ru = {
  'calendar.calendar_configs.nav_text': 'Конфиг календаря',
  'calendar.day_font_size.label': 'день, размер шрифта:',
  'calendar.month_font_size.label': 'месяц, размер шрифта:'
};

module.exports = ru;


},{}],7:[function(require,module,exports){
(function (global){
var settings = {
  DEFAULT_UPDATED_INTERVAL: 60 * 1000,

  DEFAULT_SIZE: {
    width: '150px',
    height: '100px'
  },
  DEFAULT_POSITION: global.Settings.get('default_position'),

  DEFAULT_CALENDAR_STYLES: {
    width: '100%',
    textAlign: 'center',
    margin: 'auto'
  },

  DEFAULT_MONTH_STYLES: {
    fontSize: '24px',
    lineHeight: '24px',
    fontWeight: 'bold',
    marginTop: '5px'
  },

  DEFAULT_DAY_STYLES: {
    fontSize: '36px',
    lineHeight: '36px'
  }
};

module.exports = settings;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
var Link = global.OS.Link;

var Shortcut = React.createClass({displayName: "Shortcut",
  render: function () {
    return (
      React.createElement(Link, {
        className:  this.props.className, 
        onClick:  this.props.onClick}, 

        React.createElement("span", {className: "fa fa-calendar"})
      )
    );
  }
});

module.exports = Shortcut;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
var Widget = global.OS.Widget,
    Mixins = global.OS.Mixins,

    settings = require('./settings'),
    Configurator = require('./configurator');

var _Widget = React.createClass({displayName: "_Widget",
  mixins: [Mixins.WidgetHelper],

  getInitialState: function () {
    return {
      _moment: moment(),
      updatedInterval: settings.DEFAULT_UPDATED_INTERVAL,

      size: settings.DEFAULT_SIZE,
      position: settings.DEFAULT_POSITION,

      calendarStyles: settings.DEFAULT_CALENDAR_STYLES,
      monthStyles: settings.DEFAULT_MONTH_STYLES,
      dayStyles: settings.DEFAULT_DAY_STYLES
    };
  },

  _getSettings: function () {
    return {
      size: _.clone(this.state.size),
      position: _.clone(this.state.position),

      calendarStyles: _.clone(this.state.calendarStyles),
      monthStyles: _.clone(this.state.monthStyles),
      dayStyles: _.clone(this.state.dayStyles)
    };
  },

  updateMoment: function () {
    this.setState({
      _moment: moment()
    });
  },

  componentWillMount: function () {
    this.init();
  },

  _load: function (onLoad) {
    this.loadSettings(onLoad);
  },

  componentDidMount: function () {
    var intervalId = setInterval(
      this.updateMoment,
      this.state.updatedInterval
    );
    this.setState({ intervalId: intervalId });
  },

  componentWillUnmount: function () {
    clearInterval(this.state.intervalId);
  },

  render: function () {
    return (
      React.createElement(Widget.Widget, {widgetStyles:  this.getWidgetStyles() }, 
        React.createElement(Widget.DefaultIconsContainer, {
          onMouseDownPositionBtn:  this.handleStartMoving, 
          onClickCloseBtn:  this.close, 
          onClickConfigureBtn:  this.openConfigurator}
        ), 

        React.createElement(Widget.Body, null, 
          React.createElement("div", {style:  this.state.calendarStyles}, 
            React.createElement("div", {style:  this.state.dayStyles}, 
               this.state._moment.format('D') 
            ), 

            React.createElement("div", {style:  this.state.monthStyles}, 
               this.state._moment.format('MMMM') 
            )
          )
        )
      )
    );
  },

  _createConfigurator: function () {
    return (
      React.createElement(Configurator, {
        name:  this.getName(), 
        settings:  this.getSettings(), 
        onClose:  this.handleCloseConfigurator, 
        onSubmit:  this.handleConfigure}
      )
    );
  }
});

module.exports = _Widget;


}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./configurator":2,"./settings":7}]},{},[3])