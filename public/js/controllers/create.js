// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners
$(document).ready(function () {
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
    try {
        var txid = JSON.parse(data).id;
    } catch (e) {
        console.log(e);
        err(data);
    }

    if (txid) {
        document.getElementById("txid").innerHTML = txid;

        GetTxStateById(txid, GetTxStateByIdCallback);
    } else err(data);

    function err(data) {
        document.getElementById("txid").innerHTML = "There was an error with the transaction. Here is the result: " + data;;
    }
}

function GetTxStateByIdCallback(data) {
    try {
        var HTMLeventId = document.getElementById("eventId");
        HTMLeventId.value = data.data[0].key;
        HTMLeventId.parentElement.children[1].classList.add("active");
        HTMLeventId.setAttribute("disabled");

    } catch (e) {
        console.log(e);

        document.getElementById("eventId").value = "There was an error with the eventId retrieval. Here is the result: " + data;;
    }
}

function OnCreateTicketEvent() {
    var eventId = document.getElementById("eventId").value;
    var ticketDescription = document.getElementById("ticketDescription").value;
    var price = document.getElementById("price").value;
    var ticketAmount = document.getElementById("ticketAmount").value;
    var ticketMax = document.getElementById("ticketMax").value;

    CreateEventTicket(eventId, price, ticketDescription, ticketAmount, ticketMax, CreateTicketEventCallback);
}

function CreateTicketEventCallback(data) {
    console.log(data);

    document.getElementById("ticketList").innerHTML += "<br> "
        + document.getElementById("ticketDescription").value + "; "
        + document.getElementById("price").value + " Waves; "
        + document.getElementById("ticketAmount").value + " available tickets; "
        + document.getElementById("ticketMax").value + " max tickets per attendee";

    document.getElementById("ticketDescription").value = "";
    document.getElementById("price").value = "";
    document.getElementById("ticketAmount").value = "";
    document.getElementById("ticketMax").value = "";
    // show message "create next one if your want"
}