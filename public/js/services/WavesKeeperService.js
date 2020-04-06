// Client-side Javascript
// Waves Keeper Service - API interaction
function WavesKeeperAuthService() {
    WavesKeeper.auth({ data: "Auth on my site" }).then(auth => {
        console.log(auth);
    }).catch(err => {
        console.log(err);
    });
}

function WavesKeeperTransactionService(txData, callback) {
    try {
        WavesKeeper.signAndPublishTransaction(txData)
            .then(data => {
                AddTxToDB(data);
                callback(data);
            })
            .catch(err => {
                console.log("Waves Keeper returned with error.", err);
            });
    } catch (err) {
        console.log("Probably no Waves Keeper installed.", err);
        alert("You probably don't have Waves.Keeper installed.");
        // use alternative wallet
    }
}