var { nodeInteraction } = require('@waves/waves-transactions');
var ts = require('@waves/ts-lib-crypto');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3N1RM5X2PdS1vH3vmzRrdzQDjAUjMqk2RbJ";
const dappM = "3MzKq9FC8GAeYxYMGZqPZzrXmRwyyK9eRtU";
const oldDapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetTxStateById(req, res) {
    try {
        nodeInteraction.stateChanges(req.params.txid, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json(err);
    }
}

function GetTxById(req, res) {
    try {
        nodeInteraction.transactionById(req.params.txid, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        res.status(500).json(err);
    }
}

function GetEventId(eventId) {
    if (!eventId || eventId == "null" || eventId == "undefined")
        return "";
    else
        return eventId[1] == "_" ? eventId : "e_" + eventId;
}

function GetAttendeeId(attendee, personalId) {
    personalId = personalId == "null"
        || personalId == "undefined"
        || !personalId
        ? "" : personalId;
    return "a_" + ts.base58Encode(ts.sha256(ts.stringToBytes(attendee + personalId)));
}

function GetBalance(req, res) {
    nodeInteraction.balance(req.params.address, nodeUrl)
        .then(wResp => res.status(200).json(wResp))
        .catch(err => res.status(400).json(err));
}

module.exports = {
    GetTxStateById: GetTxStateById,
    GetTxById: GetTxById,
    GetEventId: GetEventId,
    GetAttendeeId: GetAttendeeId,
    GetBalance: GetBalance,
    dapp: dapp,
    dappM: dappM,
    oldDapp: oldDapp,
    nodeUrl: nodeUrl
};