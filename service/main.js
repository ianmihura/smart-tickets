var { nodeInteraction } = require('@waves/waves-transactions');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetTxStateById(txid, res, callback) {
    try {
        nodeInteraction.stateChanges(txid, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested transaction.", err);
    }
}

function GetEventDataService(eventId, res, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        nodeInteraction.accountDataByKey("data_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested event.", err);
    }
}

module.exports = { 
    GetTxStateById : GetTxStateById,
    GetEventDataService : GetEventDataService
};