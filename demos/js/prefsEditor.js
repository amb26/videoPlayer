/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global jQuery, fluid*/

(function ($, fluid) {
    "use strict";

    // add extra prefs to starter primary schemas
    fluid.videoPlayer.primarySchema = {
        "fluid.videoPlayer.transcripts.display": {
            "type": "boolean",
            "default": false
        },
        "fluid.videoPlayer.transcripts.language": {
            "type": "string",
            "default": "en"
        }
    };
    fluid.defaults("vp.auxSchema.extraPanels", {
        auxiliarySchema: {
            // specify augmented container template for panels
            template: "../html/SeparatedPanel.html",

            transcripts: {
                type: "fluid.videoPlayer.transcripts.display",
                panel: {
                    type: "fluid.videoPlayer.panel.transcriptsSettings",
                    container: ".flc-prefsEditor-transcripts-settings",
                    template: "../html/MediaPanelTemplate.html",
                    message: "../messages/transcripts.json"
                }
            }
        }
    });

    fluid.videoPlayer.prefsEditorSetup = function (tocTemplate, templatePath, messagePath, panelSrc) {
        // instantiate the prefs editor itself
        $(document).ready (function () {
            fluid.videoPlayer.prefsEditor = fluid.prefs.create(".flc-prefsEditor-separatedPanel", {
                build: {
                    gradeNames:  ["fluid.prefs.auxSchema.starter"/*, "vp.auxSchema.extraPanels"*/],
                    primarySchema: fluid.videoPlayer.primarySchema,
                    auxiliarySchema: {
                    }
                },
                prefsEditor: {
                    distributeOptions: {
                        source: "{that}.options.tocTemplate",
                        target: "{that uiEnhancer}.options.tocTemplate"
                    },
                    enhancer: {
                        distributeOptions: {
                            source: "{that}.options.tocTemplate",
                            target: "{that > fluid.prefs.enactor.tableOfContents}.options.tocTemplate"
                        }
                    },
                    tocTemplate: tocTemplate,
                    templatePrefix: templatePath,
                    messagePrefix: messagePath,
                    components: {
                        prefsEditorLoader: {
                            options: {
                                iframeRenderer: {
                                    markupProps: {
                                        src: panelSrc
                                    }
                                }
                            }
                        }
                    }
                }
            });


        });
    };

})(jQuery, fluid);
