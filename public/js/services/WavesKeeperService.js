// Client-side Javascript
// Waves Keeper Service - API interaction

function WavesKeeperAuth(message, callback) {
    try {
        if (GetTestnetWallet().seed)
            callback(GetTestnetWallet());
        else
            WavesKeeper.auth({ data: message })
                .then(data => callback(data))
                .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
        alert("You probably don't have Waves.Keeper installed.");
    }
}

function WavesKeeperTransactionService(txData, callback) {
    try {
        if (GetLoginCheckin().seed) {
            M.toast({ html: "Tx signed with your login credentials." });
            SignAndPublishTransaction(txData, true, callback);
        } else if (GetTestnetWallet().seed) {
            M.toast({ html: "Tx signed with your testnet wallet." });
            SignAndPublishTransaction(txData, false, callback);
        } else
            WavesKeeper.signAndPublishTransaction(txData)
                .then(data => {
                    AddTxToDB(data);
                    callback(data);
                })
                .catch(err => {
                    console.log("Waves Keeper returned with error.", err);
                });
    } catch (err) {
        console.log(err);
        alert("You probably don't have Waves.Keeper installed.");
    }
}

