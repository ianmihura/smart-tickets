// Client-side Javascript
// DOM elements manipulation & event listeners

function OnRefund() {
    var ticketOrder = document.getElementById("ticketId").value;
    var amount = document.getElementById("amount").value;
    var personalId = document.getElementById("personalId").value;

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

    if (!ticketId)
        LogShow("", "The ticket Id you selected is not valid");
    else
        RefundTicket(_eventId, amount, personalId, ticketId, OnRefundCallback);
}

function OnRefundCallback(data) {
    LogShow(data, "Refund Successful");
    OnGetAttendeeTickets();
}