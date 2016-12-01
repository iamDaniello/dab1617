function addChildren(e){

    var path = e.target.dataset.path; // look up current node's path in data attribute (very simple approach)

    var xhr = new XMLHttpRequest();

    // tell xhr what to do when the response with finally loaded, implies response was status 200
    xhr.addEventListener("load", function(){
        var children = JSON.parse(this.responseText);

        var parent = e.target;

        // create new divs for all children and append them
        children.forEach(function(child){
            var div = document.createElement('div');
            div.className = 'node';
            div.innerHTML = child;

            // if path not empty append child, otherwise assume we are in root and set the path to the current child
            div.dataset.path = path ? path + ',' + child : child;

            parent.appendChild(div);
        })
    });

    // send request for children
    xhr.open("GET", "/children?path=" + path); // e.g. path=R,S,T
    xhr.send();

}

var root = document.querySelector('#root');
root.addEventListener('click', addChildren); //NOTE: events