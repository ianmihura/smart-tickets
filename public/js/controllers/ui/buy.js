// Client-side Javascript
// DOM elements manipulation & event listeners

function OnBuyTicket() {
    var eventId = document.getElementById("eventId").value;
    var ticketId = document.getElementById("ticketId").value;
    var amount = document.getElementById("amount").value;
    var price = ticketPrices[ticketId];
    var totalPrice = amount * price;
    var personalId = requiresId ? document.getElementById("personalId").value : "";

    BuyTickets(eventId, ticketId, amount, totalPrice, personalId, BuyTicketCallback);
}

function BuyTicketCallback(data) {
    GetEventTicketsService(eventId, GetEventTicketsCallback);

    document.getElementById("result").innerHTML = "Succesfully bought tickets";
}