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
        location: location,
        requiresId: requiresId
    }, date, requiresId, CreateEventCallback);
}

function CreateEventCallback(data) {
    try {
        var txid = JSON.parse(data).id;

        document.getElementById("txid").innerHTML = txid;
        M.toast({ html: 'Event created succesfully' });

        GetTxStateById(txid, GetTxStateByIdCallback);
    } catch (e) {
        console.log(e);
        document.getElementById("txid").innerHTML = "There was an error with the transaction. Here is the result: " + data;
    }
}

function OnGetEventId() {
    GetTxStateById($("#txid")[0].innerHTML, GetTxStateByIdCallback);
}

function GetTxStateByIdCallback(data) {
    try {
        document.getElementById("tEventId").innerHTML = data.data[0].key;
        document.getElementById("eventId").value = data.data[0].key;

        this.OnGetEventData();
    } catch (e) {
        console.log(e);
        document.getElementById("eventId").innerHTML = "There was an error with the eventId retrieval. Here is the result: " + data;;
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
    M.toast({ html: 'Ticket Created Succesfully!' });
    OnGetEventData();
}