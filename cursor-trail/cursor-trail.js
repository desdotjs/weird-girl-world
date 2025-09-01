let pixel = [];

let pixelIndex= 0;

function preload() {
  pixel.push(loadImage('assets/cursor_pixels/cake_pixel.png'));
  pixel.push(loadImage('assets/cursor_pixels/candy_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/chocostraw_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/icecream_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/paw_pixel.gif'));
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(); // no background for trailing effect
  
  // brackets [] are used to access an element
  
  let pixelArt = pixel[pixelIndex];
  image(pixelArt, mouseX, mouseY);

  //"%" finds the remainder (will ALWAYS be zero according to the expression below) so we can loop through the images!
  
  pixelIndex = (pixelIndex + 1) % pixel.length;
  
  // ".length" tells p5.js how many items are in our array (we loaded 5 gifs)
  
  // our "index" (home base) is 0
  
}