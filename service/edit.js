var { nodeInteraction } = require('@waves/waves-transactions');
const nodeUrl = "https://testnodes.wavesnodes.com";
const dapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function GetAmountOfTickets(eventId, res, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        nodeInteraction.accountDataByKey("amountTickets_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

function GetCanceled(eventId, res, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        nodeInteraction.accountDataByKey("canceled_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

function GetFinished(eventId, res, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        nodeInteraction.accountDataByKey("finished_" + eventId, dapp, nodeUrl)
            .then(wResp => callback(res, wResp))
            .catch(err => console.log(err));
    } catch(err) {
        console.log("Couldn't fetch the requested attendee.", err);
    }
}

module.exports = { 
    GetAmountOfTickets : GetAmountOfTickets,
    GetCanceled : GetCanceled,
    GetFinished : GetFinished,
};