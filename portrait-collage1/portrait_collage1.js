// IMAGE STORAGE

let bgImg;

// IMAGE SIZE

let dogzSize = 80;

// BOOLEANS

let dogzIndex = 0;

// ARRAYS

let dogzBark = []; // array to store dogz bark gifs
let dogzRun = []; // array to store dogz run gifs
let allDogz = []; // array to store ALL OBJECT INSTANCES. inside each object, we have everything in the constructor stored - INCLUDING bark gifs and run gifs hence why we can call allDogz in the mouseClicked function

// so, for OOP, you ALWAYS need an array to store EACH INDIVIDUAL OBJECT in ADDITION to the arrays that store DATA 


function setup() {
  
  createCanvas(893, 1157);
  
  imageMode(CENTER);
  
}

function preload() {
  
  bgImg = loadImage ("../assets/portrait_collage1_media/portrait_collage1_bg.png");
  
  //dogz bark gifs
  
  dogzBark.push(loadImage ("../assets/portrait_collage1_media/dogz_poodle.gif"));
  dogzBark.push(loadImage ("../assets/portrait_collage1_media/dogz_collie.gif"));
  dogzBark.push(loadImage ("../assets/portrait_collage1_media/dogz_corgi.gif"));
  
  // dogz run gifs
  
  dogzRun.push(loadImage("../assets/portrait_collage1_media/dogz_poodle_run.gif"));
  dogzRun.push(loadImage("../assets/portrait_collage1_media/dogz_collie_run.gif"));
  dogzRun.push(loadImage("../assets/portrait_collage1_media/dogz_corgi_run.gif"));
  
}

function draw() {
  
  // background(220);
  
  image(bgImg, width / 2, height / 2, width, height);

  for (let d of allDogz) {
   // "for each thing in allDogz, call it dogz"

    d.update();
  
  }
  
}

function mouseClicked() {
  
  allDogz.push(new Dogz(mouseX, mouseY));

}


class Dogz {
  
  constructor(x, y) {
    
    this.pos = createVector(x, y); // where they spawn when mouseClicked
    this.direction = random(300); // directions they run
    this.ns = random(2, 5); // noise scale for now
    
    this.state = false; // switch between running + barking - the MODE
    this.lastSwitch = millis(); // timestamp for when to CHANGE the mode
    this.switchInterval = random(2000, 8000) // how LONG until they decide to CHANGE MODE
    // millis is cleaner in case frame rate drops for whatever reason
   
    this.dogzIndex = dogzIndex; // starting at 0 in our arrays
    this.barkGif = dogzBark[this.dogzIndex];
    this.runGif = dogzRun[this.dogzIndex];
    
    
    dogzIndex++ // to cycle through array
    dogzIndex = dogzIndex % 3; // to cycle back to 0
    

  }
  
  update() { // DECIDES BARK OR RUN
    
    // this stuff is what we avoid when we use vectors
    // this.pos.x+=this.move.x SHORTHAND : this.pos.add(this.move)
    
    // check how long since last switch
    
    if (millis() - this.lastSwitch > this.switchInterval) {
      
    // if milliseconds minus milliseconds is greater than a random value between 1000 - 3000,
      
    this.state = !this.state 
    // if a false state equals true state
      
    this.lastSwitch = millis();
    // if milliseconds equals milliseconds,
      
    this.switchInterval = random(1000, 3000);
    // if we pick a new random interval for next behavior change
      
  }
    // do the actual behavior
    
    if (!this.state) {
      // if NOT false, meaning NOT barking (since state = false)
    
      this.bark();
      
    
    } else {
      // if true then bark
      
      this.run();
  }
    
}
  
// since our object has multiple behaviors, a spawn method was actually holding me back. spawn is NOT a behavior, it is an event - this worked for laundry space because the bubbles being drawn did not have different behaviors to switch between, they were simply being spawned with random speeds, sizes, and offsets
  
  bark() { // STATIONARY bark behavior display
    
    image(this.barkGif, this.pos.x, this.pos.y, dogzSize, dogzSize);
    
  }
  
  run() { // MOVING run behavior display
    
    let nx = noise(this.direction) * 2 - 1;
    let ny = noise(this.direction + 1000) * 2 - 1;
    
    // large offset for y axis allows puppies to run more "freely" - if it was the same for the x axis, the dogz would be running on a diagnol line

    this.pos.x += nx * this.ns;
    this.pos.y += ny * this.ns;

    this.direction += 0.01;

    image(this.runGif, this.pos.x, this.pos.y, dogzSize, dogzSize);
    
  }
  

  
}