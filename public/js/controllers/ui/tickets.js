// Client-side Javascript
// DOM elements manipulation & event listeners

function OnRefund() {
    var ticketOrder = getElementById("refundTicketId").value;
    var amount = getElementById("amount").value;
    var personalId = getElementById("personalId").value;

    const { ticketId, _eventId } = _getTicketId(ticketOrder);

    if (!amount || ticketOrder === "")
        return LogShow("", "Please fill in the required fields");
    else if (!ticketId || !_eventId)
        return LogShow("", "The ticket Id you selected is not valid");
    else
        RefundTicket(_eventId, amount, personalId, ticketId, OnRefundCallback);
}

function _getTicketId(ticketOrder) {
    var _eventId = EventId();
    var i = 0;
    for (var attendeeTicketKey in attendeeTickets) {
        if (i == ticketOrder)
            return {
                ticketId: attendeeTicketKey.split("_")[2],
                _eventId: _eventId ? _eventId : "e_" + attendeeTicketKey.split("_")[4]
            };
        else
            i++;
    }
}

function OnRefundCallback(data) {
    LogShow(data, "Refund Successful");
    setTimeout(OnGetAttendeeTickets, 2000);
}

// Checkin
function OnCreateCheckinPass() {
    var ticketOrder = getElementById("ticketId").value;
    var checkinAmount = getElementById("checkinAmount").value;
    const { ticketId, _eventId } = _getTicketId(ticketOrder);

    if (!_eventId || !checkinAmount || !ticketId)
        return LogShow("", "Please fill in the required fields");

    var checkinPassMessage = _eventId + "," + ticketId + "," + checkinAmount;
    WavesKeeperSingService(checkinPassMessage, CreateCheckinPassCallback);
}

function CreateCheckinPassCallback(data) {
    var checkinPass = {
        publicKey: data.publicKey,
        signature: data.signature,
        message: data.message ? data.message : atob(data.binary)
    };
    var stringPass = escape(JSON.stringify(checkinPass));

    OnMakeQrCodeFromText(stringPass);
    M.Modal.getInstance(getElementById("qrModal")).open();
}
