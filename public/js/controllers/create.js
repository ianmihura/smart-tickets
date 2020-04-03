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
        document.getElementById("eventId").innerHTML = data.data[0].key;
        document.getElementById("tEventId").value = data.data[0].key;
    } catch (e) {
        console.log(e);
        document.getElementById("eventId").innerHTML = "There was an error with the eventId retrieval. Here is the result: " + data;;
    }
}

function OnShowAllTickets() {
    var eventId = document.getElementById("tEventId").value;

    GetEventTicketsService(eventId, ShowTicketsCallback);
}

function ShowTicketsCallback(tickets) {
    var eventId = document.getElementById("tEventId").value;
    var totalTickets = tickets["tickets_" + eventId].value;
    document.getElementById("ticketList").innerHTML = "";

    for (var i = 0; i < totalTickets; i++) {
        _addTicketToHTML(
            tickets["ticketDescription_" + i + "_" + eventId].value,
            tickets["ticketPrice_" + i + "_" + eventId].value,
            tickets["ticketAmount_" + i + "_" + eventId].value,
            tickets["ticketMax_" + i + "_" + eventId].value);
    }
}

function OnCreateTicketEvent() {
    var eventId = document.getElementById("tEventId").value;
    var ticketDescription = document.getElementById("ticketDescription").value;
    var price = document.getElementById("price").value;
    var ticketAmount = document.getElementById("ticketAmount").value;
    var ticketMax = document.getElementById("ticketMax").value;

    CreateEventTicket(eventId, price, ticketDescription, ticketAmount, ticketMax, CreateTicketEventCallback);
}

function CreateTicketEventCallback(data) {
    console.log(data);

    _addTicketToHTML(
        document.getElementById("ticketDescription").value,
        document.getElementById("price").value,
        document.getElementById("ticketAmount").value,
        document.getElementById("ticketMax").value);

    document.getElementById("ticketDescription").value = "";
    document.getElementById("price").value = "";
    document.getElementById("ticketAmount").value = "";
    document.getElementById("ticketMax").value = "";
}

function _addTicketToHTML(ticketDescription, price, ticketAmount, ticketMax) {
    document.getElementById("ticketList").innerHTML += "<br> "
        + ticketDescription + "; "
        + price + " Waves; "
        + ticketAmount + " available tickets; "
        + ticketMax + " max tickets per attendee";
}