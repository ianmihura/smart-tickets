// Client-side Javascript
// Express service interaction - nodeInteraction & other

function GetEventsService(callback) {
    $.get("/api/event/",
        (data) => callback(data));
}

function GetEventById(eventId, callback) {
    $.get("/api/event/" + eventId,
        (data) => callback(data));
}

function GetEventDataService(eventId, callback) {
    $.get("/api/event/data/" + eventId,
        (data) => callback(data));
}

function GetEventTicketsService(eventId, callback) {
    $.get("/api/event/tickets/" + eventId,
        (data) => callback(data));
}

function GetEventCanceledService(eventId, callback) {
    $.get("/api/event/canceled/" + eventId,
        (data) => callback(data));
}

function GetAttendeeService(attendee, personalId, callback) {
    $.get("/api/attendee/" + attendee + "/" + personalId,
        (data) => callback(data));
}

function GetEventAttendeeService(eventId, attendee, personalId, callback) {
    $.get("/api/attendee/" + eventId + "/" + attendee + "/" + personalId,
        (data) => callback(data));
}

function GetTxStateById(txid, callback) {
    $.get("/api/txstatebyid/" + txid,
        (data) => callback(data));
}