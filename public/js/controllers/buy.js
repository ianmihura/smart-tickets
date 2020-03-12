// Client-side Javascript
// DOM elements manipulation & event listeners

function OnGetEventData() {
    var eventId = document.getElementById("eventId").value;
    
    eventId = !eventId ? "data_event_HkLoTQGXFsdZixE1uWUKajj4mPoWEZiTxeuwtDTKqa3Z" : eventId;
    GetEventDataService(eventId, GetEventDataCallback);
}

function GetEventDataCallback(data) {
    console.log(data);

    var eventDetails = typeof data.value == "object" ? data.value : JSON.parse(data.value);
    console.log(eventDetails);

    document.getElementById("eventDetails").innerHTML = eventDetails.title + ", " + eventDetails.location + "<br>" + eventDetails.description;
    document.getElementById("price").innerHTML = eventDetails.price;
}

function OnBuyTicket() {
    var eventId = document.getElementById("eventId").value;
    var amount = document.getElementById("amount").value;
    var price = Number(document.getElementById("price").innerHTML);
    var totalPrice = amount * price;

    BuyTickets(eventId, amount, totalPrice, BuyTicketCallback);
}

function BuyTicketCallback(data) {
    console.log(data);
}