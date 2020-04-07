// Client-side Javascript
// NodeInteraction alernative to Waves.Keeper

function CreateWalletService() {
    HTTPGetRequest("/api/wallet/",
        (data) => CreateWalletCallback(data));
}

function CreateWalletCallback(data) {
    SetTestnetWallet(data.address, data.seed);
}

function SignAndPublishTransaction(txData, seed, callback) {
    HTTPPostRequest("api/transaction/", {
        "txData": txData,
        "seed": seed
    }, (data) => {
        if (!data)
            return LogShow(data, "HTTP post request returned empty. ");

        if (data.id)
            AddTxToDB(data);

        callback(data);
    });
}