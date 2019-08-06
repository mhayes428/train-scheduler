$(document).ready(function () {

	var firebaseConfig = {
		apiKey: "AIzaSyDJaT4u-6CU0K9p4uGZgIK1lwXCaajrdSE",
		authDomain: "train-times-c56c6.firebaseapp.com",
		databaseURL: "https://train-times-c56c6.firebaseio.com",
		projectId: "train-times-c56c6",
		storageBucket: "",
		messagingSenderId: "211227622452",
		appId: "1:211227622452:web:c8b9bd83d9e372d4"
	  };
	  
	  firebase.initializeApp(firebaseConfig);

	  var database = firebase.database
	  currentTime = moment().format();
	
	$(".submitInput").on("click", function (event) {
		console.log("this works");

		nameInput = $("#nameInput").val().trim();

		numberInput = $("#numberInput").val().trim();

		destinationInput = $("#destInput").val().trim();

		timeInput = $("#timeInput").val().trim();

		frequencyInput = $("#freqInput").val().trim();



		if (nameInput != "" &&
			numberInput != "" &&
			destinationInput != "" &&
			timeInput.length === 4 &&
			frequencyInput != "") {


			data.ref().push({
				name: nameInput,
				number: numberInput,
				destination: destinationInput,
				time: timeInput,
				frequency: frequencyInput,
			});

		} else {
			alert("Please enter valid train data!");
			$("input").val("");
			return false;
		}
		console.log(database);

		$("input").val("");

	});


	data.ref().on("child_added", function (childSnapshot) {
		// console.log(childSnapshot.val());
		
		

		 var tName = childSnapshot.val().tName;
		 var tNumber = childSnapshot.val().tNumber;
		 var destination = childSnapshot.val().destination;
		 var tTime = childSnapshot.val().tTime;
		
		 var frequency = childSnapshot.val().frequency;
		 var frequency = parseInt(frequency);
		
		 var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");
			//console.log(dateConvert.format("MM/DD/YYYY"));
		 var trainTime = moment(dateConvert).format("HHmm");
		 var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
		 var timeDifference = moment().diff(moment(timeConvert), "minutes");
		 var timeRemaining = timeDifference % frequency;
		 var timeAway = frequency - timeRemaining;
		 var nextArrival = moment().add(timeAway, "minutes");
		 var arrivalDisplay = moment(nextArrival).format("HHmm");


		$("#boardText").append(
			"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
			"<td id='numberDisplay'>" + childSnapshot.val().number +
			"<td id='destinationDisplay'>" + childSnapshot.val().destination +
			"<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
			"<td id='arrivalDisplay'>" + arrivalDisplay +
			"<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");
	});


	$(".resetInput").on("click", function (event) {
		location.reload();
	});


	setInterval("window.location.reload()", 60000);
});