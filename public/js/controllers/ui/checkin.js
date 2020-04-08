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

    if (!eventId || !attendeeAddress || !ticketsToCheckin || !ticketId)
        return LogShow("", "Please fill in the required fields");

    CheckinAttendee(eventId, attendeeAddress, ticketsToCheckin, personalId, ticketId, CheckinCallback);
}

function CheckinCallback(data) {
    LogShow(data, 'Checkin Succesful!');
    OnGetAttendeeTickets();
}

function OnLogin() {
    if (!EventId())
        return M.toast({ html: "Please fill in the required fields" });

    GetEventById(EventId(), LoginCallback);
}

function LoginCallback(data) {
    if (data[EventId()].value != $("#producerAddress")[0].value)
        return LogShow(data, "Login credentials don't match the event id");

    var producerAddress = document.getElementById("producerAddress").value;
    var producerSeed = document.getElementById("producerSeed").value;
    SetLoginCheckin(producerAddress, producerSeed);

    document.getElementById("producerSeed").value = "";
    document.getElementById("producerAddress").value = "";

    LogShow(data, 'Login Successful');
}

function OnEndCheckin() {
    ClearLoginCheckin();

    M.toast({ html: 'Login credentials have been cleared.' });
}