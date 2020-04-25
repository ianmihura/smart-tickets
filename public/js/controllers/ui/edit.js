// Client-side Javascript
// UI elements - DOM elements manipulation & event listeners

var eventDate;

document.addEventListener('DOMContentLoaded', function () {
    if (GetLoginCredentials().seed)
        getElementById("address").value = GetLoginCredentials().address;

    M.updateTextFields();
});

// Get My Events
function OnGetMyEvents() {
    var address = getElementById("address").value;
    GetOwnerEventsService(address, GetMyEventsCallback);
}

function GetMyEventsCallback(data) {
    var myEvents = getElementById("myEvents");
    for (var i = 1; i < myEvents.rows.length; i++)
        getElementById("myEvents").deleteRow[i];

    for (eventId in data)
        GetEventDataService(eventId, PopulateMyEvents);
}

function PopulateMyEvents(data) {
    e_data = JSON.parse(data.value);
    eventId = "e_" + data.key.split("_")[2];
    var myEvents = getElementById("myEvents");

    var row = myEvents.insertRow();
    var _eventId = row.insertCell(0);
    var title = row.insertCell(1);
    var description = row.insertCell(2);
    var location = row.insertCell(3);
    var date = row.insertCell(4);

    _eventId.innerHTML = "<a href='#'>" + eventId + "</a>";
    title.innerHTML = e_data.title;
    description.innerHTML = e_data.description;
    location.innerHTML = e_data.location;
    date.innerHTML = new Date(e_data.date);

    AddTableListener();
}

function AddTableListener() {
    $('#myEvents tr').on("click", (e) => {
        e.stopPropagation();
        var aText = e.target.parentElement.getElementsByTagName("a")[0].innerText;
        var eventId = getElementById("eventId");
        if (aText && eventId)
            eventId.value = aText;
        M.updateTextFields();
    });
}

// Get Event Details Callback
function GetEventDataEditCallback(data) {
    getElementById("newTitle").value = data.title;
    getElementById("newDescription").value = data.description;
    getElementById("newLocation").value = data.location;

    eventDate = new Date(data.date).getTime();
    this.datePicker[0].setDate(eventDate);

    M.updateTextFields();
}

// Edit Event Details
function OnEditEventDetails() {
    var nTime = getElementById("newTime").value;
    var nDate = getElementById("newDate").value;
    if ((!nDate && nTime) || (nDate && !nTime))
        return LogShow("", "Please fill both date and time fileds");

    var newTitle = getElementById("newTitle").value;
    var newDescription = getElementById("newDescription").value;
    var newLocation = getElementById("newLocation").value;

    if (!nTime)
        var newDate = eventDate;
    else
        var newDate = new Date(getElementById("newDate").value
            + " " + getElementById("newTime").value).getTime();

    if (!newTitle || !newDescription || !newDate || !newTime || !newLocation || !EventId())
        return LogShow("", "Please fill in the required fields");

    EditEventDetails(EventId(), {
        title: newTitle,
        date: newDate,
        description: newDescription,
        location: newLocation
    }, newDate, EditEventDetailsCallback);
}

function EditEventDetailsCallback(data) {
    LogShow(data, "Event details changed successfully");

    setTimeout(OnGetEventData, 2000);
}


// Edit Owner
function OnEditEventOwner() {
    var newProducer = getElementById("newProducer").value;

    if (!newProducer || !EventId())
        return LogShow("", "Please fill in the required fields");

    EditEventOwner(EventId(), newProducer, EditEventOwnerCallback);
}

function EditEventOwnerCallback(data) {
    LogShow(data, "Owner changed successfully");
}

// Edit Tickets
function OnEditAvailableTickets() {
    var ticketId = getElementById("ticketId").value;
    var newAmount = getElementById("newAmount").value;

    if (!ticketId || !newAmount || !EventId())
        return LogShow("", "Please fill in the required fields");

    EditAvailableTickets(EventId(), ticketId, newAmount, EditTicketsCallback);
}

function EditTicketsCallback(data) {
    LogShow(data, "Tickets edited successfully");

    setTimeout(OnGetAttendeeTickets, 2000);
}

// Cancel
function OnCancelEvent() {
    if (!EventId())
        return LogShow("", "Please fill in the Event Id");

    CancelEvent(EventId(), CancelEventCallback);
}

function CancelEventCallback(data) {
    LogShow(data, "Event was canceled");
}

// Balance
function OnShowFunds() {
    WavesKeeperAuth("Show the event balance", _onShowFunds);
}

function _onShowFunds(data) {
    GetEventBalanceService(EventId(), data.address, OnShowFundsCallback);
}

function OnShowFundsCallback(data) {
    if (!data.value && data.value !== 0)
        return LogShow(data, "Only the creator of the event can view the funds");

    LogShow(data, "Data retrieved succesfully");

    document.getElementById("funds").innerHTML = "The balance for this event is<br>" + data.value + " WAVES";
}

function OnWithdrawFunds() {
    if (!EventId())
        return LogShow("", "Please fill in the Event Id");

    WithdrawFunds(EventId(), WithdrawFundsCallback);
}

function WithdrawFundsCallback(data) {
    if (!data.id)
        return LogShow(data, "There was an error with the withdrawal");

    LogShow(data, "Withdrawal Successful");
}

// Trustee
function OnShowStrustees() {
    if (!EventId())
        return LogShow("", "Please fill in the Event Id");

    GetEventTrusteeService(EventId(), ShowStrusteesCallback);
}

var trustees = {};
function ShowStrusteesCallback(data) {
    getElementById("trustees").innerHTML = "";
    trustees = data;
    for (var trustee in data)
        AddTrusteeRow(data[trustee]);
}

function AddTrusteeRow(trustee) {
    if (trustee.value)
        getElementById("trustees").innerHTML += "<li class='collection-item grey darken-4'>" + trustee.value + "</li>";
}

function OnAddTrustee() {
    var trusteeAddress = getElementById("newTrustee").value;

    for (var i in trustees)
        if (trusteeAddress == trustees[i].value)
            return LogShow("", "The address is already a trustee");

    if (!EventId(), !trusteeAddress)
        return LogShow("", "Please fill in the required data");

    EditTrusteeService(EventId(), trusteeAddress, Object.keys(trustees).length, AddTrusteeCallback);
}

function AddTrusteeCallback(data) {
    LogShow(data, "Trustee added successfully");

    setTimeout(OnShowStrustees, 2000);
}

function OnRemoveTrustee() {
    var trusteeAddress = getElementById("newTrustee").value;

    var trusteeKey = false;
    for (var i in trustees)
        if (trusteeAddress == trustees[i].value)
            trusteeKey = i.split("_")[1];

    if (trusteeKey === false)
        return LogShow("", "The address is not a trustee");
    if (!EventId(), !trusteeAddress)
        return LogShow("", "Please fill in the required data");

    EditTrusteeService(EventId(), "", trusteeKey, AddTrusteeCallback);
}

function AddTrusteeCallback(data) {
    LogShow(data, "Trustee added successfully");

    setTimeout(OnShowStrustees, 2000);
}