var { nodeInteraction } = require('@waves/waves-transactions');
var { base58Encode, sha256, stringToBytes } = require('@waves/ts-lib-crypto');

const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetEventAttendeeService(eventId, attendee, personalId, res, callback) {
    eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
    
    try {
        nodeInteraction.accountDataByKey("a_" + _getAttendeeId(attendee, personalId) + "_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

function _getAttendeeId(attendee, personalId) {
    personalId = personalId == "undefined" ? "" : personalId;
    return base58Encode(sha256(stringToBytes(attendee + personalId)));
}

module.exports = { GetEventAttendeeService : GetEventAttendeeService };