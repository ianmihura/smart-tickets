// Client-side Javascript
// Waves Keeper Controller - txData construction
const SmartTicketsDapp = "3MzKq9FC8GAeYxYMGZqPZzrXmRwyyK9eRtU";
const txFee = "0.005";

function _errorHandler(err) {
    console.log("Probably no Waves Keeper installed.", err);
}

function WavesKeeperAuth() {
    WavesKeeperAuthService({
        data: "dappid",
        name: "specificname"
    })
}

function CreateEvent(title, data, date, requiresId, callback) {
    try {
        WavesKeeperTransactionService({
            type: 16,
            data: {
              fee: {
                assetId: "WAVES",
                tokens: txFee
              },
              dApp: SmartTicketsDapp,
              call:{
                function:"createEvent",
                args:[
                    {type: "string", value: title},
                    {type: "string", value: JSON.stringify(data)},
                    {type: "integer", value: date},
                    {type: "boolean", value: requiresId}
                ]},
            payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function CreateEventTicket(eventId, ticketId, price, description, amount, maxTicketsAmount, callback) {
    try {
        WavesKeeperTransactionService({
            type: 16,
            data: {
              fee: {
                assetId: "WAVES",
                tokens: txFee
              },
              dApp: SmartTicketsDapp,
              call:{
                function:"createEventTicket",
                args:[
                    {type: "string", value: eventId},
                    {type: "integer", value: ticketId},
                    {type: "integer", value: price},
                    {type: "string", value: description},
                    {type: "integer", value: amount},
                    {type: "integer", value: maxTicketsAmount}
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
                    tokens: txFee
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
                    tokens: txFee
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
                    tokens: txFee
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
                    tokens: txFee
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"cancelEvent",
                    args:[
                        {type: "string", value: eventId}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function EditAvailableTickets(eventId, newAmount, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: txFee
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"editEventTickets",
                    args:[
                        {type: "string", value: eventId},
                        {type: "integer", value: newAmount}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function WithdrawFunds(eventId, callback) {
    try {
        eventId = eventId[1] == "_" ? eventId : "e_" + eventId;
        WavesKeeperTransactionService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: txFee
                },
                dApp: SmartTicketsDapp,
                call:{
                    function:"withdraw",
                    args:[
                        {type: "string", value: eventId}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}