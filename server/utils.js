const settings = require("./settings")

function get_utilization_visualizer(observing_array, upper_limit) {
    return () => {
        let current = observing_array.length;
        let progress_bar = "[";
        for (let i = 0; i < current; i++) {
            progress_bar += "+";
        }
        for (let i = 0; i < upper_limit - current; i++) {
            progress_bar += " ";
        }
        progress_bar += "]";
        return progress_bar;
    }
}

function on_verbose(func) {
    if (settings.verbose) {
        func();
    }
}

module.exports = {
    on_verbose,
    get_utilization_visualizer
}
