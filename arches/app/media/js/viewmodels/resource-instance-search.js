define(['knockout', 'arches'],
function (ko, arches) {
    /**
     * A viewmodel used for geocoders
     *
     * @constructor
     * @name ResouceInstanceSearchViewModel
     *
     * @param  {string} params - a configuration object
     */
    var ResouceInstanceSearchViewModel = function(params) {
        var self = this;
        this.placeholder = params.placeholder || ko.observable('Search for resource instances');
        this.multiselect = params.multiselect || true;
        this.selection = ko.observable(null);
        this.focusItem = ko.observable(null);
        this.options = ko.observableArray();
        this.options.subscribe(function () {
            self.selection(null);
        });
        this.loading = ko.observable(false);
        this.isFocused = ko.observable(this.multiselect).extend({
            throttle: 500
        });
        this.isFocused.subscribe(function () {
            self.focusItem(null);
        });
        this.query = ko.observable();

        this.handleKeys = function (vm, e) {
            var down = 40;
            var up = 38;
            var enter = 13;
            if (e.keyCode === down || e.keyCode === up) {
                var options = self.options();
                var focusIndex = options.indexOf(self.focusItem());
                if (e.keyCode === down) {
                    focusIndex += 1;
                }
                if (e.keyCode === up) {
                    focusIndex -= 1;
                    if (focusIndex < -1) {
                        focusIndex = options.length-1;
                    }
                }
                if (focusIndex >= 0 && focusIndex < options.length) {
                    self.focusItem(options[focusIndex])
                } else {
                    self.focusItem(null)
                }
                return false;
            }
            if (e.keyCode === enter) {
                var focusItem = self.focusItem();
                if (focusItem) {
                    self.selection(focusItem);
                }
            }
            return true;
        }

        /**
         * Reloads the geocode layer when a new geocode request is made
         * @return {null}
         */
        this.redrawLayer = function() {
            console.log('Do something coool')
        };

        this.updateSelection = function(item) {
            if (item) {
                console.log(item.text)
            } else {
                console.log('no item');
            }
        }

        this.selection.subscribe(this.updateSelection);
    }

    return ResouceInstanceSearchViewModel

})
