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
	  var currentTime = moment().format();
	
	$(".submitInput").on("click", function (event) {
		//console.log("this works");

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
