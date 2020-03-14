// Client-side Javascript
// Express service interaction - nodeInteraction & other

function GetEventDataService(eventId, callback) {
    $.get("/eventId/" + eventId, 
        (data) => callback(data));
}

function GetEventAttendeeService(eventId, attendee, personalId, callback) {
    $.get("/checkin/eventId/" + eventId + "/" + attendee + "/" + personalId, 
        (data) => callback(data));
}

function GetTxStateById(txid, callback) {
    $.get("/txstatebyid/" + txid, 
        (data) => callback(data));
}

function GetAmountOfTickets(eventId, callback) {
    $.get("/edit/amountOfTickets/" + eventId, 
        (data) => callback(data));
}

function GetCanceled(eventId, callback) {
    $.get("/edit/canceled/" + eventId, 
        (data) => callback(data));
}

function GetFinished(eventId, callback) {
    $.get("/edit/finished/" + eventId, 
        (data) => callback(data));
}

