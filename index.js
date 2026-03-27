var drumConfig = {
  h: {
    name: "Hi-Hat",
    file: "sounds/hi-hat.mp3"
  },
  s: {
    name: "Snare",
    file: "sounds/snare.mp3"
  },
  k: {
    name: "Kick",
    file: "sounds/kick-drum.mp3"
  },
  c: {
    name: "Crash",
    file: "sounds/crash-cymbal.mp3"
  },
  t: {
    name: "High Tom",
    file: "sounds/high-tom.mp3"
  },
  m: {
    name: "Middle Tom",
    file: "sounds/middle-tom.mp3"
  },
  f: {
    name: "Floor Tom",
    file: "sounds/floor-tom.mp3"
  }
};

var demoSequence = "K H S H K H S H K H S H K K S C";
var audioCache = {};
var drumButtons = document.querySelectorAll(".drum");
var sequenceInput = document.getElementById("sequence-input");
var sequenceHelp = document.getElementById("sequence-help");
var playSequenceButton = document.getElementById("play-sequence");
var stopSequenceButton = document.getElementById("stop-sequence");
var loadDemoButton = document.getElementById("load-demo");
var tempoSlider = document.getElementById("tempo");
var tempoValue = document.getElementById("tempo-value");
var activeSequenceTimeouts = [];

Object.keys(drumConfig).forEach(function (key) {
  audioCache[key] = new Audio(drumConfig[key].file);
  audioCache[key].preload = "auto";
});

drumButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var key = this.dataset.key;
    playDrum(key);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.target === sequenceInput) {
    return;
  }

  var key = event.key.toLowerCase();

  if (drumConfig[key]) {
    playDrum(key);
  }
});

playSequenceButton.addEventListener("click", function () {
  playSequence();
});

stopSequenceButton.addEventListener("click", function () {
  stopSequence();
  setHelpText("Sequence stopped.");
});

loadDemoButton.addEventListener("click", function () {
  sequenceInput.value = demoSequence;
  setHelpText("Demo loaded. Press Play Sequence to hear it.");
});

tempoSlider.addEventListener("input", function () {
  tempoValue.textContent = tempoSlider.value + " BPM";
});

function playDrum(key) {
  var config = drumConfig[key];

  if (!config) {
    return;
  }

  var sound = audioCache[key].cloneNode();
  sound.play();
  buttonAnimation(key);
}

function buttonAnimation(key) {
  var activeButton = document.querySelector('.drum[data-key="' + key + '"]');

  if (!activeButton) {
    return;
  }

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 120);
}

function playSequence() {
  var steps = parseSequence(sequenceInput.value);

  if (!steps.length) {
    setHelpText("Type a sequence first. Try: " + demoSequence, true);
    return;
  }

  stopSequence();

  var interval = 60000 / Number(tempoSlider.value);

  steps.forEach(function (step, index) {
    var timeoutId = window.setTimeout(function () {
      playDrum(step);
    }, interval * index);

    activeSequenceTimeouts.push(timeoutId);
  });
}

function stopSequence() {
  activeSequenceTimeouts.forEach(function (timeoutId) {
    clearTimeout(timeoutId);
  });

  activeSequenceTimeouts = [];
}

function parseSequence(sequenceText) {
  var trimmedSequence = sequenceText.trim().toLowerCase();

  if (!trimmedSequence) {
    return [];
  }

  var normalizedSteps = trimmedSequence.match(/[a-z]/g) || [];
  var invalidSteps = normalizedSteps.filter(function (step) {
    return !drumConfig[step];
  });

  if (invalidSteps.length) {
    setHelpText(
      "Unknown instrument key: " + invalidSteps[0].toUpperCase() + ". Use only H, S, K, C, T, M, or F.",
      true
    );
    return [];
  }

  if (!normalizedSteps.length) {
    setHelpText("Use letters like K H S H or KHSHKHSC to build a beat.", true);
    return [];
  }

  return normalizedSteps;
}

function setHelpText(message, isError) {
  sequenceHelp.textContent = message;
  sequenceHelp.classList.toggle("error", Boolean(isError));
}
