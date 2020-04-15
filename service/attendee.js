var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

function GetAttendee(req, res) {
    var eventId = main.GetEventId(req.params.eventId);
    var attendeeId = main.GetAttendeeId(req.params.attendee, req.params.personalId);

    try {
        nodeInteraction.accountData({
            address: main.dapp,
            match: attendeeId + ".*" + eventId
        }, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    GetAttendee: GetAttendee
};