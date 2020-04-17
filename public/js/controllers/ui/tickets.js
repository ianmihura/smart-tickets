// Client-side Javascript
// DOM elements manipulation & event listeners

function OnRefund() {
    var txid = getElementById("refundTxid").value;

    GetTxById(txid, GetRefundTxidCallback);
}

function GetRefundTxidCallback(data) {
    var ticketOrder = getElementById("refundTicketId").value;
    var amount = getElementById("amount").value;
    var personalId = getElementById("personalId").value;

    var timestampPadded = new Date(data.timestamp);
    timestampPadded.setHours(timestampPadded.getHours() + pad);

    const { ticketId, _eventId } = _getTicketId(ticketOrder);

    if (!amount || ticketOrder === "")
        return LogShow("", "Please fill in the required fields");

    if (!ticketId || !_eventId)
        return LogShow("", "The ticket Id you selected is not valid");

    if (new Date().getTime() < timestampPadded)
        return LogShow("Refund time exceeded. You can only refund your tickets ", "Refund time exceeded");

    if (data.call.function != "purchase" || data.call.args[1] != ticketId || data.call.args[2] < amount)
        return LogShow("Wrong txid. Please, use the txid of the 'purchase' transaction", "Wrong txid.");

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
