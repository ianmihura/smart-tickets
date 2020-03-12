var { nodeInteraction } = require('@waves/waves-transactions');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetEventDetailsService(eventId, res, callback) {
    try {
        nodeInteraction.accountDataByKey(eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't find the requested event.", err);
    }
}

module.exports = { GetEventDetailsService : GetEventDetailsService };