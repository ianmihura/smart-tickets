// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners
var eventId = "";

function OnGetEventDataEdit() {
    eventId = document.getElementById("eventId").value;
    
    GetEventDataService(eventId, GetEventDataEditCallback);
    GetAmountOfTickets(eventId, GetAmountOfTicketsCallback);
    GetCanceled(eventId, GetCanceledCallback);
    GetFinished(eventId, GetFinishedCallback);
}

function GetEventDataEditCallback(data) {
    document.getElementById("eventDetails").innerHTML = JSON.parse(data.value).title;
}

function GetAmountOfTicketsCallback(data) {
    document.getElementById("ticketsLeft").innerHTML = data.value + " tickets left";
}

function GetCanceledCallback(data) {
    document.getElementById("canceled").innerHTML = data.value ? "Event was canceled" : "Event is OK!";
}

function GetFinishedCallback(data) {
    console.log(data);
    // document.getElementById("finished").innerHTML = data ? ;
}

function OnCancelEvent() {
    // still missing
}

function CancelEventCallback(data) {
    console.log(data);
}

function OnWithdrawFunds() {
    // still missing
}

function WithdrawFundsCallback(data) {
    console.log(data);
}