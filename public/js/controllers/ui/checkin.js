// Client-side Javascript
// DOM elements manipulation & event listeners

function OnCheckin() {
    var ticketsToCheckin = getElementById("ticketsToCheckin").value;
    var attendeeAddress = getElementById("address").value;
    var personalId = getElementById("personalId").value;
    var ticketOrder = getElementById("ticketId").value;

    var eventId;
    var ticketId;
    var i = 0;
    for (var ticket in this.attendeeTickets) {
        if (i == ticketOrder) {
            ticketId = ticket.split("_")[2];
            var eventId = this.eventId ? this.eventId : "e_" + ticket.split("_")[4];
            break;
        }

        i++;
    }

    if (!eventId || !attendeeAddress || !ticketsToCheckin || !ticketId)
        return LogShow("", "Please fill in the required fields");

    CheckinAttendee(eventId, attendeeAddress, ticketsToCheckin, personalId, ticketId, CheckinCallback);
}

function CheckinCallback(data) {
    LogShow(data, 'Checkin Succesful!');
    OnGetAttendeeTickets();
}

function OnCheckinLogout() {
    ClearLoginCredentials();
    M.toast({ html: 'Login credentials have been cleared.' });
}