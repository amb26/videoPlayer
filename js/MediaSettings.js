/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global fluid*/

(function () {
    "use strict";

    fluid.registerNamespace("fluid.videoPlayer.panel.mediaSettings");

    fluid.defaults("fluid.videoPlayer.panel.transcriptsShow", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "fluid.videoPlayer.transcripts.display": {
                "model.displayTranscripts": "default"
            }
        },
        selectors: {
            show: ".flc-videoPlayer-media",
            choiceLabel: ".flc-videoPlayer-media-choice-label"
        },
        styles: {
            icon: "fl-icon"
        },
        produceTree: "fluid.videoPlayer.panel.mediaSettings.produceShowTree",
        members: {
            mediaType: "transcripts"
        }
    });
    
    fluid.videoPlayer.panel.mediaSettings.produceShowTree = function (that) {
        return {
            choiceLabel: {messagekey: that.mediaType + "ChoiceLabel"},
            icon: {
                decorators: [{
                    type: "addClass",
                    classes: that.options.styles.icon
                }]
            },
            show: "${displayTranscripts}"
        };
    };

    fluid.defaults("fluid.videoPlayer.panel.transcriptsLanguage", {
        gradeNames: ["fluid.prefs.panel"],
        preferenceMap: {
            "fluid.videoPlayer.transcripts.language": {
                "model.transcriptsLanguage": "default"
            }
        },
        selectors: {
            language: ".flc-videoPlayer-media-language"
        },
        strings: {
            language: ["English", "French"]
        },
        controlValues: {
            language: ["en", "fr"]
        },
        produceTree: "fluid.videoPlayer.panel.mediaSettings.produceLanguageTree"
    });
    
    fluid.videoPlayer.panel.mediaSettings.produceLanguageTree = function (that) {
        return {
            language: {
                optionnames: "${{that}.options.strings.language}",
                optionlist: "${{that}.options.controlValues.language}",
                selection: "${language}",
                decorators: [{
                    type: "jQuery",
                    func: "prop",
                    args: ["disabled", !that.model.show]
                }]
            }
        };
    };

    fluid.defaults("fluid.videoPlayer.panel.transcriptsSettings", {
        gradeNames: ["fluid.prefs.compositePanel"],
        selectors: {
            label: ".flc-videoPlayer-media-label"
        },
        protoTree: {
            label: {messagekey: "transcriptsLabel"}
        }
    });










    /**
     * Shared grade for media settings panels
     */
/*
    fluid.defaults("fluid.videoPlayer.panel.mediaSettings", {
        gradeNames: ["fluid.prefs.panel"],
        model: {
            show: false,
            language: "en",
            type: "media"
        },
        listeners: {
            onCreate: "fluid.videoPlayer.panel.mediaSettings.toggleLanguageOnShow"
        },
        strings: {
            language: ["English", "French"]
        },
        controlValues: {
            language: ["en", "fr"]
        },
        styles: {
            icon: "fl-icon"
        },
        selectors: {
            label: ".flc-videoPlayer-media-label",
            show: ".flc-videoPlayer-media",
            choiceLabel: ".flc-videoPlayer-media-choice-label",
            language: ".flc-videoPlayer-media-language"
        },
        produceTree: "fluid.videoPlayer.panel.mediaSettings.produceTree"
    });

    fluid.videoPlayer.panel.mediaSettings.produceTree = function (that) {
        return {
            label: {messagekey: that.mediaType + "Label"},
            choiceLabel: {messagekey: that.mediaType + "ChoiceLabel"},
            icon: {
                decorators: [{
                    type: "addClass",
                    classes: that.options.styles.icon
                }]
            },
            show: "${show}",
            language: {
                optionnames: "${{that}.options.strings.language}",
                optionlist: "${{that}.options.controlValues.language}",
                selection: "${language}",
                decorators: [{
                    type: "jQuery",
                    func: "prop",
                    args: ["disabled", !that.model.show]
                }]
            }
        };
    };
*/

    fluid.videoPlayer.panel.mediaSettings.toggleLanguageOnShow = function (that) {
        that.applier.modelChanged.addListener("show", function (show) {
            that.locate("language").prop("disabled", !show);
        });
    };

    /**
     * Captions settings panel.
     */
/*
    fluid.defaults("fluid.videoPlayer.panel.captionsSettings", {
        gradeNames: ["fluid.videoPlayer.panel.mediaSettings"],
        preferenceMap: {
            "fluid.videoPlayer.displayCaptions": {
                "model.show": "default"
            },
            "fluid.videoPlayer.captionLanguage": {
                "model.language": "default"
            }
        },
        model: {
            type: "captions"
        },
        styles: {
            icon: "fl-icon-captions"
        },
        members: {
            mediaType: "captions"
        }
    });
*/
    /**
     * Transcripts settings panel.
     */
/*
    fluid.defaults("fluid.videoPlayer.panel.transcriptsSettings", {
        gradeNames: ["fluid.videoPlayer.panel.mediaSettings"],
        preferenceMap: {
            "fluid.videoPlayer.displayTranscripts": {
                "model.show": "default"
            },
            "fluid.videoPlayer.transcriptLanguage": {
                "model.language": "default"
            }
        },
        model: {
            type: "transcripts"
        },
        styles: {
            icon: "fl-icon-transcripts"
        },
        members: {
            mediaType: "transcripts"
        }
    });
*/


