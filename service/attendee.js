var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

function GetEventAttendee(req, res, callback) {
	var eventId = main.GetEventId(req.params.eventId);
	var attendeeId = main.GetAttendeeId(req.params.attendee, req.params.personalId);

	try {
		nodeInteraction.accountDataByKey("a_" + attendeeId + "_" + eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested attendee.", err);
	}
}

function GetAttendee(req, res, callback) {
	_getAttendee(main.GetAttendeeId(req.params.attendee, req.params.personalId), res,
		wResp => _getAttendee(main.GetAttendeeId(req.params.attendee, ""), res, callback, wResp)
	);
}

function _getAttendee(attendeeId, res, callback, aditionalPayload) {
	try {
		nodeInteraction.accountData({
			address: main.oldDapp,
			match: attendeeId + ".*"
		}, main.nodeUrl)
			.then(wResp => callback(res, {
				1: wResp, 2: aditionalPayload
			}))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested attendee.", err);
	}
}

module.exports = {
	GetEventAttendee: GetEventAttendee,
	GetAttendee: GetAttendee
};