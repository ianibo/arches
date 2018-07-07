define(['knockout', 'arches','viewmodels/resource-instance-search'],
function (ko, arches, ResourceInstanceSearchViewModel) {
    return ko.components.register('views/components/resource-instance-search', {
        viewModel: function(params) {
            ResourceInstanceSearchViewModel.apply(this, [params]);
            var self = this;
            this.placeholder = params.placeholder || ko.observable('Enter a term or concept');
            this.options = ko.observableArray();
            this.options.subscribe(function (val) {
                self.selection(null);
            });


            var displayName = ko.observable('');

            // this.valueList = ko.computed(function () {
            //     var valueList = self.value();
            //     displayName();
            //     if (!self.multiple && valueList) {
            //         valueList = [valueList];
            //     }
            //     if (Array.isArray(valueList)) {
            //         return valueList;
            //     }
            //     return [];
            // });
            //
            // this.valueObjects = ko.computed(function () {
            //     displayName();
            //     return self.valueList().map(function(value) {
            //         return {
            //             id: value,
            //             name: nameLookup[value],
            //             reportUrl: arches.urls.resource_report + value
            //         };
            //     }).filter(function(item) {
            //         return item.name;
            //     });
            // });

            this.updateResults = function(term) {
                    self.options([]);
                    if (term.length > 3) {
                        self.loading(true);
                        var termSearch = function (term, page) {
                            // var graphid = ko.unwrap(params.node.config.graphid);
                            var data = {
                                no_filters: true,
                                page: page
                            };
                            // if (graphid && graphid.length > 0) {
                            //     data.no_filters = false;
                            //     data.typeFilter = JSON.stringify(
                            //         graphid.map(function(id) {
                            //             return {
                            //                 "graphid": id,
                            //                 "inverted": false
                            //             }
                            //         })
                            //     );
                            // }
                            if (term) {
                                data.no_filters = false;
                                data.termFilter = JSON.stringify([{
                                    "inverted": false,
                                    "type": "string",
                                    "context": "",
                                    "context_label": "",
                                    "id": term,
                                    "text": term,
                                    "value": term
                                }]);
                            }
                            return data;
                        };
                        $.ajax({
                            type: 'GET',
                            url: arches.urls.search_results,
                            dataType: 'json',
                            data: termSearch(term)
                        }).done(function (data, page) {

                            var results = {
                                results: _.map(data.results.hits.hits, function(hit){return {id: hit._id, text: hit._source.displayname, graph: hit._source.graph_id}}),
                                more: data.paginator.has_next
                            };
                            self.options.removeAll();
                            self.options(results.results);
                        }).always(function () {
                            self.loading(false);
                        });
                    }
                };

            this.query.subscribe(this.updateResults);

            this.options.subscribe(function(val){
                console.log('options', val)
            })

        },
        template: {
            require: 'text!templates/views/components/resource-instance-search.htm'
        }
    });
})
