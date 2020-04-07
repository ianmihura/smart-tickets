// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

function OnEditAvailableTickets() {
    var ticketId = document.getElementById("ticketId").value;
    var newAmount = document.getElementById("newAmount").value;

    EditAvailableTickets(EventId(), ticketId, newAmount, EditTicketsCallback);
}

function EditTicketsCallback(data) {
    LogShow(data, "Tickets edited successfully");

    OnGetAttendeeTickets();
}

function OnCancelEvent() {
    CancelEvent(EventId(), CancelEventCallback);
}

function CancelEventCallback(data) {
    LogShow(data, "Event was canceled");
}

function OnShowFunds() {
    WavesKeeperAuth("Show the event balance", _onShowFunds);
}

function _onShowFunds(data) {
    GetEventBalanceService(EventId(), data.address, OnShowFundsCallback);
}

function OnShowFundsCallback(data) {
    if (!data.value)
        return LogShow(data, "Only the creator of the event can view the funds");

    LogShow(data, "Data retrieved succesfully");

    document.getElementById("funds").innerHTML = "The balance for this event is<br>" + data.value + " WAVES";
}

function OnWithdrawFunds() {
    WithdrawFunds(EventId(), WithdrawFundsCallback);
}

function WithdrawFundsCallback(data) {
    if (!data.id)
        return LogShow(data, "There was an error with the withdrawal");

    LogShow(data, "Withdrawal Successful");
}