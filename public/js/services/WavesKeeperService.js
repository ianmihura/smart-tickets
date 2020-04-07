// Client-side Javascript
// Waves Keeper Service - API interaction

function WavesKeeperAuth(message, callback) {
    try {
        if (GetTestnetWallet().seed)
            callback(GetTestnetWallet());
        else
            WavesKeeper.auth({ data: message })
                .then(data => callback(data))
                .catch(err => LogShow(err, "Waves Keeper returned with an error"));
    } catch (err) {
        LogShow(err, "You probably don't have Waves.Keeper installed.");
    }
}

function WavesKeeperTransactionService(txData, callback) {
    try {
        if (GetLoginCheckin().seed) {
            M.toast({ html: "Tx signed with your login credentials." });
            SignAndPublishTransaction(txData, GetLoginCheckin().seed, callback);
        } else if (GetTestnetWallet().seed) {
            M.toast({ html: "Tx signed with your testnet wallet." });
            SignAndPublishTransaction(txData, GetTestnetWallet().seed, callback);
        } else
            WavesKeeper.signAndPublishTransaction(txData)
                .then(data => {
                    if (!data)
                        return LogShow("Waves.Keeper returned no data", "Waves.Keeper returned no data");
                    else if (data.code)
                        return LogShow(err, "Waves.Keeper answered with code + " + data.code);
                    else if (typeof data == "string")
                        data = JSON.parse(data);

                    AddTxToDB(data);
                    callback(data);
                })
                .catch(err => LogShow(err, "Waves.Keeper returned with an error"));
    } catch (err) {
        LogShow(err, "You probably don't have Waves.Keeper installed.");
    }
}

