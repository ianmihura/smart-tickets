// Client-side Javascript
// DOM elements manipulation & event listeners

function OnRefund() {
    var eventId = document.getElementById("eventId").value;
    var amount = document.getElementById("amount").value;
    var personalId = document.getElementById("personalId").value;
    
    RefundTicket(eventId, amount, personalId, GetEventDataCallback);
}

function OnRefundCallback(data) {
    console.log(data);

    document.getElementById("result").innerHTML = "Succesfully refunded your tickets";
}