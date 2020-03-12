// Client-side Javascript
// Waves Keeper Controller - txData construction

function _errorHandler(err) {
    console.log("Probably no Waves Keeper installed.", err);
}

function WavesKeeperAuth() {
    WavesKeeperAuthService({
        data: "dappid",
        name: "specificname"
    })
}

function CreateEvent(title, description, date, price, amount, location, callback) {
    try {
        CreateEventService({
            type: 16,
            data: {
              fee: {
                assetId: "WAVES",
                tokens: "0.005"
              },
              dApp: "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf",
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
                                amountOfTickets: amount
                            })},
                            {type: "integer", value: date},
                            {type: "integer", value: amount},
                        ]},
            payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}

function BuyTickets(event, amount, totalPrice, callback) {
    try {
        BuyTicketService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf",
                call:{
                    function:"purchase",
                    args:[
                        {type: "string", value: "event_" + event},
                        {type: "integer", value: amount}
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

function CheckinAttendee(eventId, attendee, ticketsToCheckin, callback) {
    try {
        CheckinAttendeeService({
            type: 16,
            data: {
                fee: {
                    assetId: "WAVES",
                    tokens: "0.005"
                },
                dApp: "3NBdqVGWfdqV3UJ8S1xsz5qoBRGTEsLioLf",
                call:{
                    function:"checkin",
                    args:[
                        {type: "string", value: "event_" + eventId},
                        {type: "string", value: attendee},
                        {type: "integer", value: ticketsToCheckin}
                    ]},
                payment: []
            }
        }, callback);
    } catch (err) {
        _errorHandler(err);
    }
}