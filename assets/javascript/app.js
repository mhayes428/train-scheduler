var Config = {
    apiKey: "AIzaSyB9MjSaJ946dGXCU3jMjtMhdg2eutaXDlk",
    authDomain: "train-times-bf1c2.firebaseapp.com",
    databaseURL: "https://train-times-bf1c2.firebaseio.com",
    projectId: "train-times-bf1c2",
    storageBucket: "",
    messagingSenderId: "971921388884",
    appId: "1:971921388884:web:45c3bf156ec6d31a"
  };

firebase.initializeApp(Config);

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

        //use the collected input (above) and port it to firebase db
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
    console.log(database);

    $("input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var number = childSnapshot.val().number;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;
    console.log(name, number, destination, time, frequency);

    var frequency = parseInt(frequency);
    var currentTime = moment();
    console.log(currentTime + moment().format("HHmm"));

    var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");
    console.log("DATE CONVERTED: " + dateConvert);

    var trainTime = moment(dateConvert).format("HHmm");
    console.log("Train time : " + trainTime);

    var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
    var timeDifference = moment().diff(moment(timeConvert), "minutes");
    console.log("Difference in time: " + timeDifference);

    var timeRemaining = timeDifference % frequency;
    console.log("Time remaining: " + timeRemaining);

    var timeAway = frequency - timeRemaining;
    console.log("Minutes until next train: " + timeAway);
    
    var nextArrival = moment().add(timeAway, "minutes");
    var arrivalDisplay = moment(nextArrival).format("HHmm");

    //append data to table
    $("#boardText").append(
        "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
        "<td id='numberDisplay'>" + childSnapshot.val().number +
        "<td id='destinationDisplay'>" + childSnapshot.val().destination +
        "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
        "<td id='arrivalDisplay'>" + arrivalDisplay +
        "<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");
    console.log(arrivalDisplay);
    console.log(timeAway);
});


$(".resetInput").on("click", function (event) {
    location.reload();
});


setInterval("window.location.reload()", 60000);