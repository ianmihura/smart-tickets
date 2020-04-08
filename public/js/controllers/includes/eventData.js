// Client-side Javascript
// Event object controller

var eventId = "";
var requiresId;
var ticketPrices = [];

function EventId() {
    if (this.eventId) return this.eventId;
    else if ($("#eventId")[0].value) return $("#eventId")[0].value;
    else return "";
}

function OnGetEventData() {
    eventId = document.getElementById("eventId").value;
    if (!eventId)
        return LogShow("", "Please fill in the required fields");

    GetEventDataService(EventId(), GetEventDataCallback);
    GetEventTicketsService(EventId(), GetEventTicketsCallback);
    GetEventCanceledService(EventId(), GetCanceledCallback);
}

function GetEventDataCallback(data) {
    if (!data.value)
        return LogShow(data, "Event does not exist");

    data = JSON.parse(data.value);
    requiresId = data.requiresId;
    var requiresIdText = data.requiresId ? "Please bring your personal ID to the event" : "Event does not require personal ID";

    document.getElementById("eventDetails").innerHTML = data.title + "<br>"
        + data.description + "<br>"
        + data.location + "<br>"
        + new Date(data.date) + "<br>"
        + requiresIdText + "<br>";

    try {
        GetEventDataEditCallback(data);
    } catch (err) {
        console.log(err);
    }
}

function GetEventTicketsCallback(tickets) {
    var totalTickets = tickets["tickets_" + EventId()].value;
    $("#tickets").empty();
    $("#tickets").append('<li class="collection-item grey darken-4"><b>(Ticket ID)</b> => Ticket details</li>');

    for (var i = 0; i < totalTickets; i++) {
        ticketPrices[i] = tickets["ticketPrice_" + i + "_" + EventId()].value;

        $("#tickets").append('<li class="collection-item grey darken-4">'
            + "<b>(" + i + ")</b><br> "
            + tickets["ticketDescription_" + i + "_" + EventId()].value + "<br> "
            + ticketPrices[i] + " Waves<br> "
            + tickets["ticketAmount_" + i + "_" + EventId()].value + " available tickets<br> "
            + tickets["ticketMax_" + i + "_" + EventId()].value + " max tickets per attendee"
            + '</li>');
    }
}

function GetCanceledCallback(data) {
    document.getElementById("canceled").innerHTML = "";

    if (!data)
        return;

    console.log("canceled event");
    console.log(data);

    document.getElementById("canceled").innerHTML = data.value ? "Event was canceled" : "Event is OK!";
}