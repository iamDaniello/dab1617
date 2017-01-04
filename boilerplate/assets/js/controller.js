/**
 * Singleton for view controller management
 */
var controller = (function(_){

    var controllers = {},
        current;

    // return a function that adds a controller if provided or returns a delegate to the load function of the named controller
    return function(name, controller){
        if(_.isObject(controller) && name){

            controllers[name] = controller;

        } else if(name) {

            return function(){

                if(_.isObject(current) && _.isFunction(current.unload)) {
                    current.unload();
                }

                current = controllers[name];

                if(_.isObject(current) && _.isFunction(current.load)){
                    current.load.apply(this, arguments);
                }
            }

        }
    };

})(_);