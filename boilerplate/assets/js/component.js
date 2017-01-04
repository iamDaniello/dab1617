/**
 * Simple view helper taking care of rendering and event delegation.
 *
 */

var Component = (function($,_){

    // private functions
    function render() {
        if(_.isFunction(this.render)){
            var rendered = this.render(this.model);
            $(this.target).html(rendered);
        } else {
            $(this.target).empty();
        }
    }

    function handle(e){
        var mappings = this.events[e.type];

        if(mappings) {
            for(var i = 0; i < mappings.length; i++){
                var mapping = mappings[i];

                if($(e.target).is(mapping.selector) && _.isFunction(mapping.handler)){
                    mapping.handler.call(this, e);
                }
            }
        }
    }

    // common behavior of components
    var common = {

        attach : function (target) {

            if(this.target) return; // must be a mistake

            this.target = target;

            if(this.events && this.target){
                var $target = $(this.target),
                    eventHandler = _.bind(handle, this);

                for(var type in this.events){
                    $target.on(type, eventHandler);
                }

                this._eventHandler = eventHandler;
            }

            render.apply(this);
        },

        detach: function () {
            var $target = $(this.target);

            if(this.target && this._eventHandler){
                var $target = $(this.target),
                    eventHandler = this._eventHandler;

                for(var type in this.events){
                    $target.off(type, eventHandler);
                }

                delete this._eventHandler;
            }

            $target.empty();

            delete this.target;
        },

        update: function (model) {
            this.model || (this.model = {});
            if(!_.isEmpty(model)) {
                for (var i in model) {
                    this.model[i] = model[i];
                }
            }
            render.apply(this);
        }
    };

    // factory function
    function create(settings) {

        function Component(model, properties) {
            this.model = model || {};
            this.properties = properties || {};
        }

        _.extend(Component.prototype, common, settings);

        return Component;
    }


    // builder
    function ComponentBuilder(){
        this.events = {};
    }

    ComponentBuilder.prototype.on = function(type, selector, handler){
        if(!this.events.hasOwnProperty(type)){
            this.events[type] = [];
        }

        if(_.isFunction(selector)){
            handler = selector;
            selector = '*';
        }

        this.events[type].push({
            selector: selector,
            handler: handler
        });

        return this;
    }

    ComponentBuilder.prototype.render = function(render){
        this.render = render;
        return this;
    }

    ComponentBuilder.prototype.build = function(){
        return create({
            events: this.events,
            render: this.render
        });
    }

    return {
        builder : function(){
            return new ComponentBuilder();
        }
    }
})($,_);