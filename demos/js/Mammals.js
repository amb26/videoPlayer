/*

Copyright 2012-2013 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global jQuery, fluid*/

(function ($) {
    "use strict";

    $(document).ready(function () {
        fluid.videoPlayer.prefsEditorSetup("../lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
            "../lib/infusion/src/framework/preferences/html/",
            "../lib/infusion/src/framework/preferences/messages/",
            "../html/SeparatedPanelPrefsEditorFrame.html");

        var earlyVideoPlayerInstances = [ {
            container: ".mammals-video",
            options: {
                gradeNames: ["fluid.videoPlayer.enhancerBinder"],
                videoTitle: "Mammals",
                video: {
                    sources: [
                        {
                            src: "videos/Mammals/Mammals.mp4",
                            type: "video/mp4"
                        },
                        {
                            src: "videos/Mammals/Mammals.webm",
                            type: "video/webm"
                        },
                        {
                            src: "http://www.youtube.com/v/0jw74pfWfxA",
                            type: "video/youtube"
                        }
                    ],
                    captions: [
                        {
                            src: "videos/Mammals/Mammals.en.vtt",
                            type: "text/vtt",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/Mammals/Mammals.fr.vtt",
                            type: "text/vtt",
                            srclang: "fr",
                            label: "French"
                        }
                    ],
                    transcripts: [
                        {
                            src: "videos/Mammals/Mammals.transcripts.en.json",
                            type: "JSONcc",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/Mammals/Mammals.transcripts.fr.json",
                            type: "JSONcc",
                            srclang: "fr",
                            label: "French"
                        }
                    ]
                }
            }
        }, {
            container: ".polar-mammals-video",
            options: {
                gradeNames: ["fluid.videoPlayer.enhancerBinder"],
                videoTitle: "Polar Mammals",
                video: {
                    sources: [
                        {
                            src: "videos/PolarMammals/PolarMammals.mp4",
                            type: "video/mp4"
                        },
                        {
                            src: "videos/PolarMammals/PolarMammals.webm",
                            type: "video/webm"
                        },
                        {
                            src: "http://www.youtube.com/v/h_oHNP50FGM",
                            type: "video/youtube"
                        }
                    ],
                    captions: [
                        {
                            src: "videos/PolarMammals/PolarMammals.en.vtt",
                            type: "text/vtt",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/PolarMammals/PolarMammals.fr.vtt",
                            type: "text/vtt",
                            srclang: "fr",
                            label: "French"
                        }
                    ],
                    transcripts: [
                        {
                            src: "videos/PolarMammals/PolarMammals.transcripts.en.json",
                            type: "JSONcc",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/PolarMammals/PolarMammals.transcripts.fr.json",
                            type: "JSONcc",
                            srclang: "fr",
                            label: "French"
                        }
                    ]
                }
            }
        }];

        var lateVideoPlayerInstances = [{
            container: ".polar-adapt-video",
            options: {
                gradeNames: ["fluid.videoPlayer.enhancerBinder"],
                videoTitle: "Polar Mammal Adaptation",
                video: {
                    sources: [
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.mp4",
                            type: "video/mp4"
                        },
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.webm",
                            type: "video/webm"
                        },
                        {
                            src: "http://www.youtube.com/v/3_3p2ylZDAE",
                            type: "video/youtube"
                        }
                    ],
                    captions: [
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.en.vtt",
                            type: "text/vtt",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.fr.vtt",
                            type: "text/vtt",
                            srclang: "fr",
                            label: "French"
                        }
                    ],
                    transcripts: [
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.transcripts.en.json",
                            type: "JSONcc",
                            srclang: "en",
                            label: "English"
                        },
                        {
                            src: "videos/PolarMammalAdaptations/PolarMammalAdaptations.transcripts.fr.json",
                            type: "JSONcc",
                            srclang: "fr",
                            label: "French"
                        }
                    ]
                }
            }
        }];

        // TODO: This still needs cleaning up
        fluid.transform(earlyVideoPlayerInstances, function (instance) {
            fluid.invoke("fluid.videoPlayer", [instance.container, instance.options]);
        });

        // Initialise one video player extremely late to show that this method still works
        fluid.invoke("fluid.videoPlayer", [lateVideoPlayerInstances[0].container, lateVideoPlayerInstances[0].options]);
    });

})(jQuery);
