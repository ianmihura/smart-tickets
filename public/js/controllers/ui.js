// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

// Wait for document to load
document.addEventListener("readystatechange", function(event) { 
    try {
        // WavesKeeperAuth();
    } catch(err) {
        _errorHandler(err)
    };
});

// function showFullForm() {
//     var FullEventForm = document.getElementsByClassName("ShowFullForm")[0];
//     FullEventForm.className = "Hide";

//     var FullEventForm = document.getElementsByClassName("FullEventForm")[0];
//     FullEventForm.className = "FullEventForm";

//     var FullEventForm = document.getElementsByClassName("SubmitForm")[0];
//     FullEventForm.className = "Button";
// }

function OnCreateEvent() {
    var title = document.getElementById("nameOfEvent").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    var location = document.getElementById("location").value;
    var price = document.getElementById("price").value;
    var amount = document.getElementById("amount").value;
    
    CreateEvent(title, description, date, price, amount, location);
}