
var Home = Component
    .builder()
    .render(function(data){
        return template('home', data);
    })
    .on('click', 'a.emergency', function(e){
        console.log('wow');
    })
    .on('click', 'a.search', function(e){
        page('/search');
    })
    .build();
