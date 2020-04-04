var eventId = "";
var requiresId = "";
var ticketPrices = [];

function OnGetEventData() {
    eventId = document.getElementById("eventId").value;

    GetEventDataService(eventId, GetEventDataCallback);
    GetEventTicketsService(eventId, GetEventTicketsCallback);
    GetEventCanceledService(eventId, GetCanceledCallback);
}

function GetEventDataCallback(data) {
    if (!data) {
        document.getElementById("eventDetails").innerHTML = "Event does not exist";
        return;
    }

    data = JSON.parse(data.value);
    requiresId = data.requiresId ? "Please bring your personal ID to the event" : "Event does not require personal ID";

    document.getElementById("eventDetails").innerHTML = data.title + "<br>"
        + data.description + "<br>"
        + data.location + "<br>"
        + new Date(data.date) + "<br>"
        + requiresId + "<br>";
}

function GetEventTicketsCallback(tickets) {
    var totalTickets = tickets["tickets_" + eventId].value;
    $("#tickets").empty();
    $("#tickets").append('<li class="collection-header"><b>(Ticket ID)</b> => Ticket details</li>');

    for (var i = 0; i < totalTickets; i++) {
        ticketPrices[i] = tickets["ticketPrice_" + i + "_" + eventId].value;

        $("#tickets").append('<li class="collection - item">'
            + "<b>(" + i + ")</b> => "
            + tickets["ticketDescription_" + i + "_" + eventId].value + "; "
            + ticketPrices[i] + " Waves; "
            + tickets["ticketAmount_" + i + "_" + eventId].value + " available tickets; "
            + tickets["ticketMax_" + i + "_" + eventId].value + " max tickets per attendee"
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