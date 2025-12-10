let sheepImg;
let dogImg;

let dogNPC;

// storing wool + stardust pngs, 12 total

// 0 - dirty, 1 - semi-clean, 2 - clean

// think of "index" as a way to access an array

let allWool = []; // info for ALL wool object instances
let wIndex = 0; // tracks which variant

let woolImg0 = [];
let woolImg1 = [];
let woolImg2 = [];

let vIndex = 0;

let allSD = []; // for ALL stardust instances
let sdIndex = 0; // tracking which variant - 0, 1, 2?

let sdImg0 = [];
let sdImg1 = [];
let sdImg2 = [];


// STORING INVISIBLE RECT OBJECTS - you can store object info in an array! apparently.
// placeholder values

const spawnZones = [
  
  { x: 224,  y: 308,  w: 210, h: 95 }, // head
  
  { x: 455, y: 550,  w: 185, h: 120 }, // body
  
  { x: 260, y: 601, w: 120, h: 140 }, // chest

];

function setup() {
  
  createCanvas(768, 1104);
  
  imageMode(CENTER);
  
  frameRate(30);
  
  wsInitializer(); // calling spawn intitializer in setup
  
  dogNPC = new Dog(); // create the dog instance here
  
}

function wsInitializer() { // "wool spawn initializer"
  
// initializing HOW MANY wools to spawn
    
    // "zi" zone index
    for (let zi = 0; zi < spawnZones.length; zi++) { 
    // looping through each spawn zone
      
      let wsi = floor(random(5, 10)); // wool spawn integer
      
      for (let w = 0; w < wsi; w++) { // run 4-8 times for each spawn zone
        
      let nw = new Wool(0, 0)
      // create new Wool object - nw so we dont have to manually type it all
      
      nw.zIndex = zi
      // zIndex accesses property of object we JUST created
        
      allWool.push(nw)
        
      }
      
    }
  
  }  

function preload() {
  
  sheepImg = loadImage("../assets/absolute_lamb_media/sheep_img.png");
  dogImg = loadImage("../assets/absolute_lamb_media/dog_gif.gif");
  
  woolImg0.push(loadImage("../assets/absolute_lamb_media/wool 1.png"));
  woolImg0.push(loadImage("../assets/absolute_lamb_media/wool 2.png"));
  woolImg0.push(loadImage("../assets/absolute_lamb_media/wool 3.png"));
  woolImg0.push(loadImage("../assets/absolute_lamb_media/wool 4.png"));
  
  woolImg1.push(loadImage("../assets/absolute_lamb_media/wool 1.1.png"));
  woolImg1.push(loadImage("../assets/absolute_lamb_media/wool 2.1.png"));
  woolImg1.push(loadImage("../assets/absolute_lamb_media/wool 3.1.png"));
  woolImg1.push(loadImage("../assets/absolute_lamb_media/wool 4.1.png"));
  
  woolImg2.push(loadImage("../assets/absolute_lamb_media/wool 1.2.png"));
  woolImg2.push(loadImage("../assets/absolute_lamb_media/wool 2.2.png"));
  woolImg2.push(loadImage("../assets/absolute_lamb_media/wool 3.2.png"));
  woolImg2.push(loadImage("../assets/absolute_lamb_media/wool 4.2.png"));
  
  sdImg0.push(loadImage("../assets/absolute_lamb_media/blue_star.png"));
  sdImg0.push(loadImage("../assets/absolute_lamb_media/rainbow_heart.png"));
  sdImg0.push(loadImage("../assets/absolute_lamb_media/pink_heart.png"));
  
  sdImg1.push(loadImage("../assets/absolute_lamb_media/blue_heart.png"));
  sdImg1.push(loadImage("../assets/absolute_lamb_media/rainbow_star.png")); 
  
  sdImg2.push(loadImage("../assets/absolute_lamb_media/rainbow_star.png"));

  
}


