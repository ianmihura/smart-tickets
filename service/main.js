var { nodeInteraction, index } = require('@waves/waves-transactions');
var waves = require('@waves/waves-transactions');
var ts = require('@waves/ts-lib-crypto');
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

function GetTxById(req, res) {
    try {
        nodeInteraction.transactionById(req.params.txid, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => console.log(err));
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

function PostTransaction(req, res) {
    try {
        let ts = waves.invokeScript({
            dApp: dapp,
            call: {
                function: req.body["txData[data][call][function]"],
                args: _getArgs(req.body)
            },
            payment: _getPayment(req.body),
            chainId: 84,
        }, req.body.seed);

        waves.broadcast(ts, nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        console.log(err);
    }
}

function _getArgs(body) {
    var args = [];
    var index = 0;

    while (body[_getArgsIndex(index, "type")]) {
        args.push({
            type: body[_getArgsIndex(index, "type")],
            value: body[_getArgsIndex(index, "value")]
        });
        index++;
    }

    return args;
}

function _getArgsIndex(index, key) {
    return 'txData[data][call][args][' + index + '][' + key + ']';
}

function _getPayment(body) {
    var amount = body['txData[data][payment][0][amount]'];
    var payment = amount ? [{
        amount: body['txData[data][payment][0][amount]']
    }] : [];

    return payment;
}

module.exports = {
    GetTxStateById: GetTxStateById,
    GetTxById: GetTxById,
    GetEventId: GetEventId,
    GetAttendeeId: GetAttendeeId,
    GetWallet: GetWallet,
    PostTransaction: PostTransaction,
    dapp: dapp,
    dappM: dappM,
    oldDapp: oldDapp,
    nodeUrl: nodeUrl
};