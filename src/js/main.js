var appData;
var maxTime;
var curTime = 0;
var totTime = 0;
var totMaxTime = 0;
var intervalTracker;
var paused = true;
var currentStep = 0;

function gbid(input) {
    return document.getElementById(input);
}

function nextTask () {
    if (currentStep < appData.data.length) {
        gbid('task').textContent = appData.data[currentStep].instructions;
        maxTime = appData.data[currentStep].seconds;
        totMaxTime += maxTime;
        totTime += maxTime - curTime;
        curTime = maxTime;
        gbid('time').textContent = (curTime.toString());
        
        var color = randomColor();
        var inverted = invertColor(color);
        document.body.style.backgroundColor =  color;
        document.body.style.color = inverted;
    }
    else {
        startButton();
        gbid('task').textContent = ("You finished using " + Math.floor((totTime/totMaxTime) * 100) + "% of the time");
        gbid('next').style.visibility = "hidden";
        gbid('time').style.visibility = "hidden";
        window.clearInterval(intervalTracker);
    }
    currentStep++;
}

function setTimer () {
    intervalTracker = window.setInterval(updateTimer, 100);
}


function updateTimer () {
    if(curTime < 1) {
        nextTask();
    }
    curTime--;
    gbid('time').textContent = (curTime.toString());
}
function getjson (input) {
    var request = new XMLHttpRequest();
    request.open('GET', input, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var temp = JSON.parse(request.responseText);
            appData = temp;
            return temp;
        } else {
            // We reached our target server, but it returned an error
            console.log('Error!');
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}

getjson('data2.json');

function startButton () {
    if (!paused) {
        gbid('start').textContent = ('Start');
        paused = true;
        clearInterval(intervalTracker);
    }
    else {
        gbid('start').textContent = ('Pause');
        paused = false;
        if (currentStep === 0) {
            currentStep++;
            nextTask();
        }
        setTimer();
    }
};

function nextButton () {
    nextTask();
}

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;                  // prepend #
    return color;
}

function randomColor() {
    var color = Math.random();
    for(var i = 0; i < 6; i++) {
        color *= 16;
    }
    return "#"+Math.floor(color).toString(16);
}