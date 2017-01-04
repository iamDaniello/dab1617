console.log('"main" loaded...');


page('/', controller('home'));
page('/appointment/:appointment', controller('appointment'));

page();