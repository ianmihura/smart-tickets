// Client-side Javascript
// DOM elements manipulation & event listeners

function OnBuyTicket() {
    var eventId = EventId();
    var ticketId = getElementById("ticketId").value;
    var amount = getElementById("amount").value;
    var price = ticketPrices[ticketId];
    var totalPrice = amount * price;
    var personalId = requiresId ? getElementById("personalId").value : "";

    if (!eventId || !ticketId || !amount)
        return LogShow("", "Please fill in the required fields");

    BuyTickets(eventId, ticketId, amount, totalPrice, personalId, BuyTicketCallback);
}

function BuyTicketCallback(data) {
    LogShow(data, 'Bought Tickets!');
    setTimeout(OnGetEventData, 2000);
}
