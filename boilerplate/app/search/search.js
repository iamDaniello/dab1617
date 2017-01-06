
var Search = Component
    .builder()
    .render(function(model){
        return template('search', model);
    })
    .on('click', 'a.home', function(e){
        page('/');
    })
    .on('unbind', function(e){
        console.log('component detached from dom');
    })
    .build();
