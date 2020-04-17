// Client-side Javascript
// Event object controller

var eventId = "";
var requiresId;
var ticketPrices = [];
var ticketDescriptions = [];

function EventId() {
    if (this.eventId) return this.eventId.replace(/\s/g, '');
    else if (getElementById("eventId").value) return getElementById("eventId").value.replace(/\s/g, '');
    else return "";
}

function OnGetEventData() {
    eventId = getElementById("eventId").value;
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

    getElementById("eventDetails").innerHTML = data.title + "<br>"
        + data.description + "<br>"
        + data.location + "<br>"
        + new Date(data.date) + "<br>"
        + requiresIdText + "<br>";

    try {
        GetEventDataEditCallback(data);
    } catch (err) {
        console.log("Only shoots Data Edit Callback when we're on Edit page");
    }
}

function GetEventTicketsCallback(tickets) {
    var totalTickets = tickets["tickets_" + EventId()].value;
    $("#tickets").empty();
    $("#tickets").append('<p class="collection-item grey darken-4"><b>(Ticket ID)</b> => Ticket details</li>');

    for (var i = 0; i < totalTickets; i++) {
        ticketDescriptions[i] = tickets["ticketDescription_" + i + "_" + EventId()].value;
        ticketPrices[i] = tickets["ticketPrice_" + i + "_" + EventId()].value;

        $("#tickets").append('<a href="javascript:OnClickTicketId(' + i + ')" class="collection-item white-text grey darken-4">'
            + "<b>(" + i + ")</b><br> "
            + ticketDescriptions[i] + "<br> "
            + ticketPrices[i] + " Waves<br> "
            + tickets["ticketAmount_" + i + "_" + EventId()].value + " available tickets<br> "
            + tickets["ticketMax_" + i + "_" + EventId()].value + " max tickets per attendee"
            + '</a>');
    }
}

function OnClickTicketId(ticketId) {
    var elTicketId = getElementById("ticketId");
    if (elTicketId)
        elTicketId.value = ticketId;
    M.updateTextFields();
}

function GetCanceledCallback(data) {
    getElementById("canceled").innerHTML = "";

    if (!data)
        return;

    console.log("canceled event");
    console.log(data);

    getElementById("canceled").innerHTML = data.value ? "Event was canceled" : "Event is OK!";
}