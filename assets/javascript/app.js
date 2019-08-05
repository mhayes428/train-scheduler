var config = {
    apiKey: "AIzaSyC1zUvc5K6NJXFxwm74405gegKYfPSNT-4",
    authDomain: "train-schedule-db.firebaseapp.com",
    databaseURL: "https://train-schedule-db.firebaseio.com",
    projectId: "train-schedule-db",
    storageBucket: "train-schedule-db.appspot.com",
    messagingSenderId: "60174437847"
};
  
firebase.initializeApp(config);

var database = firebase.database();


$(".submitInput").on("click", function (event) {
    // console.log("this works");

        var nameInput = $("#nameInput").val().trim();

        var numberInput = $("#numberInput").val().trim();

        var destinationInput = $("#destInput").val().trim();

        var timeInput = $("#timeInput").val().trim();

        var frequencyInput = $("#freqInput").val().trim();