// Client-side Javascript
// DOM elements manipulation & event listeners

function OnRefund() {
    var ticketOrder = getElementById("ticketId").value;
    var amount = getElementById("amount").value;
    var personalId = getElementById("personalId").value;

    var _eventId = EventId();
    var ticketId;
    var i = 0;
    for (var ticket in attendeeTickets) {
        if (i == ticketOrder) {
            ticketId = ticket.split("_")[2];
            _eventId = _eventId ? _eventId : "e_" + ticket.split("_")[4];
            break;
        }

        i++;
    }

    var isNotValid = _validate(_eventId, amount, personalId, ticketId);
    if (isNotValid)
        LogShow("", isNotValid);
    else
        RefundTicket(_eventId, amount, personalId, ticketId, OnRefundCallback);
}

function _validate(_eventId, amount, personalId, ticketId) {
    if (!_eventId || !amount || !ticketId)
        return "Please fill in the required fields";
    else if (!ticketId)
        return "The ticket Id you selected is not valid";
    else
        return false;
}

function OnRefundCallback(data) {
    LogShow(data, "Refund Successful");
    OnGetAttendeeTickets();
}