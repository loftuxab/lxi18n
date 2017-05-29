import React, {PropTypes, Component} from 'react';
import { Provider, connect } from 'react-redux'


export let i18nUtils = {
    normaliseLang : (lang /*:string*/) => {
        lang = lang.replace(/_/, '-').toLowerCase();
        if (lang.length > 3) {
            lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
        }
        return lang;
    }
};

export class LXi18n {
    constructor(currentLanguageKey){
        this.currentLanguageKey = currentLanguageKey;
    }

    setLocalisations(localisations){
        this.localisations = localisations;
    }

    localise (key, defaultValue, options) {
        let currentLanguageKey = this.currentLanguageKey;
        let localisationBundle = this.localisations[currentLanguageKey];
        let message;
        if(localisationBundle != null){
            message = localisationBundle[key];
        }
        message = (message == null? defaultValue : message);

        if (options != undefined){
            for (let optionsKey in options) {
                if (!options.hasOwnProperty(optionsKey)) {
                    continue;
                }
                message = message.replace( new RegExp("{" + optionsKey + "}", 'gi'), options[optionsKey]);
            }
        }
        return message;
    }

    getDefaultLanguage () {
        let languageCode;
        let browserLanguage = i18nUtils.normaliseLang(navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : navigator.language || navigator.userLanguage);
        languageCode = browserLanguage;

        let localisationBundle = localisations[browserLanguage];
        if (localisationBundle == undefined && browserLanguage.indexOf("-") != -1){
            //attempt to downgrade language
            let primaryLocaleCode = browserLanguage.split("-")[0];
            localisationBundle = localisations[primaryLocaleCode];
            if (localisationBundle == undefined) {
                //language not found, revert to default
                languageCode = options.primaryLanguage;
            }else{
                languageCode = primaryLocaleCode;
            }
        }
        return languageCode;

    }

    localiseTitle(titleKey, defaultTitle) {
        document.title = this.localise(titleKey, defaultTitle);
    }

    static options()
    {
        return {
            devMode: false,
            primaryLanguage: "en"
        };
    }
}

