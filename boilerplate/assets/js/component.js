/**
 * Simple view helper taking care of rendering and event delegation.
 */

var component = (function(Mustache, $, _){

    function render() {
        var rendered;

        if(_.isObject(this.template)){
            rendered = Mustache.render(this.template.root, this.state, this.template.partials);
        } else {
            rendered = Mustache.render(this.template, this.state);
        }

        if(rendered) {
            $(this.target).html(rendered);
        } else {
            $(this.target).empty();
        }
    }

    function handle(e){
        var self = this;
        _
            .chain(this.events)
            .filter(function(event){
                return event.type === e.type && $(e.target).is(event.selector);
            })
            .each(function(event){
                if(_.isFunction(self[event.handler])){
                    self[event.handler](e);
                }
            });
    }

    var common = {

        attach : function () {
            if(this.events && this.target){
                var $target = $(this.target),
                    eventHandler = _.bind(handle, this);
                _
                    .chain(this.events)
                    .map(function(event){
                        return event.type;
                    })
                    .uniq()
                    .each(function(type){
                        $target.on(type, handler);
                    });

                this._eventHandler = eventHandler;
            }

            render.apply(this);

        },

        detach: function () {
            var $target = $(this.target);

            if(this.target && this._eventHandler){
                var $target = $(this.target),
                    eventHandler = this._eventHandler;
                _
                    .chain(this.events)
                    .map(function(event){
                        return event.type;
                    })
                    .uniq()
                    .each(function(type){
                        $target.off(type, eventHandler);
                    });
            }

            $target.emtpy();
        },

        setState: function (state) {
            this.state || (this.state = {});
            if(!_.isEmpty(state)) {
                for (var i in state) {
                    this.state[i] = state[i];
                }
            }
            render.apply(this);
        }
    };

    // settings.target : DOMString - selector
    // settings.template -- Mustache.parse(template);
    // settings.events
    return function (settings) {

        function Component(state, properties) {
            this.state = state || {};
            this.properties = properties || {};
        }

        _.extend(Component.prototype, common, settings);

        return Component;
    }
})(Mustache, $, _);