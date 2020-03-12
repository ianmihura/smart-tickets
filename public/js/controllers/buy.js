// Client-side Javascript
// DOM elements manipulation & event listeners

function GetEventDataService() {
    var eventId = document.getElementById("eventId").value;
    
    eventId = !eventId ? "data_event_HkLoTQGXFsdZixE1uWUKajj4mPoWEZiTxeuwtDTKqa3Z" : eventId;
    GetEventData(eventId, GetEventDataCallback);
}

function GetEventDataCallback(data) {
    var eventDetails = JSON.parse(data.value);
    console.log(eventDetails);

    document.getElementById("eventDetails").innerHTML = eventDetails.title + ", " + eventDetails.location + "<br>" + eventDetails.description;
    document.getElementById("price").innerHTML = eventDetails.price;
}

function OnBuyTicket() {
    var eventId = document.getElementById("eventId").value;
    var amount = document.getElementById("amount").value;
    var totalPrice = amount * 1;

    BuyTickets(eventId, amount, totalPrice);
}