// Client-side Javascript
// DOM elements manipulation & event listeners

var requiresId = false;

function OnGetEventData() {
	var eventId = document.getElementById("eventId").value;

	eventId = !eventId ? "data_event_HkLoTQGXFsdZixE1uWUKajj4mPoWEZiTxeuwtDTKqa3Z" : eventId;
	GetEventData(eventId, GetEventDataCallback);
}

function GetEventDataCallback(data) {
	console.log(data);

	var eventDetails = typeof data.value == "object" ? data.value : JSON.parse(data.value);
	console.log(eventDetails);

	document.getElementById("price").innerHTML = eventDetails.price;

	requiresId = eventDetails.requiresId;
	var personalId = document.getElementById("personalId");
	if (!requiresId)
		personalId.setAttributeNode(document.createAttribute("disabled"));

	document.getElementById("eventDetails").innerHTML = eventDetails.title + ", " + eventDetails.location
		+ "<br>" + eventDetails.description;
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