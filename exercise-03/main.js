function indexOf(collection, item) {
    return Array.prototype.indexOf.call(collection, item);
}

// create a new empty matrix of required size
function emptyMatrix(dim){
    var result = new Array(dim);
    for(var i = 0; i < result.length; i++) {
        result[i] = new Array(dim);
        for (var j = 0; j < result[i].length; j++) {
            result[i][j] = 0;
        }
    }
    return result;
}

// just test a cell with respect to the edge case of matrix borders
function test(arr, x, y){
    if(x < 0 || x >= arr.length){
        return 0;
    } else if (y < 0 || y >= arr[x].length) {
        return 0;
    } else {
        return arr[x][y];
    }
}

// one simulation step - determine aliveness of neighbours
function simulate(current){
    var next = emptyMatrix(current.length);

    for(var i = 0; i < current.length; i++) {
        for (var j = 0; j < current[i].length; j++) {
            var liveNeighbours = 0;

            liveNeighbours += test(current, i - 1, j - 1);
            liveNeighbours += test(current, i - 1, j);
            liveNeighbours += test(current, i - 1, j + 1);
            liveNeighbours += test(current, i, j - 1);
            liveNeighbours += test(current, i, j + 1);
            liveNeighbours += test(current, i + 1, j - 1);
            liveNeighbours += test(current, i + 1, j);
            liveNeighbours += test(current, i + 1, j + 1);

            if(liveNeighbours == 2 && current[i][j] == 1 || liveNeighbours == 3){
                next[i][j] = 1;
            } else {
                next[i][j] = 0;
            }
        }
    }

    return next;
}

// just render the matrix into a couple of DIVs with the right classes
function render(container, matrix){

    // clean container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // render rows and cells -> create dom elements
    for(var i = 0; i < matrix.length; i++) {
        var row = document.createElement('div');
        row.className = 'row';

        for (var j = 0; j < matrix[i].length; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell ' + (matrix[i][j] > 0 ? 'active' : 'inactive');

            row.appendChild(cell);
        }

        container.appendChild(row);
    }
}

// initialize empty matrix
var cells = emptyMatrix(10);

// make us of event bubbling an register click on container
var grid = document.querySelector('#grid'),
    clickCell;

grid.addEventListener('click', clickCell = function (e) {
    if(!e.target.className.includes('cell')) return;

    // on cell click update matrix and render again
    var cell = e.target,
        row = cell.parentNode,

        i = indexOf(grid.childNodes, row),
        j = indexOf(row.childNodes, cell);

    cells[i][j] =( cells[i][j] == 1 ? 0 : 1);

    render(grid, cells);
});

document.querySelector('#start').addEventListener('click', function () {

    // once started disable click handler for cells
    grid.removeEventListener('click', clickCell);

    window.setInterval(function(){
        cells = simulate(cells);
        render(grid, cells);
    }, 1000);
});

render(grid, cells);



