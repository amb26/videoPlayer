/*
Copyright 2013-2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global jQuery, fluid*/

(function ($, fluid) {
    "use strict";

    fluid.defaults("fluid.videoPlayer.showHide", {
        gradeNames: ["fluid.modelComponent", "{showHide}.createModelListenersGrade"],
        model: {
            isShown: {
                // A list of flags (true or false) to define the showing/hiding of any selectors
                // in a component. Example:
                // "scrubber.handle": false
                // "scrubber" is the identifier defined in the option "showHidePath", normally the 
                // unique component name. "handle" is the selector defined in the "scrubber" component.
            }
        },
        modelPrefix: "isShown",

        // The identifier of the component for showing/hiding in the model "isShown" collection,
        // normally the unique component name, or any name as long as it maintains the uniqueness
        // of each component that has the "showHide" grade attached on.
        showHidePath: "",

        invokers: {
            createModelListenersGrade: {
                funcName: "fluid.videoPlayer.showHide.createModelListenersGrade",
                args: ["{showHide}.options.selectors", "{showHide}.options.modelPrefix", "{showHide}.options.showHidePath"]
            }
        }
    });
    
    fluid.videoPlayer.showHide.createModelListenersGrade = function (selectors, modelPrefix, showHidePath) {
        var gradeName = "fluid.videoPlayer.showHide.modelListeners";
        var defaults = {
            modelListeners: {}
        };
        fluid.each(selectors, function (selectorValue, selectorKey) {
            var modelPath = fluid.pathUtil.composePath(
                fluid.pathUtil.composePath(modelPrefix, showHidePath),
                selectorKey
            );
            defaults.modelListeners[modelPath] = {
                funcName: "fluid.videoPlayer.showHide.updateVisibility",
                args: ["{that}", selectorKey, "{change}.path", "{change}.value"]
            };
        });
        fluid.defaults(gradeName, defaults);
        return gradeName;
    };

    fluid.videoPlayer.showHide.updateVisibility = function (that, selectorKey, modelPath, newVal) {
        var container = that.locate(selectorKey);
        if (!container) {
            return;
        }
        container.toggle(newVal);
    };

})(jQuery, fluid);
