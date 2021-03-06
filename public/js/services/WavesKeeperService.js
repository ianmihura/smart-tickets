// Client-side Javascript
// Waves Keeper Service - API interaction

function WavesKeeperAuth(message, callback) {
    try {
        WavesKeeper.auth({ data: message })
            .then(data => callback(data))
            .catch(err => LogShow(err, "Waves Keeper returned with an error"));
    } catch (err) {
        LogShow(err, "You probably don't have Waves.Keeper installed.");
    }
}

function WavesKeeperTransactionService(txData, callback) {
    try {
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

function WavesKeeperSingService(message, callback) {
    try {
        WavesKeeper.signCustomData({
            version: 1,
            binary: btoa(message)
        }).then(data => {
            // .. validations

            callback(data);
        }).catch(err => LogShow(err, "Waves.Keeper returned with an error"));
    } catch (err) {
        LogShow(err, "You probably don't have Waves.Keeper installed.");
    }
}

function WavesKeeperVerifyService(checkinPass, callback) {
    try {
        WavesKeeper.verifyCustomData({
            version: 1,
            binary: btoa(checkinPass.message),
            signature: checkinPass.signature,
            publicKey: checkinPass.publicKey
        }).then(data => {
            // .. validations

            callback(data);
        }).catch(err => LogShow(err, "Waves.Keeper returned with an error"));
    } catch (err) {
        LogShow(err, "You probably don't have Waves.Keeper installed.");
    }
}