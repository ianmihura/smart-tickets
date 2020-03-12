// Client-side Javascript
// Waves Keeper Service - API interaction
function WavesKeeperAuthService() {
    WavesKeeper.auth({ data: "Auth on my site" }).then(auth => {
        console.log(auth);
    }).catch(err => {
        console.log(err);
    })
}

function CreateEventService(txData, callback) {
    WavesKeeper.signAndPublishTransaction(txData)
    .then(data => callback(data))
    .catch(err => {
        console.log("Event creation failed.", err)
    })
}

function BuyTicketService(txData, callback) {
    WavesKeeper.signAndPublishTransaction(txData)
    .then(data => callback(data))
    .catch(err => {
        console.log("Couldn't buy tickets.", err);
    })
}

function CheckinAttendeeService(txData, callback) {
    WavesKeeper.signAndPublishTransaction(txData)
    .then(data => callback(data))
    .catch(err => {
        console.log("Couldn't Checkin attendee.", err);
    })
}