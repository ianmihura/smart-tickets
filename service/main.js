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
        console.log("Couldn't fetch the requested transaction.", err);
    }
}

function GetTxById(req, res) {
    try {
        nodeInteraction.transactionById(req.params.txid, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        console.log("Couldn't fetch the requested transaction.", err);
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

function GetWallet(req, res) {
    var seed = ts.randomSeed();

    res.status(200).json({
        seed: seed,
        address: ts.address(seed, 'T')
    });
}

module.exports = {
    GetTxStateById: GetTxStateById,
    GetTxById: GetTxById,
    GetEventId: GetEventId,
    GetAttendeeId: GetAttendeeId,
    GetWallet: GetWallet,
    dapp: dapp,
    dappM: dappM,
    oldDapp: oldDapp,
    nodeUrl: nodeUrl
};