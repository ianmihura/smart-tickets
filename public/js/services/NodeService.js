// Client-side Javascript
// Express service interaction - nodeInteraction & other

function GetEventDataService(eventId, callback) {
    $.get("/buy/eventId/" + eventId, 
        (data) => callback(data));
}

function GetEventAttendeeService(eventId, attendee, callback) {
    $.get("/checkin/eventId/" + eventId + "/" + attendee, 
        (data) => callback(data));
}

function GetTxStateById(txid, callback) {
    $.get("/txstatebyid/" + txid, 
        (data) => callback(data));
}