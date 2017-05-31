"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LXi18n = exports.i18nUtils = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i18nUtils = exports.i18nUtils = {
    normaliseLang: function normaliseLang(lang /*:string*/) {
        lang = lang.replace(/_/, '-').toLowerCase();
        if (lang.length > 3) {
            lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
        }
        return lang;
    }
};

var LXi18n = exports.LXi18n = function () {
    function LXi18n(currentLanguageKey, localisations) {
        _classCallCheck(this, LXi18n);

        this.currentLanguageKey = currentLanguageKey;
        this.localisations = localisations;
    }

    _createClass(LXi18n, [{
        key: 'setLocalisations',
        value: function setLocalisations(localisations) {
            this.localisations = localisations;
            return this;
        }
    }, {
        key: 'localise',
        value: function localise(key, defaultValue, options, localisations) {
            var currentLanguageKey = this.currentLanguageKey;
            var localisationBundle = void 0;

            if (localisations) {
                localisationBundle = localisations[currentLanguageKey];
            } else {
                localisationBundle = this.localisations[currentLanguageKey];
            }

            var message = void 0;
            if (localisationBundle != null) {
                message = localisationBundle[key];
            }
            message = message == null ? defaultValue : message;

            if (options != undefined) {
                for (var optionsKey in options) {
                    if (!options.hasOwnProperty(optionsKey)) {
                        continue;
                    }
                    message = message.replace(new RegExp("{" + optionsKey + "}", 'gi'), options[optionsKey]);
                }
            }
            return message;
        }
    }, {
        key: 'getDefaultLanguage',
        value: function getDefaultLanguage() {
            var languageCode = void 0;
            var browserLanguage = i18nUtils.normaliseLang(navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language || navigator.userLanguage);
            languageCode = browserLanguage;

            var localisationBundle = this.localisations[browserLanguage];
            if (localisationBundle == undefined && browserLanguage.indexOf("-") != -1) {
                //attempt to downgrade language
                var primaryLocaleCode = browserLanguage.split("-")[0];
                localisationBundle = localisations[primaryLocaleCode];
                if (localisationBundle == undefined) {
                    //language not found, revert to default
                    languageCode = this.options.primaryLanguage;
                } else {
                    languageCode = primaryLocaleCode;
                }
            }
            return languageCode;
        }
    }, {
        key: 'localiseTitle',
        value: function localiseTitle(titleKey, defaultTitle) {
            document.title = this.localise(titleKey, defaultTitle);
        }
    }], [{
        key: 'options',
        value: function options() {
            return {
                devMode: false,
                primaryLanguage: "en"
            };
        }
    }]);

    return LXi18n;
}();