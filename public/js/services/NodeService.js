// Client-side Javascript
// Express service interaction - nodeInteraction & other

function HTTPGetRequest(url, callback) {
    $.get(url, (data) => {
        if ((!data && data !== 0) || JSON.stringify(data) == "{}")
            return LogShow("Response is empty. The request data is probably incorrect.", "Response is empty. The request data is probably incorrect.");

        callback(data);
    }).fail((err) => {
        if (err.responseJSON && err.responseJSON.message)
            LogShow(err.responseJSON.message, err.responseJSON.message);
        else if (err.statusText)
            LogShow(err.statusText, err.statusText);
        else
            LogShow(err, "HTTP get request failed");
    });
}

function HTTPPostRequest(url, payload, callback) {
    $.post(url, payload, data => {
        if (!data || JSON.stringify(data) == "{}")
            return LogShow("HTTP post request returned empty.", "HTTP post request returned empty.");

        if (data.id)
            AddTxToDB(data);

        callback(data);
    }).fail((err) => {
        if (err.responseJSON && err.responseJSON.message)
            LogShow(err.responseJSON.message, err.responseJSON.message);
        else if (err.statusText)
            LogShow(err.statusText, err.statusText);
        else
            LogShow(err, "HTTP post request failed");
    });
}

// URL builders

function SignAndPublishTransaction(txData, seed, callback) {
    HTTPPostRequest("api/transaction/", {
        "txData": txData,
        "seed": seed
    }, (data) => callback(data));
}

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

function GetEventTrusteeService(eventId, callback) {
    HTTPGetRequest("api/event/trustee/" + eventId, callback);
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

function CreateWalletService(callback) {
    HTTPGetRequest("/api/wallet/", callback);
}

function GetWalletBalanceService(address, callback) {
    HTTPGetRequest("/api/wallet/" + address, callback);
}

function GetWalletAddressService(seed, callback) {
    HTTPPostRequest("api/wallet", { seed: seed }, callback);
}