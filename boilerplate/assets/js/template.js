/**
 * Preload mustache template in document.
 */
var template = (function($, Mustache){

    var templates = {};

    $('script[type="text/mustache"]').each(function($template){
        var template = $template.html();
        Mustache.parse(template);
        templates[$template.attr('id')] = template;
    });

    return function(name){
        return templates[name];
    };

})($, Mustache);