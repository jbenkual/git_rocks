var appData;
var maxTime;
var curTime;
var intervalTracker;
var paused = true;
var currentStep = 0;

function nextTask () {
    console.log(appData);
    console.log(appData.data.length)
    console.log(appData.data[currentStep])
    if (currentStep < appData.data.length) {
        $('#task').html(appData.data[currentStep].instructions);
    }
    else {
        window.clearInterval(intervalTracker);
    }
    currentStep++;
}

function setTimer () {
    intervalTracker = window.setInterval(nextTask, 1000);

}

function getjson (input) {
    var request = new XMLHttpRequest();
    console.log(input);
    request.open('GET', input, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var temp = JSON.parse(request.responseText);
            console.log(temp);
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

curTime = maxTime;
$('#time').html(60);

$('#start').click(function () {
    if (!paused) {
        $(this).html('Start');
        paused = true;
    }
    else {
        $(this).html('Pause');
        paused = false;
        if (currentStep === 0) {
            currentStep++;
            nextTask();
        }
    }
});
