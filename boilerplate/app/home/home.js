
var Home = Component
    .builder()
    .render(function(data){
        return template.merge('home', data);
    })
    .on('click', 'a.emergency', function(e){
        console.log('wow');
    })
    .build();
