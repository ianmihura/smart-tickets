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

module.exports = { GetTxStateById : GetTxStateById };