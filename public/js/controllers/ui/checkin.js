// Client-side Javascript
// DOM elements manipulation & event listeners

var eventId = EventId();
var ticketId;

function OnCheckin() {
    var ticketOrder = getElementById("ticketId").value;
    var i = 0;
    for (var ticket in this.attendeeTickets) {
        if (i == ticketOrder) {
            ticketId = ticket.split("_")[2];
            eventId = EventId() ? EventId() : "e_" + ticket.split("_")[4];
            break;
        }

        i++;
    }

    var ticketsToCheckin = getElementById("ticketsToCheckin").value;
    var attendeeAddress = getElementById("address").value;
    if (!eventId || !attendeeAddress || !ticketsToCheckin || !ticketId)
        return LogShow("", "Please fill in the required fields");

    GetEventTrusteeService(eventId, TrusteeKeyCallback);
}

function TrusteeKeyCallback(data) {
    for (var trusteeKey in data) {
        if (data[trusteeKey].value != GetLoginCredentials().address)
            continue;

        var ticketsToCheckin = getElementById("ticketsToCheckin").value;
        var attendeeAddress = getElementById("address").value;
        var personalId = getElementById("personalId").value;

        CheckinAttendee(eventId, attendeeAddress, ticketsToCheckin, personalId, ticketId, trusteeKey.split("_")[1], CheckinCallback);
        break;
    }
}

function CheckinCallback(data) {
    LogShow(data, 'Checkin Succesful!');
    setTimeout(OnGetAttendeeTickets, 2000);
}

function OnCheckinLogout() {
    ClearLoginCredentials();
    LogShow("", 'Login credentials have been cleared.!');
}

// Checkin pass
function OnCheckinPass(checkinPass) {
    checkinPass = typeof checkinPass == "string" ? JSON.parse(checkinPass) : checkinPass;
    if (!checkinPass.message || !checkinPass.signature || !checkinPass.publicKey)
        return LogShow("", "CheckinPass format not valid");

    WavesKeeperVerifyService(checkinPass, VerifyCallback);
}

function VerifyCallback(data) {
    if (!data.verify)
        return LogShow("", "Checkin Pass Signature Failed");
    console.log(data);

    var message = data.message.split(",");
    var eventId = message[0];
    var ticketId = message[1];
    var amount = message[2];
    var address = data.address;
    var personalId = "";
    var trusteeKey = "";

    CheckinAttendee(eventId, address, amount, personalId, ticketId, trusteeKey, CheckinPassCallback);
}

function CheckinPassCallback(data) {

}