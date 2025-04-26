function meetingSomeone() {

	var ticks = document.querySelectorAll (".tick");
	var rafa = document.getElementById('easterNope');

	for (var i = 0; i < ticks.length; ++i) {
		var tick = ticks[i];
		popout = function() {
			rafa.className = 'popout';
		}
		tick.onclick = function() {
			rafa.className = 'popin';
			console.log('If you can make this happen though, or if you are this person, lets TALK ON TWITTER;');
			setTimeout(popout, 3000);
		}
	}
}

meetingSomeone();

var mySwiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
	}
})

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	m = checkTime(m);
	h = h % 12;
	document.getElementById('clock').innerHTML =
	h + ":" + m;
	var t = setTimeout(startTime, 500);
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};	// add zero in front of numbers < 10
	return i;
}

startTime()

function playSound(id) {
	var sound = document.getElementById(id),
	toolbarColor = "rgb(184, 1, 1)";
	sound.play();
	
	if (id == "audio-airhorn") {
		toolbarColor = "rgb(184, 1, 1)"; 
	} else if (id == "audio-rimshot") {
		toolbarColor = "rgb(161, 0, 253)"; 
	} else if (id == "audio-inception") {
		toolbarColor = "rgb(0, 137, 245)"; 
	} else if (id == "audio-tada") {
		toolbarColor = "rgb(167, 252, 3)"; 
	} else if (id == "audio-trombone") {
		toolbarColor = "rgb(245, 167, 0)"; 
	} else if (id == "audio-bell") {
		toolbarColor = "rgb(245, 114, 0)"; 
	} else if (id == "audio-crickets") {
		toolbarColor = "rgb(128, 198, 0)"; 
	} else if (id == "audio-rangers") {
		toolbarColor = "rgb(215, 1, 187)"; 
	}
	
	startColorFade(60, 4, toolbarColor, currentThemeColor);
}

function playSound_Webshooter() {
	var soundFiles = document.getElementsByClassName('webshooter');
	const index = getRandomInt(soundFiles.length)

	soundFiles[index].play();
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function presentHelp() {
	document.getElementById("WKMainView").style.transform = "translateX(-184px)";
}

function presentAbout() {
	document.getElementById("WKMainView").style.transform = "translateX(-184px)";
	document.getElementById("WKHelpView").style.zIndex = "2";
	document.getElementById("WKAboutView").style.zIndex = "3";
}

function backToMain() {
	document.getElementById("WKMainView").style.transform = "translateX(0px)";
	document.getElementById("WKHelpView").style.zIndex = "3";
	document.getElementById("WKAboutView").style.zIndex = "2";
}

var video = document.getElementById('demo-video');

function toggleMute(){
	video.muted = !video.muted;

	if (video.muted) {
		document.getElementById("mute-switch-button").classList.remove("mute-switch-on");
		document.getElementById("mute-switch-button").classList.add("mute-switch-off");
	} else {
		document.getElementById("mute-switch-button").classList.remove("mute-switch-off");
		document.getElementById("mute-switch-button").classList.add("mute-switch-on");
	}
}

// Dynamically change theme-color on scroll
// It's looking for a "data-theme-color" attribute in the HTML to define it as a section
var theme = document.querySelector('meta[name="theme-color"]'),
sections = document.querySelectorAll("[data-theme-color]"),
currentThemeColor = "rgb(255,255,255)";

const options = {
	// These values make the intersecting area just the top part of the viewport
	// I only want to change the theme-color when a section hits the top
	// Given the unreliable nature of my stupid page layout, with the waves and such, it's not a straight forward approach and requires some manual tweaking until it "feels" right
	threshold: 0.1,
	rootMargin: "10% 0px -90% 0px"
};

// Creates an Observer for all the sections and triggers the color change when it intersects
const observer = new IntersectionObserver(function(entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
 		var color = entry.target.getAttribute('data-theme-color');
 		startColorFade(60, 0.3, currentThemeColor, color);
		}
	});
}, options);

// Fire the observers up and let them go wild
sections.forEach(section => {
	observer.observe(section);
})

