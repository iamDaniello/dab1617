
controller('search', {
    load: function(){
        console.log('home controller ...');

        var model = {}

        var search = new Search(model);

        search.bind('main');

        this._search = search;
    },

    unload : function(){
        var search = this._search;

        if(search){
            search.unbind();
        }

        delete this._search;
    }
})



