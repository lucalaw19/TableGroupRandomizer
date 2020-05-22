// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/7lEU1UEw3YI
let names_ = ['','','','','','','','','','','','','','','',''];
let name_arr = []; // this is where the name array is randomized and set up as a 2D array for later

var boxes = [];
var randomButton;
var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup() {
  createCanvas(windowWidth, windowHeight);
  name_arr = random_sets(shuffle(names_));

  boxes.push(new Box(windowWidth / 3.1, windowHeight / 4 + 50, 125, 100)); //bottom left
  boxes.push(new Box(windowWidth / 3.1, (windowHeight / 4) * 3, 125, 100)); // top left
  boxes.push(new Box((windowWidth / 3.7) * 2.5, windowHeight / 4 + 50, 125, 100)); // bottom right
  boxes.push(new Box((windowWidth / 3.7) * 2.5, (windowHeight / 4) * 3, 125, 100)); // top right

  tableButton = createButton('add table');

  tableButton.position(10,500);
  tableButton.size(120, 40);
  tableButton.style('color', 'black');
  tableButton.style('border-radius', '10%');
  tableButton.style('font-size', '20px');
  tableButton.style('background-color', '#d8e7ff');
  tableButton.style('cursor', 'pointer');

  tableButton.mousePressed(function() {
  boxes.push(new Box(windowWidth/2, windowHeight/2, 125, 100));
  });

//function addNewRectBox() {
//boxes.push(new Box(windowWidth/2, windowHeight/2, 125, 62.5));
//}
// function addNewVertRectBox() {
//boxes.push(new Box(windowWidth/2, windowHeight/2, 62.5, 125));
//}


  randomButton = createButton('randomize');

  randomButton.position(windowWidth - 250, 19);
  randomButton.size(120, 40);
  randomButton.style('color', 'black');
  randomButton.style('border-radius', '10%');
  randomButton.style('font-size', '20px');
  randomButton.style('background-color', '#d8e7ff');
  randomButton.style('cursor', 'pointer');

  saveButton = createButton('save names');

  saveButton.position(5,19);
  saveButton.size(130, 40);
  saveButton.style('color', 'black');
  saveButton.style('border-radius', '10%');
  saveButton.style('font-size', '20px');
  saveButton.style('background-color', '#d8e7ff');
  saveButton.style('cursor', 'pointer');

  saveButton.mousePressed(function() {
    var data = {
      initials: initialInput.value(),
      score: score
    }
    console.log(data);
    var ref = database.ref('scores');
    ref.push(data);

  })
  var name = createInput();
   name.attribute('placeholder', 'Insert names here (comma-separated)');
   name.input(myInputEvent);
   name.position(windowWidth / 4 - 100, 19); //location of search box
   name.style('font-size', '20px');
   name.style('border-style', 'solid');
   name.style('border-width','1px');
   name.style('border-color', 'blue');
   name.style('border-radius', '4px');
   name.style('padding', '8px');
   name.style('width', '60%');
   // name.style('border', '#ff0000');
   // name.style('background-color', '200,200,200');
   randomButton.mousePressed(function() {
       addNames();
       name_arr = random_sets(shuffle(names_));
       name.value('');
   });
 }

 function myInputEvent() {
     studentNames = this.value();
 }

 function addNames(){
     names_= split(studentNames, ',');
     x_dif = (4*boxes.length) - split(studentNames, ',').length;
     for (i = 0; i < x_dif; i++){
         names_.push('');
     }
 }


 function draw() {
     background(247, 248, 249); // background
     for (var i = 0; i < boxes.length; i++) {
         boxes[i].show();
         boxes[i].text(name_arr[i % name_arr.length]); //
     }
     fill(202, 205, 209);
     rect(25, 395, 25, 65);
     fill('black');
     textSize(32);
     strokeWeight(0.1);
     text('door', 55, 400);

 }

 function mousePressed() {
     for (var i = 0; i < boxes.length; i++) {
         //checking to see if the mouse is over the box and turning it white if it is
         if (boxes[i].boxover) {
             boxes[i].locked = true;
             print('mouse is pressed');
         } else {
             boxes[i].locked = false;
             print('mouse isn\'t pressed');
         }
         boxes[i].xoffset = mouseX - boxes[i].xpos;
         boxes[i].yoffset = mouseY - boxes[i].ypos;
         print(boxes[i].locked);
     }
 }

 function mouseDragged() {
     for (var i = 0; i < boxes.length; i++) {
         if (boxes[i].locked) {
             boxes[i].xpos = mouseX - boxes[i].xoffset;
             boxes[i].ypos = mouseY - boxes[i].yoffset;
         }
     }
 }

 function mouseReleased() {
     for (var i = 0; i < boxes.length; i++) {
         boxes[i].locked = false;
     }
 }
 class Box {
    constructor(xpos, ypos, boxsizex, boxsizey) {
        this.xpos = xpos; // starting x
        this.ypos = ypos; // starting y
        this.boxsizex = boxsizex; // size of square
        this.boxsizey = boxsizey;
        this.boxover = false;
        this.locked = false;
        this.xoffset = 0;
        this.yoffset = 0;
        rectMode(RADIUS);
    }
    show() {
            if (mouseX > this.xpos - this.boxsizex && mouseX < this.xpos + this.boxsizex &&
                mouseY > this.ypos - this.boxsizey && mouseY < this.ypos + this.boxsizey) {
                this.boxover = true;
                fill(96, 153, 255); //box color when mouse hovers
                stroke(0, 0, 0); // color of border when dragged
                strokeWeight(3); // thickness of border when dragged
                if (mouseIsPressed && this.boxover == true) {
                    fill(96, 153, 255); //box color when mouse preseed
                    stroke(0, 0, 0); // color of border when dragged
                    strokeWeight(3); // thickness of border when dragged
                } else {
                    stroke(0, 0, 0); // color of border when dragged
                    strokeWeight(3); // thickness of border when dragged
                }
            } else {
                this.boxover = false;
                stroke(0, 0, 0); // color of border when dragged
                strokeWeight(3); // thickness of border when dragged
                fill(96, 133, 195); // color of boxes when mouse not over box
            }
            rect(this.xpos, this.ypos, this.boxsizex, this.boxsizey, 7);
            stroke(2);
            strokeWeight(3);
            stroke(0, 0, 0);
            line(this.xpos -122, this.ypos, this.xpos +122, this.ypos, 7);
        }

        text(text_arr) {
            push();
            strokeWeight(0);
            fill(0, 0, 0);
            textSize(20);
            text(text_arr[0], this.xpos +75, this.ypos - this.boxsizey - 10);
            text(text_arr[1], this.xpos +75, this.ypos + this.boxsizey + 25);
            text(text_arr[2], this.xpos - 100, this.ypos - this.boxsizey - 10);
            text(text_arr[3], this.xpos - 100, this.ypos + this.boxsizey + 25);
            if (names_.length > 16) {
                text(text_arr[4], this.xpos - 15, this.ypos);
            }
            pop();
        }
    }

    //function shuffle(a) { // this just shuffles an array i got it off of Stack Overflow
       // var j, x, i;
       // for (i = a.length - 1; i > 0; i--) {
         //   j = Math.floor(Math.random() * (i + 1));
           // x = a[i];
         //   a[i] = a[j];
         //   a[j] = x;
       // }
        //return a;
    //}

    function random_sets(name_arr) { // name_arr is a normal array of strings ['s1', 's2'...]
        var master_arr = [];
        for (i = 0; i < name_arr.length; i += 4) { // this 4 is for the number of tables if you want to rewrite the function (please do)
            var temp = [];
            for (j = i; j < i + 4; j++) { // only 4 ppl allowed per table
                temp.push(name_arr[j]);
            }
            master_arr.push(temp)
        } // this is a 2 dimensional for loop (used when you have to navigate or build a 2D array
        // this particular set of for loops is meant to build a 2D array
        return master_arr; // returns the 2D array (a 2D array is and array of arrays [[items],[more, items],...]
    }// try writing your own version of this, what wrote is frankly not great (there is a story tho)

  var firebaseConfig = {
   apiKey: "AIzaSyC-EdvASdYKq8CFRYz7Xi9ZOG39K0wMYcM",
   authDomain: "table-group-randomizer.firebaseapp.com",
   databaseURL: "https://table-group-randomizer.firebaseio.com",
   projectId: "table-group-randomizer",
   storageBucket: "table-group-randomizer.appspot.com",
   messagingSenderId: "1061758235591",
   appId: "1:1061758235591:web:df2a66d2e521d1282fdfe2",
   measurementId: "G-RL1HHMQ72S"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
 console.log(firebase)

}

function submitScore() {
  var data = {
    initials: initialInput.value(),
    score: score
  }
  console.log(data);
  var ref = database.ref('scores');
  ref.push(data);
}
