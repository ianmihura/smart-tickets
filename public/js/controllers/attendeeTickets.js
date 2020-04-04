// Client-side Javascript
// Attendee Tickets object controller

attendeeTickets = {};
attendeeEvents = {};

function OnGetAttendeeTickets() {
    var address = document.getElementById("address").value;
    var personalId = document.getElementById("personalId").value;
    attendeeTickets = {};
    attendeeEvents = {};

    if (this.eventId && this.requiresId)
        GetEventAttendeeService(this.eventId, address, personalId, AttendeeTicketsCallback);
    else if (this.eventId && !this.requiresId)
        GetEventAttendeeService(this.eventId, address, "null", AttendeeTicketsCallback);
    else {
        if (personalId != "")
            GetAttendeeService(address, personalId, AttendeeTicketsCallback);

        GetAttendeeService(address, "null", AttendeeTicketsCallback);
    }
}

function AttendeeTicketsCallback(dataTickets) {
    attendeeTickets = Object.assign({}, this.attendeeTickets, dataTickets);
    var _attendeeEvents = Object.keys(dataTickets);

    for (var key in _attendeeEvents) {
        var keySplit = _attendeeEvents[key].split("_");
        var _eventId = "e_" + keySplit[4];

        if (this.eventId && this.eventId != _eventId)
            continue;

        GetEventTicketDescriptionService(_eventId, keySplit[2], GetEventTicketDescriptionCallback);
        this.attendeeEvents[_eventId] = 0;
    }

    if (this.eventId)
        _getEventData(this.eventId);
    else
        for (var eventId in this.attendeeEvents)
            _getEventData(eventId);
}

function _getEventData(eventId) {
    if (this.attendeeEvents[eventId] == 0)
        GetEventDataService(eventId, GetAttendeeEventsCallback);
}

// Ticket
function GetEventTicketDescriptionCallback(data) {
    for (var key in this.attendeeTickets) {
        var originalKey = key.split("_")[2] + key.split("_")[4];
        var dataKey = data.key.split("_")[1] + data.key.split("_")[3];

        if (originalKey == dataKey)
            this.attendeeTickets[key].ticketDescription = data.value;
    }
    PopulateAttendeeTickets();
}

// Event
function GetAttendeeEventsCallback(data) {
    var dataKey = data.key.split("_")[2];
    var eventTitle = JSON.parse(data.value).title;
    this.attendeeEvents["e_" + dataKey] = eventTitle;

    for (var key in this.attendeeTickets)
        if (key.split("_")[4] == dataKey)
            this.attendeeTickets[key].title = eventTitle;

    PopulateAttendeeTickets();
}

function PopulateAttendeeTickets() {
    $("#attendeeTickets").empty();
    $("#attendeeTickets").append('<li class="collection-header"><b>(Ticket ID)</b> => Ticket details <br> Event ID</li>');

    var i = 0;
    for (var ticketId in this.attendeeTickets) {
        $("#attendeeTickets").append('<li class="collection - item">'
            + "<b>(" + i + ")</b> => "
            + this.attendeeTickets[ticketId].title + "; "
            + this.attendeeTickets[ticketId].ticketDescription + "; "
            + this.attendeeTickets[ticketId].value + "; "
            + "Event ID: e_" + ticketId.split("_")[4]
            + '</li>');
        i++;
    }
}