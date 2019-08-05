var firebaseConfig = {
    apiKey: "AIzaSyB9MjSaJ946dGXCU3jMjtMhdg2eutaXDlk",
    authDomain: "train-times-bf1c2.firebaseapp.com",
    databaseURL: "https://train-times-bf1c2.firebaseio.com",
    projectId: "train-times-bf1c2",
    storageBucket: "train-times-bf1c2.appspot.com",
    messagingSenderId: "971921388884",
    appId: "1:971921388884:web:45c3bf156ec6d31a"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


const $tName = $('#name');
const $tDest = $('#destination');
const $tFirstTime = $('#firstTrainTime');
const $tFreq = $('#frequency');
const $submit = $('#formFill');
const $tbody = $('tbody');
let trainObj = {};

// Functions
const getValues = (e) => {
    e.preventDefault();
    
    var firstTimeConverted = moment($tFirstTime.val(), "hh:mm").subtract(1, "years");
    
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    var tRemainder = diffTime % $tFreq.val();
   
    var tMinsTillTrain = $tFreq.val() - tRemainder;
    
    var nextTrain = moment(moment().add(tMinsTillTrain, "minutes")).format("hh:mm");

    
    trainObj.tName = $tName.val();
    trainObj.tDest = $tDest.val();
    trainObj.tFreq = $tFreq.val();
    trainObj.tNextArr = nextTrain;
    trainObj.tMinsAway = tMinsTillTrain;

    
    $tName.val('');
    $tDest.val('');
    $tFirstTime.val('');
    $tFreq.val('');

    
    db.ref().push(trainObj);
}


dbRef.on('child_added', (snapshot) => {
    
    console.log(snapshot.val());
    
    $tbody.append(`
        <tr>
            <td>${snapshot.val().tName}</td>
            <td>${snapshot.val().tDest}</td>
            <td>${snapshot.val().tFreq}</td>
            <td>${snapshot.val().tNextArr}</td>
            <td>${snapshot.val().tMinsAway}</td>
        </tr>`);
})

// Event Listener
$submit.on('click', getValues);