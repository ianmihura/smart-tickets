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