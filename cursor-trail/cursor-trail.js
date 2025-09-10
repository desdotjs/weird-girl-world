let pixel = [];

let pixelIndex= 0;

function preload() {
  pixel.push(loadImage('assets/cursor_pixels/cake_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/candy_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/chocostraw_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/cupcake_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/icecream_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/paw_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/bun_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/sundae_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/cherry_pixel.gif'));
  pixel.push(loadImage('assets/cursor_pixels/chocobar_pixel.gif'));
  // images are courtesy of artists of https://www.glitter-graphics.com/ :)

  // ".push" adds info to array - since we had to preload images, we added .push after our "pixel" variable to tell our code its array info!
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
}

function draw() {
  // no background for trailing effect
  
  // brackets [] are used to access an element

  let pixelArt = pixel[pixelIndex];
  image(pixelArt, mouseX, mouseY);

  //"%" finds the remainder (will ALWAYS be zero according to the expression below) so we can loop through the images!
  
  pixelIndex = (pixelIndex + 1) % pixel.length;
  
  // ".length" tells p5.js how many items are in our array (we loaded 5 gifs)
  
  // our "index" (home base) is 0
  
}