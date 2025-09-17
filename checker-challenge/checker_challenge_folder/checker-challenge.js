let img1, img2, img3;
let grid = [];
let cols = 6;
let rows = 6;
let cellSize = 100;

// TREAT OBJECTS AS THEIR OWN LITTLE CONTAINERS OF DATA

function preload() {
  img1 = loadImage('assets/checker_challenge/img1.png'); // pochacco icecream
  img2 = loadImage('assets/checker_challenge/img2.png'); // pompompurin
  img3 = loadImage('assets/checker_challenge/img3.png'); // lps bear toy
}

class Cell {
  
// OUR OBJECT IS THE CELLS, NOT THE IMAGES  
// a class is a reuseable thing with data AND behavior...
// ... while a function is ONLY a chunk of reusable behavior
  
  constructor(x, y, baseImg) {
    this.x = x; // x + y are inputs for our cell. we can define these later
    this.y = y;
    this.base = baseImg;
    this.current = baseImg; // current meaning what the cell is showing NOW

// current, x, y, and base would NOT exist without defining them as properties as this. first
// a constructor is something that initializes values for our object
// "this." is how we tell the code to create its OWN copy for the object data in EACH CELL we created
    
  }

  //https://p5js.org/reference/p5.Element/show/ - a method is a function that belongs to an object (in this case, our cells)
  
  show() {
    image(this.current, this.x, this.y, cellSize, cellSize);
// image(img, x, y, width, height) - this. is calling to the object parameters we created, and image draws it inside 

    
  }

  toggle() {
    if (this.current === this.base) {
      
    // checking if current ALSO EQUALS base...
      
      this.current = img3;  // if true, flip to img3

      
    } else {
      
      this.current = this.base; 
      
    // and since current(img3) ALSO EQUALS this.base (img1 or img2), we flip back to one of our bases
      
    }
  }

  // checking if mouse is within the boundaries of our checker board cells
  
  contains(mx, my) {
    
// mx - mouse x coordinate, my - mouse y coordinate. we give these meaning later
    return (
// return sends true or false value back to your method
// in this case contains is our method
      
      mx > this.x - cellSize / 2 &&
      mx < this.x + cellSize / 2 &&
      my > this.y - cellSize / 2 &&
      my < this.y + cellSize / 2
      
      
    );
  }
}

function setup() {
  let cnv = createCanvas(cols * cellSize, rows * cellSize);
  cnv.parent("checkerboard")
  imageMode(CENTER);

  // we are building the checkerboard here!
  for (let y = 0; y < rows; y++) {
  // if y is less than 6 (rows defined globally) then add a row (y++)
    
    grid[y] = []; // array representing our row of cells
    
    for (let x = 0; x < cols; x++) {

  // if x is less than 6 (cols defined globally) than add a column (x++)
      
      let cx = x * cellSize + cellSize / 2;
      
      // cx = 0 * 100 + 100 / 2
      // x * cellsize (top left corner of cell)
      // / 2 centers image within the cell
      
      let cy = y * cellSize + cellSize / 2;
      
      let baseImg = (x + y) % 2 === 0 ? img1 : img2; // checker pattern
      
      grid[y][x] = new Cell(cx, cy, baseImg);
      
      // "make a new cell object using our Cell class"
      
    }
  }
}

function draw() {
  
  background(220);

  for (let y = 0; y < rows; y++) {
    
    for (let x = 0; x < cols; x++) {
      
      grid[y][x].show();
      
      // using for loops to draw our images across the x and y access
      
    }
  }
}

function mousePressed() {
  // looping through grid, finding clicked cell
  
  for (let y = 0; y < rows; y++) {
    
    for (let x = 0; x < cols; x++) {
      
      let cell = grid[y][x];
      
      if (cell.contains(mouseX, mouseY)) {
        // if mouseX and mouseY is inside the checker container...
        
        cell.toggle();

        // then toggle to baseImg, defined as both img1 and img2 in our setup
      }
    }
  }
}