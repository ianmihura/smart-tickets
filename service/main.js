var { nodeInteraction } = require('@waves/waves-transactions');
var { base58Encode, sha256, stringToBytes } = require('@waves/ts-lib-crypto');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3N1RM5X2PdS1vH3vmzRrdzQDjAUjMqk2RbJ";
const dappM = "3MzKq9FC8GAeYxYMGZqPZzrXmRwyyK9eRtU";
const oldDapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetTxStateById(req, res) {
    try {
        nodeInteraction.stateChanges(req.params.txid, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
    } catch (err) {
        console.log("Couldn't fetch the requested transaction.", err);
    }
}

function GetEventId(eventId) {
    return eventId[1] == "_" ? eventId : "e_" + eventId;
}

function GetAttendeeId(attendee, personalId) {
    personalId = personalId == "undefined" ? "" : personalId;
    return base58Encode(sha256(stringToBytes(attendee + personalId)));
}

module.exports = {
    GetTxStateById: GetTxStateById,
    GetEventId: GetEventId,
    GetAttendeeId: GetAttendeeId,
    dapp: dapp,
    dappM: dappM,
    oldDapp: oldDapp,
    nodeUrl: nodeUrl
};