function draw() {
  
  // console.log(mouseX, mouseY);
  
  let sW = 657; // sheepImg width
  let sH = 532; // sheepImg height
  
  let sX = width/2
  let sY = height/2
  
  background(207, 244, 255);
  
  image(sheepImg, sX, sY, sW, sH);
  
  dogNPC.update();
  
  for (let w of allWool) {
    
    if (!w.hasSpawned) w.spawn();
    w.update();
    
    }
  
  for (let d of allSD) {
  
    d.update();
  
  }
  
  allSD = allSD.filter(d => !d.dead);
  // go through all the dust objects and keep the ones NOT DEAD aka dead = false;
  // => "return whatever is on the right"
  
}

function checkHover() {
  
  let mz = spawnZones[this.zIndex]; // mz "mouse zones"
  
  if (mouseX > mz.x && mouseX < mz.x + mz.w &&
      mouseY > mz.y && mouseY < mz.y + mz.y);
  
}

class Wool {
  
  constructor(x, y) {
    
    // current position
    this.x = x;
    this.y = y;

    this.zIndex = 0; // zone where wool can spawn
  
    // brushing increases 0 > 1 > 2, wolf npc resets index
    this.cIndex = 0; // "cleanliness" index
    
    this.hasSpawned = false;
    // tracks if it spawned or not -- prevents position from updating every frame
    
    this.wi0 = vIndex; // wi0 "wool index 0 (dirty)"
    vIndex = (this.wi0 + 1) % woolImg0.length;
    
    // sizing for wool pngs per array
    this.w0 = woolImg0[this.wi0].width * 0.3;
    this.h0 = woolImg0[this.wi0].height * 0.3;
    
    
    this.hTime = 0; // hover time counter
    
    this.sdTimer = 0;
    this.sdInterval = 30
    
  
    
  }
  
  spawn() { // only decides WHERE the wool appears + draws them ONCE
    
    image(woolImg0[this.wi0], this.x, this.y, this.w0, this.h0);
    
    if (!this.hasSpawned) { // picks position once, first frame
      
      let zone = spawnZones[this.zIndex]; // grabbing zones wool belongs to
      
      // choosing random position for wool to appear upon startup
      this.x = random(zone.x, zone.x + zone.w);
      this.y = random(zone.y, zone.y + zone.h);
      this.hasSpawned = true;
      
      }
    
    }
  
  update() {
    
  let imgSet =
    
    this.cIndex === 0 ? woolImg0 :
  
    this.cIndex === 1 ? woolImg1 :
  
    this.cIndex === 2 ? woolImg2 :

    woolImg0;
                        
    image(imgSet[this.wi0], this.x, this.y, this.w0, this.h0);
    
    this.wiggle();
    
    this.sdTimer++;

    if (this.MouseInZone()) {
      
    // Dirty wool spawns sdImg0 dust
      
    if (this.cIndex === 0 && this.sdTimer > 20) {
      
    this.spawnDust(sdImg0);
      
    this.sdTimer = 0;
      
  }
      
}
    
    if (this.MouseInZone()) {
      
      this.hoverTime++; // counting how long in zone
      
        } else {
          
          this.hoverTime = 0;
          
      }  
    
    if (this.cIndex === 0 && this.hoverTime > 300) {
      
      this.cIndex = 1;
        
      } else if (this.cIndex === 1 && this.hoverTime > 650) {
    
        this.cIndex = 2;
    }
    
   if (this.MouseInZone()) {

      this.sdTimer++;

      let dustSet =
          
        this.cIndex === 0 ? sdImg0 :
      
        this.cIndex === 1 ? sdImg1 :
      
        this.cIndex === 2 ? sdImg2 :
      
        sdImg0;

      if (this.sdTimer >= this.sdInterval) {
        
        this.spawnDust(dustSet);
        
        this.sdTimer = 0;
        
      }

    } else {
      
      this.sdTimer = 0;
      
    }
    
  }
  
  
  
  wiggle() { // movement for wools
    
    if (!this.MouseInZone()) return;  // if NOT hovered, return says hey! do nothing
    
    let zone = spawnZones[this.zIndex];

    // offset values
    let offx = random(-2, 2);
    let offy = random(-2, 2);
    
    // constrain offset in zone
    
    this.x = constrain(this.x + offx, zone.x, zone.x + zone.w);
    this.y = constrain(this.y + offy, zone.y, zone.y + zone.h);

    
  }
  
