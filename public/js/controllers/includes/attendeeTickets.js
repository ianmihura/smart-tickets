// Client-side Javascript
// Attendee Tickets object controller

attendeeTickets = {};
attendeeEvents = {};

document.addEventListener('DOMContentLoaded', function () {
    if (GetTestnetWallet().seed)
        document.getElementById("address").value = GetTestnetWallet().address;

    M.updateTextFields();
});

function OnGetAttendeeTickets() {
    var address = document.getElementById("address").value;
    var personalId = document.getElementById("personalId").value;
    if (!address)
        return LogShow("", "Please fill in the required fields");

    attendeeTickets = {};
    attendeeEvents = {};

    if (EventId() && this.requiresId)
        GetEventAttendeeService(EventId(), address, personalId, AttendeeTicketsCallback);
    else if (EventId() && !this.requiresId)
        GetEventAttendeeService(EventId(), address, "null", AttendeeTicketsCallback);
    else {
        if (personalId != "")
            GetAttendeeService(address, personalId, AttendeeTicketsCallback);

        GetAttendeeService(address, "null", AttendeeTicketsCallback);
    }
}

function AttendeeTicketsCallback(dataTickets) {
    attendeeTickets = Object.assign({}, this.attendeeTickets, dataTickets);
    var _attendeeTicketsKeys = Object.keys(dataTickets);

    for (var key in _attendeeTicketsKeys) {
        var keySplit = _attendeeTicketsKeys[key].split("_");
        var _eventId = "e_" + keySplit[4];

        if (!attendeeTickets[_attendeeTicketsKeys[key]].value) {
            delete attendeeTickets[_attendeeTicketsKeys[key]];
            continue;
        }

        if (EventId() && EventId() != _eventId)
            continue;

        GetEventTicketDescriptionService(_eventId, keySplit[2], GetEventTicketDescriptionCallback);
        attendeeTickets[_attendeeTicketsKeys[key]].ticketId = Number(keySplit[2]);
        this.attendeeEvents[_eventId] = 0;
    }

    if (EventId())
        _getEventData(EventId());
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
    $("#attendeeTickets").append('<li class="collection-item grey darken-4"><b>(Ticket ID)</b> => Ticket details <br> Event ID</li>');

    var i = 0;
    for (var ticketId in this.attendeeTickets) {
        $("#attendeeTickets").append('<li class="collection-item grey darken-4">'
            + "<b>(" + i + ")</b> <br> "
            + this.attendeeTickets[ticketId].title + "<br> "
            + this.attendeeTickets[ticketId].ticketDescription + "<br> "
            + this.attendeeTickets[ticketId].value + " tickets<br> "
            + "Event ID: e_" + ticketId.split("_")[4]
            + '</li>');
        i++;
    }
}