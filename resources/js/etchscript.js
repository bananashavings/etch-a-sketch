"use strict";
var body = document.body;
var changeGridSizeButton = document.getElementById("changeGridSize");
var resetButton = document.getElementById("resetButton");
var drawRadio = document.getElementById("draw");
var eraseRadio = document.getElementById("erase");
var randomColorCheckbox = document.getElementById("randomColorCheckbox");
var cellSizeSlider = document.getElementById("cellSizeSlider");
changeGridSizeButton.addEventListener("click", function () { resetGrid(true); });
resetButton.addEventListener("click", function () { resetGrid(false); });
cellSizeSlider.addEventListener("input", function () { changeCellSize(cellSizeSlider.value); });
function createGrid(gridSize) {
    var gridWrapper = document.createElement("div");
    var grid = document.createElement("div");
    gridWrapper.id = "gridWrapper";
    grid.id = "grid";
    grid.dataset.gridSize = gridSize;
    for (var y = 0; y < gridSize; y++) {
        var row = document.createElement("div");
        row.setAttribute("name", ("row-" + y));
        var _loop_1 = function (x) {
            var col = document.createElement("section");
            col.setAttribute("name", ("col-" + x));
            col.dataset.colored = false;
            col.addEventListener("mouseover", function () { changeColor(col); });
            row.appendChild(col);
        };
        for (var x = 0; x < gridSize; x++) {
            _loop_1(x);
        }
        grid.appendChild(row);
    }
    gridWrapper.appendChild(grid);
    var cellSize = (cellSizeSlider.value / gridSize);
    document.documentElement.style.setProperty("--cellSize", (cellSize + "em"));
    return gridWrapper;
}
function changeColor(cell) {
    if (drawRadio.checked) {
        if (randomColorCheckbox.checked) {
            delete cell.dataset.colored;
            cell.style.backgroundColor = randomColor();
        }
        else {
            cell.removeAttribute("style");
            cell.dataset.colored = true;
        }
    }
    else if (eraseRadio.checked) {
        cell.removeAttribute("style");
        cell.dataset.colored = false;
    }
}
function resetGrid(changeSize) {
    if (changeSize === void 0) { changeSize = false; }
    var gridSize;
    if (changeSize) {
        gridSize = prompt("Grid Size: ", "16");
    }
    else {
        gridSize = document.getElementById("grid").dataset.gridSize;
    }
    var newGrid = createGrid(gridSize);
    document.getElementById("grid").replaceWith(newGrid);
    drawRadio.checked = true;
}
function randomColor() {
    var color = "#";
    var chars = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
        var charIndex = Math.floor(Math.random() * chars.length);
        var char = chars.charAt(charIndex);
        color += char;
    }
    return color;
}
function changeCellSize(space) {
    var gridSize = document.getElementById("grid").dataset.gridSize;
    var cellSize = (space / gridSize);
    document.documentElement.style.setProperty("--cellSize", (cellSize + "em"));
}
body.appendChild(createGrid(16));
