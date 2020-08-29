let size = 8;
let mode = 'mono';
const container = document.querySelector(".container");
const buttons = [...document.querySelectorAll("button")];
const sizeButtons = buttons.slice(0, 3);
const modeButtons = buttons.slice(4, 7);
const clear = buttons[3];

const randomColor = () => {
  let color = "#";
  const digits = "0123456789ABCDEF";
  for (let i=0; i<6; i++){
    color += digits[Math.floor(Math.random()*16)];
  }
  return color;
}

const colorize = (element) => {
  if (mode === 'mono'){
    if (!element.classList.contains("blue")){
      element.classList.add('blue');
    }
  } else if (mode === 'color'){
    element.style.backgroundColor = randomColor();
  } else if (mode === 'additive'){
    if (isNaN(parseFloat(element.style.opacity))){
      element.classList.add('blue');
      element.setAttribute("style", "opacity: 0.1;");
    } else {
      if (parseFloat(element.style.opacity) <= 0.9){
        element.style.opacity = parseFloat(element.style.opacity) + 0.1;
      }
    }
  }
}

const hover = (e) => {
  colorize(e.target);
}

container.addEventListener('mousedown', (e)=>{
  e.currentTarget.childNodes.forEach((node) => {
    node.addEventListener("mouseover", hover);
    colorize(e.target);
  })
  document.body.addEventListener('mouseup', (e)=>{
    container.childNodes.forEach((node) => {
      node.removeEventListener("mouseover", hover);
    })
  })
})

const gridSize = (size) => {
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i=0; i<size*size; i++){
    container.appendChild(document.createElement(`div`));
  }
  container.childNodes.forEach((node) => {
    node.classList.add("cell");
  })
}

const searchButtons = (buttons) => {
  for (let i=0; i<buttons.length;i++){
    if(buttons[i].classList.contains("btn-active")){
      buttons[i].classList.remove("btn-active");
    }
  }
}

function activeButton(e){
  if (sizeButtons.some(element => {
    return element === e.currentTarget;})
  ){
    searchButtons(sizeButtons);
    e.currentTarget.classList.add("btn-active");
    switch (e.currentTarget.id){
      case "small":
        size = 8;
        break;
      case "medium":
        size = 24; 
        break;
      case "large":
        size = 48;
        break;
      default:
        size = 8;
        break;
    }
    gridSize(size);
  } else {searchButtons(modeButtons);
    e.currentTarget.classList.add("btn-active");
    mode = e.currentTarget.id;
    switch (mode) {
      case "mono":
        container.style.borderColor = "burlywood";
        break;
      case "color":
        container.style.borderColor = randomColor();
        break;
      case "additive":
        container.style.borderColor = "var(--accent-primary)";
        break;
      default:
        container.style.borderColor = "burlywood";
    }
    gridSize(size);
  }
}

sizeButtons.forEach((button)=>{
  button.addEventListener('click', activeButton)})

modeButtons.forEach((button)=>{
  button.addEventListener('click', activeButton)})

clear.addEventListener('click', () => {
  gridSize(size);
});

gridSize(size);


