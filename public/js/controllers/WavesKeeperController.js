// Client-side Javascript
// Waves Keeper Controller - txData construction
const SmartTicketsDapp = "3N1RM5X2PdS1vH3vmzRrdzQDjAUjMqk2RbJ";
const txFee = "";

function _getEventId(eventId) {
    return eventId[1] == "_" ? eventId : "e_" + eventId;
}

function CreateEvent(title, data, date, requiresId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "createEvent",
                args: [
                    { type: "string", value: title },
                    { type: "string", value: JSON.stringify(data) },
                    { type: "integer", value: date },
                    { type: "boolean", value: requiresId }
                ]
            },
            payment: []
        }
    }, callback);
}

function CreateEventTicket(eventId, price, ticketDescription, ticketAmount, ticketMax, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "createEventTicket",
                args: [
                    { type: "string", value: _getEventId(eventId) },
                    { type: "integer", value: price },
                    { type: "string", value: ticketDescription },
                    { type: "integer", value: ticketAmount },
                    { type: "integer", value: ticketMax }
                ]
            },
            payment: []
        }
    }, callback);
}

function BuyTickets(eventId, ticketId, amount, totalPrice, personalId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "purchase",
                args: [
                    { type: "string", value: _getEventId(eventId) },
                    { type: "integer", value: ticketId },
                    { type: "integer", value: amount },
                    { type: "string", value: personalId }
                ]
            },
            payment: [{
                assetId: "WAVES",
                amount: totalPrice
            }]
        }
    }, callback);
}

function CheckinAttendee(eventId, attendee, ticketsToCheckin, personalId, ticketId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "checkin",
                args: [
                    { type: "string", value: _getEventId(eventId) },
                    { type: "string", value: attendee },
                    { type: "integer", value: ticketsToCheckin },
                    { type: "string", value: personalId },
                    { type: "integer", value: ticketId }
                ]
            },
            payment: []
        }
    }, callback);
}

function RefundTicket(eventId, amount, personalId, ticketId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "refundTicket",
                args: [
                    { type: "string", value: _getEventId(eventId) },
                    { type: "integer", value: amount },
                    { type: "string", value: personalId },
                    { type: "integer", value: ticketId }
                ]
            },
            payment: []
        }
    }, callback);
}

function CancelEvent(eventId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "cancelEvent",
                args: [
                    { type: "string", value: _getEventId(eventId) }
                ]
            },
            payment: []
        }
    }, callback);
}

function EditAvailableTickets(eventId, ticketId, newAmount, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "editEventTickets",
                args: [
                    { type: "string", value: _getEventId(eventId) },
                    { type: "integer", value: ticketId },
                    { type: "integer", value: newAmount }
                ]
            },
            payment: []
        }
    }, callback);
}

function WithdrawFunds(eventId, callback) {
    WavesKeeperTransactionService({
        type: 16,
        data: {
            fee: {
                assetId: "WAVES",
                tokens: txFee
            },
            dApp: SmartTicketsDapp,
            call: {
                function: "withdraw",
                args: [
                    { type: "string", value: _getEventId(eventId) }
                ]
            },
            payment: []
        }
    }, callback);
}