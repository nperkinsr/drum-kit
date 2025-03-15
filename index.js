// When the first button is clicked, create an alert
// document.querySelectorAll("button").addEventListener("click", handleClick);

// function handleClick() {
//   alert("I got clicked");
// }

//////////////////////////////  DETECT BUTTON PRESS  //////////////////////////////

var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var foo = 0; foo < numberOfDrumButtons; foo++) {
  document
    .querySelectorAll(".drum")
    [foo].addEventListener("click", function () {
      var buttonInnerHTML = this.innerHTML;

      makeSound(buttonInnerHTML);
      buttonAnimation(buttonInnerHTML);
    });
}

//////////////////////////////  KEYBOARD FUNCTIONALITY  //////////////////////////////

function makeSound(key) {
  switch (key) {
    case "d":
      var hiHat = new Audio("sounds/hi-hat.mp3");
      hiHat.play();
      break;

    case "f":
      var snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "g":
      var highTom = new Audio("sounds/high-tom.mp3");
      highTom.play();
      break;

    case "h":
      var kickDrum = new Audio("sounds/kick-drum.mp3");
      kickDrum.play();
      break;

    case "j":
      var middleTom = new Audio("sounds/middle-tom.mp3");
      middleTom.play();
      break;

    case "k":
      var floorTom = new Audio("sounds/floor-tom.mp3");
      floorTom.play();
      break;

    case "l":
      var crashCymbal = new Audio("sounds/crash-cymbal.mp3");
      crashCymbal.play();
      break;

    default:
      console.log(buttonInnerHTML);
  }
}
document.addEventListener("keydown", function (event) {
  //console.log this to see the key on keydown
  makeSound(event.key);
  buttonAnimation(event.key);
});

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
