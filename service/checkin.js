var { nodeInteraction } = require('@waves/waves-transactions');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetEventAttendeeService(eventId, attendee, res, callback) {
    try {
        nodeInteraction.accountDataByKey("attendee_" + attendee + "_event_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

module.exports = { GetEventAttendeeService : GetEventAttendeeService };