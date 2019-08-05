// var config = {
//     apiKey: "AIzaSyC1zUvc5K6NJXFxwm74405gegKYfPSNT-4",
//     authDomain: "train-schedule-db.firebaseapp.com",
//     databaseURL: "https://train-schedule-db.firebaseio.com",
//     projectId: "train-schedule-db",
//     storageBucket: "train-schedule-db.appspot.com",
//     messagingSenderId: "60174437847"
// };

firebase.initializeApp(config);

var database = firebase.database();

$(".submitInput").on("click", function (event) {
    console.log("this works");

    var nameInput = $("#nameInput").val().trim();

    var numberInput = $("#numberInput").val().trim();

    var destinationInput = $("#destInput").val().trim();

    var timeInput = $("#timeInput").val().trim();

    var frequencyInput = $("#freqInput").val().trim();

    if (nameInput != "" &&
        numberInput != "" &&
        destinationInput != "" &&
        timeInput.length === 4 &&
        frequencyInput != "") {

        //send above data to firebase
        database.ref().push({
            name: nameInput,
            number: numberInput,
            destination: destinationInput,
            time: timeInput,
            frequency: frequencyInput,
        });

    } else {
        alert("Please enter valid train data");
        $("input").val("");
        return false;
    }

    //console.log(database);

    $("input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    // console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var number = childSnapshot.val().number;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var frequency = parseInt(frequency);
    var currentTime = moment();
    console.log("Current time: " + moment().format("HHmm"));