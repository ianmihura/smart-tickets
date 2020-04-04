// Client-side Javascript
// DOM elements manipulation & event listeners

attendeeTickets = {};
attendeeEvents = {};

function OnGetAttendeeTickets() {
    var address = document.getElementById("address").value;
    var personalId = document.getElementById("personalId").value;
    personalId = personalId == "" ? "null" : personalId;

    GetAttendeeService(address, personalId, AttendeeTicketsCallback);
}

function AttendeeTicketsCallback(totalTickets) {
    attendeeTickets = totalTickets;

    var _attendeeEvents = Object.keys(totalTickets);

    for (var key in _attendeeEvents) {
        var keySplit = _attendeeEvents[key].split("_");
        var eventId = "e_" + keySplit[4];

        GetEventTicketDescriptionService(eventId, keySplit[2], GetEventTicketDescriptionCallback);
        attendeeEvents[eventId] = true;
    }

    for (var eventId in attendeeEvents)
        GetEventDataService(eventId, GetAttendeeEventsCallback);
}

// Ticket
function GetEventTicketDescriptionCallback(data) {
    for (var key in attendeeTickets) {
        var originalKey = key.split("_")[2] + key.split("_")[4];
        var dataKey = data.key.split("_")[1] + data.key.split("_")[3];

        if (originalKey == dataKey)
            attendeeTickets[key].ticketDescription = data.value;
    }
    PopulateAttendeeTickets();
}

// Event
function GetAttendeeEventsCallback(data) {
    for (var key in attendeeTickets) {
        var originalKey = key.split("_")[4];
        var dataKey = data.key.split("_")[2];

        if (originalKey == dataKey)
            attendeeTickets[key].title = JSON.parse(data.value).title;
    }
    PopulateAttendeeTickets();
}

function PopulateAttendeeTickets() {
    $("#attendeeTickets").empty();
    $("#attendeeTickets").append('<li class="collection-header"><b>(Ticket ID)</b> => Ticket details <br> Event ID</li>');

    var i = 0;
    for (var ticketId in attendeeTickets) {
        $("#attendeeTickets").append('<li class="collection - item">'
            + "<b>(" + i + ")</b> => "
            + attendeeTickets[ticketId].title + "; "
            + attendeeTickets[ticketId].ticketDescription + "; "
            + attendeeTickets[ticketId].value + "; "
            + "Event ID: e_" + ticketId.split("_")[4]
            + '</li>');
        i++;
    }
}

function OnRefund() {
    var eventId = document.getElementById("eventId").value;
    var ticketOrder = document.getElementById("ticketId").value;
    var amount = document.getElementById("amount").value;
    var personalId = document.getElementById("personalId").value;

    var ticketId;
    var i = 0;
    for (var ticket in attendeeTickets) {
        if (i == ticketOrder) {
            ticketId = ticket.split("_")[2];
            eventId = eventId ? eventId : "e_" + ticket.split("_")[4];
            break;
        }

        i++;
    }

    RefundTicket(eventId, amount, personalId, ticketId, OnRefundCallback);
}

function OnRefundCallback(data) {
    OnGetAttendeeTickets();
    document.getElementById("result").innerHTML = "Succesfully refunded your tickets";
}