// Client-side Javascript
// DOM elements manipulation & event listeners

function OnGetAttendeeDetails() {
    var eventId = document.getElementById("eventId").value;
    var attendee = document.getElementById("attendee").value;
    var personalId = document.getElementById("personalId").value;
    personalId = personalId ? personalId : "undefined"
    
    GetEventAttendeeService(eventId, attendee, personalId, GetEventAttendeeCallback);
}

function GetEventAttendeeCallback(data) {
    var tickets = data.value >= 0 ? data.value : "You have no tickets left."

    document.getElementById("attendeeDetails").innerHTML = tickets;
}

function OnCheckin() {
    var ticketsToCheckin = document.getElementById("ticketsToCheckin").value;
    var ticketsLeft = Number(document.getElementById("attendeeDetails").innerHTML);
    var eventId = document.getElementById("eventId").value;
    var attendee = document.getElementById("attendee").value;
    var personalId = document.getElementById("personalId").value;
    
    if (ticketsLeft == NaN || ticketsLeft <= 0)
        console.log("You don't have tickets left");
    else
        CheckinAttendee(eventId, attendee, ticketsToCheckin, personalId, CheckinCallback);
}

function CheckinCallback(data) {
    console.log("data:", data);
}
