// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

function OnEditAvailableTickets() {
    var ticketId = document.getElementById("ticketId").value;
    var newAmount = document.getElementById("newAmount").value;

    EditAvailableTickets(this.eventId, ticketId, newAmount, EditTicketsCallback);
}

function EditTicketsCallback(data) {
    if (data)
        GetEventTicketsService(this.eventId, GetEventTicketsCallback);
}

function OnCancelEvent() {
    CancelEvent(this.eventId, CancelEventCallback);
}

function CancelEventCallback(data) {
    document.getElementById("cancel").innerHTML = "Event was canceled";
}

function OnWithdrawFunds() {
    WithdrawFunds(this.eventId, WithdrawFundsCallback);
}

function WithdrawFundsCallback(data) {
    document.getElementById("cancel").innerHTML = "Withdrawal succesfull!";
}