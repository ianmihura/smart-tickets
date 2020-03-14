// Client-side Javascript
// Waves Keeper Controller - txData construction
const SmartTicketsDapp = "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf";

function _errorHandler(err) {
    console.log("Probably no Waves Keeper installed.", err);
}

function WavesKeeperAuth() {
    WavesKeeperAuthService({
        data: "dappid",
        name: "specificname"
    })
}

function CreateEvent(title, description, date, price, amount, location, requiresId, callback) {
    try {
        WavesKeeperTransactionService({
            type: 16,
            data: {
              fee: {
                assetId: "WAVES",
                tokens: "0.005"
              },
              dApp: SmartTicketsDapp,
              call:{
                        function:"createEvent",
                        args:[
                            {type: "string", value: title},
                            {type: "integer", value: price},
                            {type: "string", value: JSON.stringify({
                                title: title,
                                description: description,
                                date: date,
                                location: location,
                                price: price,
                                amountOfTickets: amount,
                                requiresId: requiresId
                            })},
                            {type: "integer", value: date},
                            {type: "integer", value: amount},
                            {type: "boolean", value: requiresId}
                        ]},
            payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function BuyTickets(eventId, amount, totalPrice, id, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"purchase",
                    args:[
                        {type: "string", value: eventId},
                        {type: "integer", value: amount},
                        {type: "string", value: id}
                    ]},
                payment: [{
                    assetId: "WAVES",
                    amount: totalPrice
                }]
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function CheckinAttendee(eventId, attendee, ticketsToCheckin, personalId, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"checkin",
                    args:[
                        {type: "string", value: eventId},
                        {type: "string", value: attendee},
                        {type: "integer", value: ticketsToCheckin},
                        {type: "string", value: personalId}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function RefundTicket(eventId, amount, personalId, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"refundTicket",
                    args:[
                        {type: "string", value: eventId},
                        {type: "integer", value: amount},
                        {type: "string", value: personalId}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function CancelEvent(eventId, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"cancelEvent",
                    args:[
                        {type: "string", value: eventId},
                        {type: "integer", value: amount}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}