/*
Copyright 2012-2013 OCAD University

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

    $(document).ready(function () {

        jqUnit.module("Video Player Transcript Integration Tests");

        jqUnit.asyncTest("FLUID-4812: Transcripts showing on prefsEditor reset", function () {
            jqUnit.expect(2);
            var instance = {
                container: ".videoPlayer-transcript",
                options: {
                    listeners: {
                        onReady: function () {
                            jqUnit.notVisible("Before PrefsEditor reset, transcripts are not visible", $(".flc-videoPlayer-transcriptArea"));
                            fluid.videoPlayer.prefsEditor.prefsEditorLoader.prefsEditor.events.onReset.addListener(function () {
                                jqUnit.notVisible("After PrefsEditor reset, transcripts are not visible", $(".flc-videoPlayer-transcriptArea"));
                                jqUnit.start();
                            });
                            fluid.videoPlayer.prefsEditor.prefsEditorLoader.prefsEditor.reset();
                        }
                    }
                }
            };
            fluid.testUtils.initEnhancedVideoPlayer(instance);
        });

        jqUnit.asyncTest("Scrubbing", function () {
            var newTime;
            var instance = {
                container: ".videoPlayer-transcript",
                options: {
                    video: {
                        sources: [{
                            src: "../../demos/videos/ReorganizeFuture/ReorganizeFuture.mp4",
                            type: "video/mp4"
                        }, {
                            src: "../../demos/videos/ReorganizeFuture/ReorganizeFuture.webm",
                            type: "video/webm"
                        }, {
                            src: "http://www.youtube.com/v/_VxQEPw1x9E",
                            type: "video/youtube"
                        }],
                        transcripts: [{
                            src: "../../demos/videos/ReorganizeFuture/ReorganizeFuture.transcripts.fr.json",
                            type: "JSONcc",
                            srclang: "fr",
                            label: "French"
                        }]
                    },
                    events: {
                        onVideoAndTranscriptsLoaded: {
                            events: {
                                transcriptsLoaded: "onTranscriptsLoaded",
                                loadedMetadata: "onLoadedMetadata"
                            },
                            args: ["{videoPlayer}", "{transcript}"]
                        }
                    },
                    model: {
                        currentTracks: {
                            transcripts: [0] // ensure that the test transcript is selected so it loads
                        }
                    },
                    listeners: {
                        onVideoAndTranscriptsLoaded: function (vp, that) {
                            var anElement = $("[id^=flc-videoPlayer-transcript-element]").eq(7);
                            newTime = (that.convertToMilli(that.options.transcripts[0].tracks[7].inTime) + 1) / 1000;

                            vp.events.onTimeUpdate.addListener(function (currTime) {
                                // Removing precision from the currTime as chrome returns the value with about 15 decimal places.
                                // This comes from VideoPLayer_media.js, in the fluid.videoPlayer.media.handleTimeUpdate function.
                                var reducedCurrTime = Math.floor(1000 * currTime) / 1000;
                                jqUnit.assertEquals("New time is same as clicked transcript", newTime, reducedCurrTime);
                                vp.events.onTimeUpdate.removeListener("timeChecker");
                                jqUnit.start();
                            }, "timeChecker");

                            anElement.click();
                        }
                    }
                }
            };
            fluid.testUtils.initEnhancedVideoPlayer(instance);
        });

    });
})(jQuery);
