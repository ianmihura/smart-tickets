// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

function OnEditAvailableTickets() {
    var ticketId = document.getElementById("ticketId").value;
    var newAmount = document.getElementById("newAmount").value;

    EditAvailableTickets(eventId, ticketId, newAmount, EditTicketsCallback);
}

function EditTicketsCallback(data) {
    if (data)
        GetEventTicketsService(eventId, GetEventTicketsCallback);
}

function OnCancelEvent() {
    CancelEvent(eventId, CancelEventCallback);
}

function CancelEventCallback(data) {
    document.getElementById("cancel").innerHTML = "Event was canceled";
}

function OnWithdrawFunds() {
    WithdrawFunds(eventId, WithdrawFundsCallback);
}

function WithdrawFundsCallback(data) {
    document.getElementById("cancel").innerHTML = "Withdrawal succesfull!";
}