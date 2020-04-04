// Client-side Javascript
// DOM elements manipulation & event listeners

function OnCheckin() {
    var ticketsToCheckin = document.getElementById("ticketsToCheckin").value;
    var attendeeAddress = document.getElementById("address").value;
    var personalId = document.getElementById("personalId").value;
    var ticketOrder = document.getElementById("ticketId").value;

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

    CheckinAttendee(eventId, attendeeAddress, ticketsToCheckin, personalId, ticketId, CheckinCallback);
}

function CheckinCallback(data) {
    $("#checkinResult")[0].innerHTML = "Checkin Succesful";

    OnGetAttendeeTickets();
}

function OnLogin() {

}

function OnEndCheckin() {

}