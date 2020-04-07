// Client-side Javascript
// NodeInteraction alernative to Waves.Keeper

function CreateWalletService() {
    $.get("/api/wallet/",
        (data) => CreateWalletCallback(data));
}

function CreateWalletCallback(data) {
    SetTestnetWallet(data.address, data.seed);
}

function SignAndPublishTransaction(txData, isCheckin, callback) {
    var seed = isCheckin ? GetLoginCheckin().seed : GetTestnetWallet().seed;
    $.post("api/transaction/", {
        "txData": txData,
        "seed": seed
    }, (data) => {
        AddTxToDB(data);
        callback(data);
    });
}