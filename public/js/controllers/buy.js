// Client-side Javascript
// DOM elements manipulation & event listeners

var requiresId = false;

function OnGetEventData() {
    var eventId = document.getElementById("eventId").value;
    
    eventId = !eventId ? "data_event_HkLoTQGXFsdZixE1uWUKajj4mPoWEZiTxeuwtDTKqa3Z" : eventId;
    GetEventDataService(eventId, GetEventDataCallback);
}

function GetEventDataCallback(data) {
    console.log(data);

    var eventDetails = typeof data.value == "object" ? data.value : JSON.parse(data.value);
    console.log(eventDetails);

    requiresId = eventDetails.requiresId;
    var requiresIdText = requiresId ? "Event requires personal ID to purchase" : "No personal ID required"
    document.getElementById("price").innerHTML = eventDetails.price;

    document.getElementById("eventDetails").innerHTML = eventDetails.title + ", " + eventDetails.location 
        + "<br>" + eventDetails.description
        + "<br>" + requiresIdText;
}

function OnBuyTicket() {
    var eventId = document.getElementById("eventId").value;
    var amount = document.getElementById("amount").value;
    var price = Number(document.getElementById("price").innerHTML);
    var totalPrice = amount * price;

    var id = requiresId ? document.getElementById("personalId").value : ""; 

    BuyTickets(eventId, amount, totalPrice, id, BuyTicketCallback);
}

function BuyTicketCallback(data) {
    console.log(data);
}