/**
 * Simple view helper taking care of rendering and event delegation.
 *
 */

var Component = (function($,_){

    // private functions
    function render() {
        if(_.isFunction(this.render)) {
            var rendered = this.render(this.model || {}, this.target);
            if (rendered) {
                $(this.target).html(rendered);
            }
            return
        }

        $(this.target).empty();
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

    function trigger(type, target){

        var $target = $(target);

        $target.each(function(element){
            $(element).trigger(type,
            new Event(type, {
                'bubbles': true,
                'cancelable': false,
                'component' : this,
                'target' : element
            }))
        });
    }

    // common behavior of components
    var common = {

        bind : function (target) {

            if(this.target || !target) return; // must be a mistake

            var $target = $(target);

            if(this.events){
                var eventHandler = _.bind(handle, this);

                for(var type in this.events){
                    $target.on(type, eventHandler);
                }

                this._eventHandler = eventHandler;
            }

            this.target = target;

            // raise custom bind event
            trigger.call(this, 'bind', target);

            render.apply(this);
        },

        unbind: function () {
            // raise custom unbind event
            trigger.call(this, 'unbind', this.target);

            var $target = $(this.target);

            if(this.target && this._eventHandler){
                var eventHandler = this._eventHandler;

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