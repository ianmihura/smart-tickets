// Client-side Javascript
// Event object controller

var eventId = "";
var requiresId;
var ticketPrices = [];

function OnGetEventData() {
    eventId = document.getElementById("eventId").value;

    GetEventDataService(this.eventId, GetEventDataCallback);
    GetEventTicketsService(this.eventId, GetEventTicketsCallback);
    GetEventCanceledService(this.eventId, GetCanceledCallback);
}

function GetEventDataCallback(data) {
    if (!data) {
        document.getElementById("eventDetails").innerHTML = "Event does not exist";
        return;
    }

    data = JSON.parse(data.value);
    requiresId = data.requiresId;
    var requiresIdText = data.requiresId ? "Please bring your personal ID to the event" : "Event does not require personal ID";

    document.getElementById("eventDetails").innerHTML = data.title + "<br>"
        + data.description + "<br>"
        + data.location + "<br>"
        + new Date(data.date) + "<br>"
        + requiresIdText + "<br>";
}

function GetEventTicketsCallback(tickets) {
    var totalTickets = tickets["tickets_" + this.eventId].value;
    $("#tickets").empty();
    $("#tickets").append('<li class="collection-header"><b>(Ticket ID)</b> => Ticket details</li>');

    for (var i = 0; i < totalTickets; i++) {
        ticketPrices[i] = tickets["ticketPrice_" + i + "_" + this.eventId].value;

        $("#tickets").append('<li class="collection - item">'
            + "<b>(" + i + ")</b> => "
            + tickets["ticketDescription_" + i + "_" + this.eventId].value + "; "
            + ticketPrices[i] + " Waves; "
            + tickets["ticketAmount_" + i + "_" + this.eventId].value + " available tickets; "
            + tickets["ticketMax_" + i + "_" + this.eventId].value + " max tickets per attendee"
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