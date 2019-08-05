$(document).ready(function () {

	    var firebaseConfig = {
			apiKey: "AIzaSyDJaT4u-6CU0K9p4uGZgIK1lwXCaajrdSE",
			authDomain: "train-times-c56c6.firebaseapp.com",
			databaseURL: "https://train-times-c56c6.firebaseio.com",
			projectId: "train-times-c56c6",
			storageBucket: "",
			messagingSenderId: "211227622452",
			appId: "1:211227622452:web:87a2fa9b3fc937c4"
		};


		firebase.initializeApp(firebaseConfig);

	    var database = firebase.database();

	$(".submitInput").on("click", function (event) {
		// console.log("this works");

		var nameInput = $("#nameInput").val().trim();

		var numberInput = $("#numberInput").val().trim();

		var destinationInput = $("#destInput").val().trim();

		var timeInput = $("#timeInput").val().trim();

		var frequencyInput = $("#freqInput").val().trim();


		if (nameInput = "" &&
			numberInput == "" &&
			destinationInput == "" &&
			timeInput.length === 4 &&
			frequencyInput == "") {


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
		console.log(name, number, destination, time, frequency);

		var frequency = parseInt(frequency);
		var currentTime = moment();
		console.log(currentTime + moment().format("HHmm"));

		var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");
		//console.log("DATE CONVERTED: " + dateConvert);

		var trainTime = moment(dateConvert).format("HHmm");
		//console.log("Train time : " + trainTime);

		var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
		var timeDifference = moment().diff(moment(timeConvert), "minutes");
		//console.log("Difference in time: " + timeDifference);

		var timeRemaining = timeDifference % frequency;
		//console.log("Time remaining: " + timeRemaining);

		var timeAway = frequency - timeRemaining;
		//console.log("Minutes until next train: " + timeAway);

		var nextArrival = moment().add(timeAway, "minutes");
		//console.log("Arrival time: " + moment(nextArrival).format("HHmm"));

		var arrivalDisplay = moment(nextArrival).format("HHmm");


		$("#boardText").append(
			"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
			"<td id='numberDisplay'>" + childSnapshot.val().number +
			"<td id='destinationDisplay'>" + childSnapshot.val().destination +
			"<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
			"<td id='arrivalDisplay'>" + arrivalDisplay +
			"<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");
		// console.log(arrivalDisplay);
		// console.log(timeAway);
	});


	$(".resetInput").on("click", function (event) {
		location.reload();
	});


	setInterval("window.location.reload()", 60000);
});