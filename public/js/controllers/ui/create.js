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

    if (!title || !description || !date || !location)
        return LogShow("", "Please fill in the required fields");

    CreateEvent(title, {
        title: title,
        date: date,
        description: description,
        location: location,
        requiresId: requiresId
    }, date, requiresId, CreateEventCallback);
}

function CreateEventCallback(data) {
    var txid = data.id;
    document.getElementById("txid").innerHTML = txid;

    LogShow(data, "Event created succesfully");

    GetTxStateById(txid, GetTxStateByIdCallback);
}

function OnGetEventId() {
    GetTxStateById($("#txid")[0].innerHTML, GetTxStateByIdCallback);
}

function GetTxStateByIdCallback(data) {
    document.getElementById("tEventId").innerHTML = data.data[0].key;
    document.getElementById("eventId").value = data.data[0].key;

    this.OnGetEventData();
}

function OnCreateTicketEvent() {
    var eventId = EventId();
    var ticketDescription = document.getElementById("ticketDescription").value;
    var price = document.getElementById("price").value;
    var ticketAmount = document.getElementById("ticketAmount").value;
    var ticketMax = document.getElementById("ticketMax").value;

    CreateEventTicket(eventId, price, ticketDescription, ticketAmount, ticketMax, CreateTicketEventCallback);
}

function CreateTicketEventCallback(data) {
    LogShow(data, 'Ticket Created Successfully!');
    OnGetEventData();
}