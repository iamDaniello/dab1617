
controller('home', {
    load: function(){
        console.log('search controller ...');

        var model = {
            events : [{
                title: 'foo',
                description: 'bar'
            },{
                title: 'hello',
                description: 'world'
            }]
        }

        var home = new Home(model);

        home.bind('main');

        this._home = home;
    },

    unload : function(){
        var home = this._home;

        if(home){
            home.unbind();
        }

        delete this._home;
    }
})



