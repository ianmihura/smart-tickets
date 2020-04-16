// Client-side Javascript
// DOM elements manipulation & event listeners

var eventId = EventId();
var ticketId;

// Login Trustee
function OnLoginTrustee() {
    GetEventTrusteeService(EventId(), LoginTrusteeCallback);
}

function LoginTrusteeCallback(data) {
    for (var trusteeKey in data) {
        if (data[trusteeKey].value == GetLoginCredentials().address) {
            LogShow("", 'Login Trustee Successfull');
            return SetTrusteeId(trusteeKey.split("_")[1]);
        }
    }

    LogShow("", 'Address Not Found in the Trustee list');
}

function OnCheckinLogout() {
    ClearLoginCredentials();
    ClearTrusteeId();
    LogShow("", 'Login credentials have been cleared.!');
}

// Manual Checkin
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

    var personalId = getElementById("personalId").value;
    var ticketsToCheckin = getElementById("ticketsToCheckin").value;
    var attendeeAddress = getElementById("address").value;
    if (!eventId || !attendeeAddress || !ticketsToCheckin || !ticketId)
        return LogShow("", "Please fill in the required fields");

    CheckinAttendee(eventId, attendeeAddress, ticketsToCheckin, personalId, ticketId, GetTrusteeId(), CheckinCallback);
}

function CheckinCallback(data) {
    LogShow(data, 'Checkin Succesful!');
    setTimeout(OnGetAttendeeTickets, 2000);
}

// Checkin pass
function OnCheckinPass(_checkinPass) {
    var checkinPass = typeof _checkinPass == "string" ? JSON.parse(_checkinPass) : _checkinPass;

    if (!checkinPass.message || !checkinPass.signature || !checkinPass.publicKey)
        return LogShow("", "CheckinPass format not valid");

    WavesKeeperVerifyService(checkinPass, VerifyCallback);
}

function VerifyCallback(data) {
    if (data.verify === false)
        return LogShow("", "Checkin Pass Signature Failed");

    var message = data.message.split(",");
    var eventId = message[0];
    var ticketId = message[1];
    var amount = message[2];
    var address = data.address;
    var personalId = "";
    var trusteeKey = GetTrusteeId();

    if (!eventId || !amount || !address || !ticketId)
        return LogShow("", "Checkin Pass Error");

    CheckinAttendee(eventId, address, amount, personalId, ticketId, trusteeKey, CheckinPassCallback);
}

function CheckinPassCallback(data) {
    LogShow(data, "Checkin Succesfull");
}