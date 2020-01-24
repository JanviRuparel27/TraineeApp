import React from "react";
import i18n from "i18n-js";
import memoize from "lodash.memoize";

import {I18nManager} from "react-native";

const translationGetters = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require("../assets/translations/en.json"),
    de: () => require("../assets/translations/de.json"),
    hi: () => require("../assets/translations/hi.json")
};

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = (langCode) => {
    // fallback if no available language fits
    const fallback = {languageTag: langCode == "hi" ? "hi" : "en", isRTL: false};

    //const { languageTag, isRTL } =    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||    fallback;
    //for force to userdefined lang
    const {languageTag, isRTL} = fallback;
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    i18n.translations = {[languageTag]: translationGetters[languageTag]()};
    i18n.locale = languageTag;
};

//export default class SyncTranslate extends React.Component {
//  constructor(props) {
//    super(props);
//    setI18nConfig(); // set initial config
//  }
//
//  componentDidMount() {
//    RNLocalize.addEventListener("change", this.handleLocalizationChange);
//  }
//
//  componentWillUnmount() {
//    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
//  }
//
//  handleLocalizationChange = () => {
//    setI18nConfig();
//    this.forceUpdate();
//  };
//
//  render() {
//    return (<View>
//
//           <Text >{translate("login")}</Text>
//        </View>
//
//    );
//  }
//}

const Translater = {
    setConfig: function (langCode) {
        setI18nConfig(langCode);
    },
    doTranslate: function (data) {
        // setI18nConfig();
        return translate(data);
    }
};

export default Translater;