/*
    // Grade for adding the media panels to prefsEditor
    fluid.defaults("fluid.videoPlayer.mediaPanels", {
        // The ideal grade list is to include "fluid.prefs.prefsEditor" so that the "mediaPanels" can be
        // used independently without the need to specify "fluid.prefs.prefsEditor" explicitly. However,
        // applying it in the grade list causing prefsEditor rendered twice. Needs to find out the
        // cause.
        gradeNames: ["fluid.viewComponent", "fluid.progressiveCheckerForComponent"],
        componentName: "fluid.videoPlayer.mediaPanels", // where to look for progressive checker options
        progressiveCheckerOptions: {
            checks: [{
                // captions are only supported in browsers that have native video support
                feature: "{fluid.browser.nativeVideoSupport}",
                contextName: "fluid.videoPlayer.nativeVideoCaptionSupport"
            }]
        },
        selectors: {
            captionsSettings: ".flc-prefsEditor-captions-settings",
            transcriptsSettings: ".flc-prefsEditor-transcripts-settings"
        },
        components: {
            transcriptsSettings: {
                type: "fluid.videoPlayer.panel.transcriptsSettings",
                container: "{prefsEditor}.dom.transcriptsSettings",
                createOnEvent: "onPrefsEditorMarkupReady",
                options: {
                    gradeNames: "fluid.prefs.prefsEditorConnections",
                    rules: {
                        "transcripts": "show",
                        "transcriptLanguage": "language"
                    },
                    model: {
                        show: "{fluid.prefs.rootModel}.rootModel.transcripts",
                        language: "{fluid.prefs.rootModel}.rootModel.transcriptLanguage"
                    },
                    resources: {
                        template: "{templateLoader}.resources.transcriptsSettings"
                    }
                }
            }
        }
    });
*/

    // This grade is solely for the purpose of adding the captions settings panel to fluid.videoPlayer.mediaPanels
    // (which doesn't happen if native video is not supported). It should never be instantiated.
    fluid.defaults("fluid.videoPlayer.nativeVideoCaptionSupport", {
        components: {
            captionsSettings: {
                type: "fluid.videoPlayer.panel.captionsSettings",
                createOnEvent: "onPrefsEditorMarkupReady",
                container: "{prefsEditor}.dom.captionsSettings",
                options: {
                    gradeNames: "fluid.prefs.prefsEditorConnections",
                    rules: {
                        "captions": "show",
                        "captionLanguage": "language"
                    },
                    model: {
                        show: "{fluid.prefs.rootModel}.rootModel.captions",
                        language: "{fluid.prefs.rootModel}.rootModel.captionLanguage"
                    },
                    resources: {
                        template: "{templateLoader}.resources.captionsSettings"
                    }
                }
            }
        }
    });

    /**
     * A grade used to add the relay subcomponent to uiEnhancer
     */
/*
    fluid.defaults("fluid.videoPlayer.vpRelay", {
        gradeNames: ["fluid.component"],
        components: {
            relay: {
                type: "fluid.videoPlayer.relay"
            }
        }
    });
*/

    // Define templates for PrefsEditor with media settings
/*
    fluid.defaults("fluid.videoPlayer.mediaPanelTemplateLoader", {
        gradeNames: ["fluid.prefs.resourceLoader", "fluid.progressiveCheckerForComponent"],
        componentName: "fluid.videoPlayer.mediaPanelTemplateLoader",
        progressiveCheckerOptions: {
            checks: [{
                // captions are only supported in browsers that have native video support
                feature: "{fluid.browser.nativeVideoSupport}",
                contextName: "fluid.videoPlayer.templateWithCaptionsPanel"
            }],
            defaultContextName: "fluid.videoPlayer.templateNoCaptionsPanel"
        },
        templates: {
            captionsSettings: "../html/MediaPanelTemplate.html",
            transcriptsSettings: "../html/MediaPanelTemplate.html"
        }
    });
    fluid.defaults("fluid.videoPlayer.templateWithCaptionsPanel", {
        templates: {
            prefsEditor: "../html/SeparatedPanel.html"
        }
    });
    fluid.defaults("fluid.videoPlayer.templateNoCaptionsPanel", {
        templates: {
            prefsEditor: "../html/SeparatedPanelNoNativeVideo.html"
        }
    });
*/

    /**
     * A grade responsible for binding the UIEnhancer relay to the VideoPlayer
     */
    fluid.defaults("fluid.videoPlayer.enhancerBinder", {
        gradeNames: ["fluid.component"],
        listeners: {
            onCreate: "fluid.videoPlayer.enhancerBinder.bindRelay"
        }
    });

    fluid.videoPlayer.enhancerBinder.bindRelay = function (that, callback) {
        callback = callback || fluid.identity;
        // TODO: We need a way to wait for UIE if necessary (see FLUID-5016)
/*
        if (fluid.staticEnvironment.uiEnhancer) {
            fluid.staticEnvironment.uiEnhancer.relay.addTarget(that);
        }
*/
        callback(that);
    };

    fluid.defaults("fluid.videoPlayer.mediaPanelMessageLoader", {
        gradeNames: ["fluid.prefs.resourceLoader"],
        templates: {
            captionSettings: "../messages/captions.json",
            transcriptSettings: "../messages/transcripts.json"
        }
    });
})();
