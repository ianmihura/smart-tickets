var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

function GetEventAttendee(req, res) {
    var eventId = main.GetEventId(req.params.eventId);
    var attendeeId = main.GetAttendeeId(req.params.attendee, req.params.personalId);

    try {
        nodeInteraction.accountDataByKey("a_" + attendeeId + "_" + eventId, main.dapp, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

function GetAttendee(req, res) {
    try {
        nodeInteraction.accountData({
            address: main.dapp,
            match: main.GetAttendeeId(req.params.attendee, req.params.personalId) + ".*"
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

module.exports = {
    GetEventAttendee: GetEventAttendee,
    GetAttendee: GetAttendee
};