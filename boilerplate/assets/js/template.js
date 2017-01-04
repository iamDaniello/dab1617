/**
 * Preload mustache template in document.
 */
var template = (function($, Mustache){

    var templates = {};

    $('script[type="text/mustache"]').each(function(script){
        var $script = $(script);
        var template = $script.html();
        Mustache.parse(template);
        templates[$script.attr('id')] = template;
    });

    return function(name, data){
        if(templates.hasOwnProperty(name) && _.isObject(data)){
            return Mustache.render(templates[name], data, templates);
        } else {
            return templates[name];
        }
    };

})($, Mustache);