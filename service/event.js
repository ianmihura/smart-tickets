var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

//TODO regex for all events, with their relevant (list) information
function GetEvents(req, res) {
    try {
        nodeInteraction.accountDataByKey("NOTHING_HERE", main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested event.", err);
    }
}

//TODO get whole event -- need this?
function GetEvent(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey(eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested event.", err);
    }
}

function GetEventData(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("data_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested event.", err);
    }
}

function GetEventTickets(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountData({
            address: main.dapp,
            match: "ticket.*" + eventId
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested data.", err);
    }
}

function GetTicketDescription(req, res) {
    try {
        var key = "ticketDescription_" + req.params.ticketId + "_" + main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey(key, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested data.", err);
    }
}

function GetCanceled(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("canceled_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested data.", err);
    }
}

function GetBalance(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("balance_" + req.params.producerAddress + "_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested data.", err);
    }
}

module.exports = {
    GetEvents: GetEvents,
    GetEvent: GetEvent,
    GetEventData: GetEventData,
    GetEventTickets: GetEventTickets,
    GetTicketDescription: GetTicketDescription,
    GetCanceled: GetCanceled,
    GetBalance: GetBalance
};