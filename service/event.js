var { nodeInteraction } = require('@waves/waves-transactions');
var main = require('./main.js');

//TODO regex for all events, with their relevant (list) information
function GetEvents(req, res, callback) {
	try {
		nodeInteraction.accountDataByKey("data_" + eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested event.", err);
	}
}

//TODO get whole event -- need this?
function GetEvent(req, res, callback) {
	try {
		var eventId = main.GetEventId(req.params.eventId);
		nodeInteraction.accountDataByKey(eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested event.", err);
	}
}

function GetEventData(req, res, callback) {
	try {
		var eventId = main.GetEventId(req.params.eventId);
		nodeInteraction.accountDataByKey("data_" + eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested event.", err);
	}
}

//TODO event tickets regex
function GetEventTickets(req, res, callback) {
	try {
		var eventId = main.GetEventId(req.params.eventId);
		nodeInteraction.accountDataByKey("amountTickets_" + eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested attendee.", err);
	}
}

function GetCanceled(req, res, callback) {
	try {
		var eventId = main.GetEventId(req.params.eventId);
		nodeInteraction.accountDataByKey("canceled_" + eventId, main.dapp, main.nodeUrl)
			.then(wResp => callback(res, wResp))
			.catch(err => console.log(err));
	} catch (err) {
		console.log("Couldn't fetch the requested attendee.", err);
	}
}

module.exports = {
	GetEvents: GetEvents,
	GetEvent: GetEvent,
	GetEventData: GetEventData,
	GetEventTickets: GetEventTickets,
	GetCanceled: GetCanceled
};