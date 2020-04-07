// Client-side Javascript
// Express service interaction - nodeInteraction & other

function HTTPGetRequest(url, callback) {
    $.get(url, (data) => callback(data))
        .fail((err) => {
            if (err.responseJSON && err.responseJSON.message)
                LogShow(err, err.responseJSON.message);
            else if (err.statusText)
                LogShow(err, err.statusText);
            else
                LogShow(err, "HTTP post request failed");
        });
}

function HTTPPostRequest(url, payload, callback) {
    $.post(url, payload, data => callback(data))
        .fail((err) => {
            if (err.responseJSON && err.responseJSON.message)
                LogShow(err, err.responseJSON.message);
            else if (err.statusText)
                LogShow(err, err.statusText);
            else
                LogShow(err, "HTTP post request failed");
        });
}

// URL builders

function GetEventsService(callback) {
    HTTPGetRequest("/api/event/", callback);
}

function GetEventById(eventId, callback) {
    HTTPGetRequest("/api/event/" + eventId, callback);
}

function GetEventDataService(eventId, callback) {
    HTTPGetRequest("/api/event/data/" + eventId, callback);
}

function GetEventTicketsService(eventId, callback) {
    HTTPGetRequest("/api/event/tickets/" + eventId, callback);
}

function GetEventTicketService(eventId, ticketId, callback) {
    HTTPGetRequest("/api/event/ticket/" + eventId + ticketId, callback);
}

function GetEventTicketDescriptionService(eventId, ticketId, callback) {
    HTTPGetRequest("/api/event/ticket/description/" + eventId + "/" + ticketId, callback);
}

function GetEventCanceledService(eventId, callback) {
    HTTPGetRequest("/api/event/canceled/" + eventId, callback);
}

function GetEventBalanceService(eventId, producerAddress, callback) {
    HTTPGetRequest("/api/event/balance/" + eventId + "/" + producerAddress, callback);
}

function GetAttendeeService(attendee, personalId, callback) {
    HTTPGetRequest("/api/attendee/" + attendee + "/" + personalId, callback);
}

function GetEventAttendeeService(eventId, attendee, personalId, callback) {
    HTTPGetRequest("/api/attendee/" + eventId + "/" + attendee + "/" + personalId, callback);
}

function GetTxStateById(txid, callback) {
    HTTPGetRequest("/api/txstatebyid/" + txid, callback);
}

function GetTxById(txid, callback) {
    HTTPGetRequest("/api/txbyid/" + txid, callback);
}