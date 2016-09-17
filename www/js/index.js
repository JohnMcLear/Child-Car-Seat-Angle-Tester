/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var age = window.localStorage.getItem("age");
        if(age){
            ageChange(age);
            $('#welcome').hide();
            $('#instruction').show();
        }else{
            $('#welcome').show();
        }
        getDeviceOrientation();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
    }
};

app.initialize();

$('.ageSelection').click(function(){
    window.localStorage.setItem("age", this.id);
    ageChange(this.id);
    $('#welcome').hide();
    $('#measurement').show();
})

function ageChange(age){
    var plusAge = parseInt(age)+1;
    $('#childsAge').text("Childs Age: "+age+"-"+plusAge);
    if(age == 0){
        app.lowValue = 30;
        app.highValue = 40;
    }
    if(age == 1){
        app.lowValue = 35;
        app.highValue = 45;   
    }
    if(age == 2){
        app.lowValue = 40;
        app.highValue = 50;
    }
    if(age == 3){
        app.lowValue = 45;
        app.highValue = 55;
    }
    if(age == 4){
        app.lowValue = 50;
        app.highValue = 60;
    }
}

// Listens for an orientation change of the device
function getDeviceOrientation(){
    if (window.DeviceOrientationEvent) {
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {
            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = Math.round(eventData.beta);
            checkDeviceOrientation(tiltFB);
        }, false);
    } else {
        // document.getElementById("doEvent").innerHTML = "Not supported."
    }
}

// Checks the orientation of the device against the stored recommended value
function checkDeviceOrientation(tilt){
    $("#angle").text(tilt +"°");

    // Happy days, all is good
    if(tilt >= app.lowValue && tilt <= app.highValue){
        $('#indicator').removeClass("bad");
        $('#indicator').addClass("good");
        $('#suggestion').text("Looks good!")
    }else{
        if(tilt < app.lowValue){
            $('#suggestion').text("Straighten seat more (Child sat more upright)");
        }
        if(tilt > app.highValue){
            $('#suggestion').text("Recline seat more (Child sat less upright)");
        }
        // Bad days, something is wrong..
        $('#indicator').removeClass("good");
        $('#indicator').addClass("bad");
    }
}

$("#instruction > button").on("click", function(){
    $('#instruction').hide();
    $("#measurement").show();
})

$('#childsAge').on("click", function(){
  $('#welcome').show();
  $('#measurement').hide();
});