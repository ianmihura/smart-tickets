var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

// get events data
function GetEvents(req, res) {
    try {
        nodeInteraction.accountData({
            address: main.dapp,
            match: "data_e_.*"
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetEvent(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountData({
            address: main.dapp,
            match: ".*" + eventId
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetEventData(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("data_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
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
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetEventTicket(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountData({
            address: main.dapp,
            match: "ticket.*" + req.params.ticketId + "_" + eventId
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetEventTrustee(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountData({
            address: main.dapp,
            match: "trustee.*" + eventId
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetOwnerEvents(req, res) {
    try {
        nodeInteraction.accountData({
            address: main.dapp,
            match: "e_.*"
        }, main.nodeUrl)
            .then(wResp => {
                result = {};
                for (var e in wResp)
                    if (wResp[e].value == req.params.address)
                        result[e] = wResp[e];
                res.status(200).json(result);
            }).catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetTicketDescription(req, res) {
    try {
        var key = "ticketDescription_" + req.params.ticketId + "_" + main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey(key, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetCanceled(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("canceled_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

function GetBalance(req, res) {
    try {
        var eventId = main.GetEventId(req.params.eventId);
        nodeInteraction.accountDataByKey("balance_" + req.params.producerAddress + "_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    GetEvents: GetEvents,
    GetEvent: GetEvent,
    GetEventData: GetEventData,
    GetCanceled: GetCanceled,
    GetBalance: GetBalance,
    GetEventTickets: GetEventTickets,
    GetEventTicket: GetEventTicket,
    GetEventTrustee: GetEventTrustee,
    GetTicketDescription: GetTicketDescription,
    GetOwnerEvents: GetOwnerEvents
};