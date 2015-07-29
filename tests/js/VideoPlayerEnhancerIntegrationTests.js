/*
Copyright 2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
 
 */

/*global fluid, jqUnit, jQuery*/

(function ($) {
    "use strict";
    fluid.staticEnvironment.vpTest = fluid.typeTag("fluid.tests.videoPlayer");

    /* Set up the Prefs Editor to launch when the page is ready */
    fluid.defaults("vp.auxSchema.extraPanels", {
        auxiliarySchema: {
            // specify augmented container template for panels
            template: "../../html/SeparatedPanel.html"
        }
    });
    fluid.videoPlayer.prefsEditorSetup("../../lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
        "../../lib/infusion/src/framework/preferences/html/",
        "../../lib/infusion/src/framework/preferences/messages/",
        "../../html/SeparatedPanelPrefsEditorFrame.html");


    fluid.defaults("fluid.tests.videoPlayerEnhancer", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            videoPlayer: {
                type: "fluid.videoPlayer",
                container: ".videoPlayer-enhancer",
                options: fluid.testUtils.baseOpts
            },
            tester: {
                type: "fluid.tests.videoPlayerEnhancerTester"
            }
        }
    });

    fluid.tests.assert = function () {
        jqUnit.assert("VideoPlayer ready");
    };

    fluid.tests.changeEnhancerModel = function (path, value) {
        fluid.staticEnvironment.uiEnhancer.applier.requestChange(path, value);
    };

    fluid.tests.checkPlayerModel = function (path, value) {
        return function (newModel) {
            jqUnit.assertEquals("player model at " + path + " should be " + value, value, fluid.get(newModel, path));
        };
    };

    fluid.defaults("fluid.tests.videoPlayerEnhancerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Setup",
            tests: [{
                expect: 1,
                name: "Video Player initialised",
                sequence: [{
                    listener: "fluid.tests.assert",
                    event: "{videoPlayer}.events.onReady"
                }]
            }]
        }, {
            name: "Transcripts",
            tests: [{
                expect: 4,
                name: "Video Player responds to changes in transcripts UIEnhancer settings",
                sequence: [{
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["transcripts", true]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["displayTranscripts", true]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["transcripts", false]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["displayTranscripts", false]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["transcriptLanguage", "fr"]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["currentTracks.transcripts.0", 1]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["transcriptLanguage", "en"]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["currentTracks.transcripts.0", 0]
                }]
            }]
        }, {
            name: "Captions",
            tests: [{
                expect: 4,
                name: "Video Player responds to changes in caption UIEnhancer settings",
                sequence: [{
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["captions", true]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["displayCaptions", true]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["captions", false]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["displayCaptions", false]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["captionLanguage", "fr"]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["currentTracks.captions.0", 1]
                }, {
                    func: "fluid.tests.changeEnhancerModel",
                    args: ["captionLanguage", "en"]
                }, {
                    listenerMaker: "fluid.tests.checkPlayerModel",
                    changeEvent: "{videoPlayer}.applier.modelChanged",
                    spec: {path: "*", priority: "last"},
                    makerArgs: ["currentTracks.captions.0", 0]
                }]
            }]
        }]
    });

    $(document).ready(function () {
        fluid.test.runTests([
            "fluid.tests.videoPlayerEnhancer"
        ]);
    });

})(jQuery);
