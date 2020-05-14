// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/7lEU1UEw3YI

var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup() {
  canvas = createCanvas(100, 100);
  score = 0;
  createP('Click the button to get points.')
  button = createButton('click');
  button.mousePressed(increaseScore);
  initialInput = createInput('initials');
  submitButton = createButton('submit');
  submitButton.mousePressed(submitScore);

  // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyC-EdvASdYKq8CFRYz7Xi9ZOG39K0wMYcM",
      authDomain: "table-group-randomizer.firebaseapp.com",
      databaseURL: "https://table-group-randomizer.firebaseio.com",
      projectId: "table-group-randomizer",
      storageBucket: "table-group-randomizer.appspot.com",
      messagingSenderId: "1061758235591",
      appId: "1:1061758235591:web:1e7ce1715193ef7f2fdfe2",
      measurementId: "G-ZKRSPR6DXK"
    };
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
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

function increaseScore() {
  score++;
}

function draw() {
  background(0);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(score, width / 2, height / 2);
}
