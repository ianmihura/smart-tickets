// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

function OnCreateEvent() {
    var title = document.getElementById("nameOfEvent").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var location = document.getElementById("location").value;
    var price = document.getElementById("price").value;
    var amount = document.getElementById("amount").value;
    
    CreateEvent(title, description, date, price, amount, location, CreateEventCallback);
}

function CreateEventCallback(data) {
    console.log(data);
    GetCreatedTransactionStateById(data.id);
}

function GetCreatedTransactionStateById(txid) {
    GetTxStateById(txid, CreatedTransactionStateByIdCallback);
}

function CreatedTransactionStateByIdCallback(data) {
    document.getElementById("newEvent").innerHTML = data.data[0].key;
}