  spawnDust(imgArray) {
    
    let d = new Dust(this.x, this.y);
    
    this.del = false; // deletes stardust from array so thing doesnt crash
    
    d.img = random(imgArray); // pick a random dust image
    
    allSD.push(d);
  
  }
  
  
  MouseInZone() {
    
    let zone = spawnZones[this.zIndex];
    
    // return statement checking if mouse is inside this rectangle?
    // remember, "return" specifies the value a function should output - if all are true, then mouse is inside zone 
    
    return (
      
        mouseX >= zone.x &&
        mouseX <= zone.x + zone.w &&
        mouseY >= zone.y &&
        mouseY <= zone.y + zone.h
      
    );
    
  }
  
}

class Dust {

  constructor(x, y) {
    
    this.dead = false;
    
    this.pos = createVector(x, y);
    
    this.size = random(10, 25);
    
    this.ys = random(1, 3);  // upward speed
    
    this.img = null; // assigned on spawn
    
  }

  update() {
    
    // move upward
    this.pos.y -= this.ys;

    let n = noise(frameCount * 0.1 + this.pos.y * 0.01);
    
    let wiggle = map(n, 0, 1, -3, 3); 
    
    this.pos.x += wiggle;

    // draw
    
    push();
    
    image(this.img, this.pos.x, this.pos.y, this.size, this.size);
    
    pop();
    
    // JUST CHECKS IF THE STARDUST HITS THE BOUNDARY
    
    if (this.pos.y + this.size < 0) {
      
      this.dead = true;
      // if it does, then yes, its dead
      
    }
    
  }
  
}

class Dog {
  
  constructor() {
    
    this.x = random(width);
    this.y = random(height);

    // starting velocities in x and y
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);

    this.ns = 0.2; // noise increment + directions
    this.xN = random(2000);
    this.yN = random(2000);

    this.size = 70;
    
    // area width and height
    this.area = 600;

    // movement area
    this.mX = width / 2 - this.area / 2;
    this.mY = height / 2 - this.area / 2;
    

    
  }

  update() {
    
    // add smooth random noise to velocities
    this.vx += map(noise(this.xN), 0, 0.9, -0.6, 0.6);
    this.vy += map(noise(this.yN), 0, 0.9, -0.7, 0.7);

    // cap speeds so dog doesnt fly off screen
    this.vx = constrain(this.vx, -4, 4);
    this.vy = constrain(this.vy, -4, 4);

    // move
    this.x += this.vx;
    this.y += this.vy;

    this.xN += this.ns;
    this.yN += this.ns;

    // bounce off edges instead of getting stuck in a corner
    if (this.x < this.mX || this.x > this.mX + this.area) {
      
      this.vx *= -10; 
      
      this.x = constrain(this.x, this.mX, this.mX + this.area);
    
    }
    
    if (this.y < this.mY || this.y > this.mY + this.area) {
      
      this.vy *= -10; // operator means "multiply and assign"
      
// so, multiplying the current noise value stored in vy by -1 creates the opposite value, effectively "flipping" the direction of the dog
// vx + vy is almost never 0, so, || would be ineffective like i tried before - || is kind of an "OR" moment and does not do math for us
      
      this.y = constrain(this.y, this.mY, this.mY + this.area);
      
    }

    // check collisions with wool zones
    
    for (let w of allWool) {
      
      let zone = spawnZones[w.zIndex];
      
      if (
      
        this.x > zone.x && this.x < zone.x + zone.w &&
        
        this.y > zone.y && this.y < zone.y + zone.h
        
      ) 
      
      { // resetting indexes
      
        w.cIndex = 0;
        
        w.hoverTime = 0;
      
      }
      
    }

    this.display();
    
  }

  display() {
    
    image(dogImg, this.x, this.y, this.size, this.size);
    
  }
  
}
