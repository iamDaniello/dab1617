// load tree
var root = require('./ha2.json');

// copy array of program arguments
var args = process.argv.slice(),
    arg,

    options = {};

// process full array of program arguments, search for -v or --value switches and take as value whatever comes next
// there are also nodejs modules helping with this
while(arg = args.shift()){
    switch (arg){
        case '-v':
        case '--value':
            arg = args.shift(); // put string that comes behind -v or --value into arg
            if(isNaN(arg)){   // test if arg is a number
                console.error('Value "' + arg + '" is not a number.');
                process.exit(1); // stop program execution with an error code
            } else {
                options.value = parseInt(arg); // parse arg for an integer
            }
            break;
        default:
        // just do nothing if an unimplemented switch is found
    }
}

// actual search for the value in the tree
function find(node, value){
    for (var i in node){
        if(node[i] === value){
            return i;
        } else if(typeof node[i] === 'object') {
            var path = find(node[i], value); // does the trick of going down the tree: read on 'recursion' to learn more
            if(path) { // shorthand for if(typeof path != 'undefined') - warning: 0 and '' are evaluated false as well
                return i + '/' + path;
            } // no need for else, js functions return >undefined< as default value
        }
    }
}

if(typeof options.value != 'undefined'){
    var path = find(root, options.value);
    console.log('Found first "' + options.value + '" at path "' + path + '"');
} else {
    console.log('Use -v|--value [integer] as argument(s).');
    process.exit(0);
}
