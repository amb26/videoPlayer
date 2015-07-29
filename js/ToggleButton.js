/*
Copyright 2012-2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global jQuery, fluid*/

(function ($, fluid) {
    "use strict";

    fluid.defaults("fluid.toggleButton", {
        gradeNames: ["fluid.viewComponent"],
        model: {
            pressed: false // default state
        },
        modelListeners: {
            pressed: {
                funcName: "fluid.toggleButton.updateButton",
                args: ["{toggleButton}", "{change}.value", "{toggleButton}.tooltip", "{toggleButton}.tooltipContentFunction"]
            }
        },
        events: {
            onPress: null // XXX want to get rid of this: in menu button, use model listener instead of this
        },
        listeners: {
            onCreate: {
                funcName: "fluid.toggleButton.setUpToggleButton",
                args: ["{toggleButton}"]
            }
        },
        selectors: {    // Integrators may override this selector
            button: ".flc-videoPlayer-button",
            label: ".flc-videoPlayer-button-label"
        },
        styles: {
            init: "fl-videoPlayer-button-init",
            pressed: "fl-videoPlayer-button-pressed",
            tooltip: "fl-videoPlayer-tooltip"
        },
        // TODO: Strings should be moved out into a single top-level bundle (FLUID-4590)
        strings: {  // Integrators will likely override these strings
            press: "Press",
            release: "Release"
        },
        invokers: {
            tooltipContentFunction: {
                funcName: "fluid.toggleButton.tooltipContentFunction",
                args: "{toggleButton}"
            },
            press: {
                funcName: "fluid.toggleButton.press",
                args: "{toggleButton}"
            },
            setState: {
                changePath: "pressed",
                value: "{arguments}.0"
            }
        },
        components: {
            tooltip: {
                type: "fluid.tooltip",
                container: "{toggleButton}.dom.button",
                options: {
                    styles: {
                        tooltip: "{toggleButton}.options.styles.tooltip"
                    }
                }
            }
        }
    });

    fluid.toggleButton.updateButton = function (that, newValue, tooltip, tooltipFunc) {
        var button = that.locate("button");
        var pressed = that.model.pressed;
        var styles = that.options.styles;
        if (styles.init === styles.pressed) {
            button.addClass(styles.init);
        } else {
            button.toggleClass(styles.init, !pressed);
            button.toggleClass(styles.pressed, pressed);
        }
        button.attr("aria-pressed", pressed);

        var labelText = tooltipFunc(that);
        that.locate("button").attr("aria-label", labelText);
        that.tooltip.updateContent(labelText);
    };

    fluid.toggleButton.press = function (that) {
        that.setState(!that.model.pressed);
        that.events.onPress.fire(that); // XXX
        return false;
    };

    fluid.toggleButton.tooltipContentFunction = function (that) {
        return that.options.strings[that.model.pressed? "release": "press"];
    };

    fluid.toggleButton.setUpToggleButton = function (that) {
        var button = that.locate("button");
        button.attr("role", "button");
        button.click(that.press);
    };

})(jQuery, fluid);
