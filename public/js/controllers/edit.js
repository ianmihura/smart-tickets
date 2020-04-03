// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners
var eventId = "";

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
    document.getElementById("eventDetails").innerHTML = data.title + "<br>"
        + data.description + "<br>"
        + data.location + "<br>"
        + new Date(data.date) + "<br>";
}

function GetEventTicketsCallback(tickets) {
    var totalTickets = tickets["tickets_" + eventId].value;
    $("#tickets").empty();

    for (var i = 0; i < totalTickets; i++) {
        $("#tickets").append('<li class="collection - item">'
            + "<b>(" + i + ")</b> => "
            + tickets["ticketDescription_" + i + "_" + eventId].value + "; "
            + tickets["ticketPrice_" + i + "_" + eventId].value + " Waves; "
            + tickets["ticketAmount_" + i + "_" + eventId].value + " available tickets; "
            + tickets["ticketMax_" + i + "_" + eventId].value + " max tickets per attendee"
            + '</li>');
    }
}

function GetCanceledCallback(data) {
    if (!data)
        return;

    document.getElementById("canceled").innerHTML = data.value ? "Event was canceled" : "Event is OK!";
}

function OnEditAvailableTickets() {
    var ticketId = document.getElementById("ticketId").value;
    var newAmount = document.getElementById("newAmount").value;

    EditAvailableTickets(eventId, ticketId, newAmount, CancelEventCallback);
}

function EditTicketsCallback(data) {
    if (data)
        GetEventTicketsService(eventId, GetEventTicketsCallback);
}

function OnCancelEvent() {
    CancelEvent(eventId, CancelEventCallback);
}

function CancelEventCallback(data) {
    document.getElementById("canceled").innerHTML = "Event was canceled";
}

function OnWithdrawFunds() {
    WithdrawFunds(eventId, WithdrawFundsCallback);
}

// TODO show withdraw success and fail
function WithdrawFundsCallback(data) {
    console.log(data);
}