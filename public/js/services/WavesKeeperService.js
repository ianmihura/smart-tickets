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
			.then(data => callback(data))
			.catch(err => {
				console.log("Waves Keeper returned with error.", err);
			});
	} catch (err) {
		_errorHandler(err);
	}
}