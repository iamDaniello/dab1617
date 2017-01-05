
controller('home', {
    load: function(){
        // load data
        // attach

        //life cycle

        //load
        //  bind data store events
        //  bring view in place

        //unload - how?
        //  unbind data store events

        var model = {
            events: [{
                title: 'hello',
                description: 'world'
            },{
                title: 'foo',
                description: 'bar'
            }]
        };


        console.log('loaded home controller');



    },
    unload : function(){

    }
})



