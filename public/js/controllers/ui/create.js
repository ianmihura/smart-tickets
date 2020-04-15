// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners
$(document).ready(function () {
    M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: "dd mmm, yyyy"
    });

    M.Timepicker.init(document.querySelectorAll('.timepicker'));
});

function OnCreateEvent() {
    var title = getElementById("nameOfEvent").value;
    var description = getElementById("description").value;
    var date = new Date(getElementById("date").value
        + " " + getElementById("time").value).getTime();
    var location = getElementById("location").value;
    var requiresId = getElementById("requiresId").checked;

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
    getElementById("txid").innerHTML = txid;

    LogShow(data, "Event created succesfully");

    setTimeout(OnGetEventId, 2000);
}

function OnGetEventId() {
    GetTxStateById(getElementById("txid").innerHTML, GetTxStateByIdCallback);
}

function GetTxStateByIdCallback(data) {
    getElementById("tEventId").innerHTML = data.data[0].key;
    getElementById("eventId").value = data.data[0].key;

    this.OnGetEventData();
}

function OnCreateTicketEvent() {
    var eventId = EventId();
    var ticketDescription = getElementById("ticketDescription").value;
    var price = getElementById("price").value;
    var ticketAmount = getElementById("ticketAmount").value;
    var ticketMax = getElementById("ticketMax").value;

    CreateEventTicket(eventId, price, ticketDescription, ticketAmount, ticketMax, CreateTicketEventCallback);
}

function CreateTicketEventCallback(data) {
    LogShow(data, 'Ticket Created Successfully!');
    setTimeout(OnGetEventData, 2000);
}