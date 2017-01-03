/**
 * Created by dli on 03.01.2017.
 */

(function(Mustache, $, _){

    function render() {
        var rendered = Mustache.render(this.template, state);
        $(this.target).html(rendered);
    }

    var component = {
        bind : function () {
            if(this.target){
                $(this.target).on();
            }
        },
        unbind: function () {

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

    return function (options) {
        // options.target : DOMString - selector
        // options.components : []
        // options.template -- Mustache.parse(template);
        // options.events
        // options.properties

        state = {};
    }
})(Mustache, $, _);