// Here's the code to transition/animate the color change — it's a lot.
// TL;DR, we have to calculate each "frame" and update the <meta> tag as you go.
// This was remixed from a Stack Overflow answer by the user "ffdigital"
// https://stackoverflow.com/a/38381724/4746353

function startColorFade(fps, duration, currentColor, targetColor) {
	var stop = false;
	var fpsInterval = 1000 / fps;
	var now;
	var then = Date.now();
	var elapsed;
	var startTime = then;
	var currentColorArray = getElementBG(currentColor);
	var targetColorArray	= getElementBG(targetColor);
	var distance = calculateDistance(currentColorArray, targetColorArray);
	var increment = calculateIncrement(distance, fps, duration);
	animateColor(duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime);
}

function animateColor( duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime ) {
	var step = function() {
		if (stop) {
			return;
		}
		// Request another frame
		requestAnimationFrame(function() { //arguments can passed on the callback by an anonymous function
			animateColor(duration, currentColorArray, targetColorArray, increment, stop, fpsInterval, now, then, elapsed, startTime);
			colorTransition( currentColorArray, targetColorArray, increment);
		});

		// Calculate the elapsed time since last loop
		now = Date.now();
		elapsed = now - then;

    // If enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
      // Get ready for next frame by setting then=now, but...
      // Also, adjust for fpsInterval not being multiple of 16.67
      then = now - (elapsed % fpsInterval);
      var sinceStart = now - startTime;
    }

    if (sinceStart / 1000 * 100 >= duration * 100) {
      stop = true;
      // Update the currentThemeColor for the next transition
      currentThemeColor = "rgb(" + currentColorArray + ")";
    }
	}
	
  step();
}

function colorTransition(currentColorArray, targetColorArray, increment) {
	
  // Checking R (from RGB)
	if (currentColorArray[0] > targetColorArray[0]) {
    currentColorArray[0] -= increment[0];
    
    if (currentColorArray[0] <= targetColorArray[0]) {
      increment[0] = 0;
		}
	} else {
		currentColorArray[0] += increment[0];
		
    if (currentColorArray[0] >= targetColorArray[0]) {
			increment[0] = 0;
		}
	}
	
  // Checking G (from RGB)
	if (currentColorArray[1] > targetColorArray[1]) {
    currentColorArray[1] -= increment[1];

		if (currentColorArray[1] <= targetColorArray[1]) {
			increment[1] = 0;
		}
	} else {
		currentColorArray[1] += increment[1];

    if (currentColorArray[1] >= targetColorArray[1]) {
			increment[1] = 0;
		}
	}

	// Checking B (from RGB)
	if (currentColorArray[2] > targetColorArray[2]) {
		currentColorArray[2] -= increment[2];
	
  	if (currentColorArray[2] <= targetColorArray[2]) {
			increment[2] = 0;
		}
	} else {
		currentColorArray[2] += increment[2];
	
		if (currentColorArray[2] >= targetColorArray[2]) {
			increment[2] = 0;
		}
	}
	
  // Apply the new modified color
	theme.setAttribute("content", "rgb(" + currentColorArray + ")");

}

function getElementBG(elmBGColor) {
  var bg	= elmBGColor; // i.e: RGB(255, 0, 0)
			bg	= bg.match(/\((.*)\)/)[1];
			bg	= bg.split(",");
	
  for (var i = 0; i < bg.length; i++) {
		bg[i] = parseInt(bg[i], 10);
	}
	
  if (bg.length > 3) { bg.pop(); }
	
  return bg; // return array
}

function calculateDistance(colorArray1, colorArray2) {
	var distance = [];
	
  for (var i = 0; i < colorArray1.length; i++) {
		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	}
	
  return distance;
}

function calculateIncrement(distanceArray, fps, duration) {
	var increment = [];
	for (var i = 0; i < distanceArray.length; i++) {
		increment.push(Math.abs(Math.floor(distanceArray[i] / (fps * duration))));

		if (increment[i] == 0) {
			increment[i]++;
		}
	}
  
	return increment;
}