console.log("tesing, testing, 123!")

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw()  {
    background(220);

// clear(); //removes background essentially
  
  // red value
  let r = map(mouseX, 0, width, 0, 255);
  // mapping is getting numbers from one place and feeding those numbers into another place. re-maps a number from one range to another.
  let g = map(mouseX, 0, height, 0, 255);
  let size = map(mouseX * mouseY, 0, width * height, 2, 60)
  
  fill(r, g, 150);
  noStroke();
  ellipse (mouseX, mouseY, size, size);
  
  fill(255);
  textSize(10);
  // text(mouseX, mouseX, mouseY);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

}