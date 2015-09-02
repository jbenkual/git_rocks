var appData;
var maxTime;
var curTime;
var intervalTracker;
var paused = true;
var currentStep = 0;

function gbid(input) {
    return document.getElementById(input);
}

function nextTask () {
    if (currentStep < appData.data.length) {
        $('#task').text(appData.data[currentStep].instructions);
        maxTime = appData.data[currentStep].seconds;
        curTime = maxTime;
        gbid('time').textContent = (curTime.toString());
    }
    else {
        $('#task').text("Time is up!");
        window.clearInterval(intervalTracker);
    }
    currentStep++;
}

function setTimer () {
    intervalTracker = window.setInterval(updateTimer, 1000);
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

$('#start').click(function () {
    if (!paused) {
        $(this).html('Start');
        paused = true;
        clearInterval(intervalTracker);
    }
    else {
        $(this).html('Pause');
        paused = false;
        if (currentStep === 0) {
            currentStep++;
            nextTask();
        }
        setTimer();
    }
});
