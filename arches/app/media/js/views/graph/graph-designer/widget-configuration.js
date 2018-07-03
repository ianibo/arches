define([
    'underscore',
    'backbone',
    'knockout',
    'widgets',
    'bindings/ckeditor',
    'knockstrap',
    // 'component-templates' // removed b/c throws error
], function(_, Backbone,  ko, widgets) {
    var WidgetConfigurationForm = Backbone.View.extend({
        /**
        * A backbone view representing a widget configuration form
        * @augments Backbone.View
        * @constructor
        * @name WidgetConfigurationForm
        */

        /**
        * initializes with optional parameters
        * @param {object} options
        * @param {boolean} options.graphModel - a reference to the selected {@link GraphModel}
        * @param {boolean} options.cardTree - a reference to the selected {@link CardTreeViewModel}
        */

        initialize: function(options) {
            // Needed Items: widget widgetlookup graph toggleRequired widgetlist checkIfImmutable
            var self = this;

            // _.extend(this, _.pick(options, 'card'));
            // this.selection = options.selection || ko.observable(this.card);
            // this.helpPreviewActive = options.helpPreviewActive || ko.observable(false);
            // this.card = ko.observable();
            this.widget = ko.observable();
            this.graph = options.graphModel;
            this.cardTree = options.cardTree;
            this.widgetLookup = widgets;
            this.widgetList = function() {
                var cardWidget = self.widget();
                if (cardWidget) {
                    var widgets = _.map(self.widgetLookup, function(widget, id) {
                        widget.id = id;
                        return widget;
                    });
                    return _.filter(widgets, function(widget) {
                        return widget.datatype === cardWidget.datatype.datatype
                    });
                } else {
                    return [];
                }
            };
            //
            // this.checkIfImmutable = function() {
            //     var isImmutable = false;
            //     var card = self.card();
            //     if (card) {
            //         isImmutable = !card.get('is_editable');
            //     }
            //     return isImmutable;
            // }
            //
            // this.toggleRequired = function() {
            //         var nodeRequired = this.widget().node.isrequired;
            //         var cardEditable = this.card().get('is_editable');
            //         if (cardEditable === true) {
            //             nodeRequired(!nodeRequired());
            //         }
            // };
            //
            // this.updateSelection = function(selection) {
            //     if('isContainer' in selection){
            //         this.card(selection);
            //     }
            //     if('node' in selection){
            //         this.widget(selection);
            //     }
            // };
            //
            // this.selection.subscribe(function (selection) {
            //     this.helpPreviewActive(false);
            //     this.updateSelection(selection);
            // }, this);
            //
            // this.updateSelection(this.selection());
            this.cardTree.selection.subscribe(function(options){
                            console.log(options);
                            this.widget(options)
                        }, this);
        }
    });
    return WidgetConfigurationForm;
});
