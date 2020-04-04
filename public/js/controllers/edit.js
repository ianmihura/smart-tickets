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

function OnShowFunds() {
    WavesKeeper.auth({ data: "Show the event balance" })
        .then(data => _onShowFunds(data))
        .catch(err => console.log(err));
}

function _onShowFunds(data) {
    var producerAddress = data.address;
    GetEventBalanceService(this.eventId, producerAddress, OnShowFundsCallback);
}

function OnShowFundsCallback(data) {
    if (data)
        document.getElementById("funds").innerHTML = "The balance for this event is<br>" data.value + " WAVES";
    else
    document.getElementById("funds").innerHTML = "Only the creator of the event can view the funds";

}

function OnWithdrawFunds() {
    WithdrawFunds(this.eventId, WithdrawFundsCallback);
}

function WithdrawFundsCallback(data) {
    document.getElementById("cancel").innerHTML = "Withdrawal succesfull!";
}