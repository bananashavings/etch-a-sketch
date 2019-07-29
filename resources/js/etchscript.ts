const body = document.body;
const changeGridSizeButton = document.getElementById("changeGridSize");
const resetButton = document.getElementById("resetButton");
const drawRadio = document.getElementById("draw");
const eraseRadio = document.getElementById("erase");
const randomColorCheckbox = document.getElementById("randomColorCheckbox");
const cellSizeSlider = document.getElementById("cellSizeSlider");

changeGridSizeButton.addEventListener("click", function() { resetGrid(true) });
resetButton.addEventListener("click", function() { resetGrid(false) });
cellSizeSlider.addEventListener("input", function() { changeCellSize(cellSizeSlider.value) });

function createGrid(gridSize: number): HTMLElement {
  const gridWrapper = document.createElement("div");
  const grid = document.createElement("div");

  gridWrapper.id = "gridWrapper";
  grid.id = "grid";
  grid.dataset.gridSize = gridSize;

  for(let y = 0; y < gridSize; y++) {
    let row = document.createElement("div");
    row.setAttribute("name", ("row-" + y));

    for(let x = 0; x < gridSize; x++) {
      let col = document.createElement("section");
      col.setAttribute("name", ("col-" + x));
      col.dataset.colored = false;
      col.addEventListener("mouseover", function() { changeColor(col) })

      row.appendChild(col);
    }
    grid.appendChild(row);
  }
  gridWrapper.appendChild(grid);

  const cellSize = (cellSizeSlider.value / gridSize);
  document.documentElement.style.setProperty("--cellSize", (cellSize + "em"));

  return gridWrapper;
}

function changeColor(cell: HTMLElement) {
  if(drawRadio.checked) {
    if(randomColorCheckbox.checked) {
      delete cell.dataset.colored;
      cell.style.backgroundColor = randomColor();
    } else {
      cell.removeAttribute("style");
      cell.dataset.colored = true;
    }
  } else if(eraseRadio.checked) {
    cell.removeAttribute("style");
    cell.dataset.colored = false;
  }
}

function resetGrid(changeSize = false)
{
  const gridSize: number;

  if(changeSize) {
    gridSize = prompt("Grid Size: ", "16");
  }
  else {
    gridSize = document.getElementById("grid").dataset.gridSize;
  }

  const newGrid: HTMLElement = createGrid(gridSize);

  document.getElementById("grid").replaceWith(newGrid);

  drawRadio.checked = true;
}

function randomColor(): String {
  let color: String = "#"
  let chars: String = "0123456789ABCDEF";

  for(let i = 0; i < 6; i++) {
    const charIndex = Math.floor(Math.random() * chars.length);
    const char = chars.charAt(charIndex);

    color += char;
  }

  return color;
}

function changeCellSize(space: number) {
  const gridSize = document.getElementById("grid").dataset.gridSize;
  const cellSize = (space / gridSize);

  document.documentElement.style.setProperty("--cellSize", (cellSize + "em"));
}

body.appendChild(createGrid(16));
