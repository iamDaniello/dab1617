console.log('"main" loaded...');

page('/', controller('home'));

page('/search', controller('search'));

// start
page({
    click: false,
    hashbang: true
});