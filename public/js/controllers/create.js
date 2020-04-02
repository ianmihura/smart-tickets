// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners
$(document).ready(function(){
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: "dd mmm, yyyy"
    });
    
    M.Timepicker.init(document.querySelectorAll('.timepicker'));
});

function OnCreateEvent() {
    var title = document.getElementById("nameOfEvent").value;
    var description = document.getElementById("description").value;
    var date = new Date(document.getElementById("date").value 
        + " " + document.getElementById("time").value).getTime();
    var location = document.getElementById("location").value;
    var requiresId = document.getElementById("requiresId").checked;
    
    CreateEvent(title, {
		title: title,
		date: date,
        description: description,
        location: location
    }, date, requiresId, CreateEventCallback);
}

function CreateEventCallback(data) {
    console.log(data);
    GetCreatedTransactionStateById(data.id);
    
    // create tickets for the event
}

function GetCreatedTransactionStateById(txid) {
    GetTxStateById(txid, CreatedTransactionStateByIdCallback);
}

function CreatedTransactionStateByIdCallback(data) {
	console.log(data);
    document.getElementById("newEvent").innerHTML = data.data[0].key;
}