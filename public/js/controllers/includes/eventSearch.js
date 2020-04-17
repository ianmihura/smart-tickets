// Client-side Javascript
// Event object controller

function OnGetAllEvents() {
    GetEventsService(GetAllEventsCallback);
}

function GetAllEventsCallback(data) {
    var events = {};
    var now = new Date();
    var table = getElementById("eventSearch");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    for (var _dataId in data)
        if (JSON.parse(data[_dataId].value).date > now)
            events[_getEventIdFromDataId(_dataId)] = JSON.parse(data[_dataId].value);

    for (var eventId in events)
        AddRowToSearchTable(table, eventId, events[eventId]);

    AddEventListener();
}

function _getEventIdFromDataId(dataId) {
    return "e_" + dataId.split("_")[2];
}


function AddRowToSearchTable(table, eventId, event) {
    if (!event)
        return;

    var row = table.insertRow();
    var _eventId = row.insertCell(0);
    var title = row.insertCell(1);
    var description = row.insertCell(2);
    var location = row.insertCell(3);
    var date = row.insertCell(4);

    _eventId.innerHTML = "<a href='#'>" + eventId + "</a>";
    title.innerHTML = event.title;
    description.innerHTML = event.description;
    location.innerHTML = event.location;
    date.innerHTML = new Date(event.date);
}

function AddEventListener() {
    $('#eventSearch tr').on("click", (e) => {
        e.stopPropagation();
        var aText = e.target.parentElement.getElementsByTagName("a")[0].innerText;
        var eventId = getElementById("eventId");
        if (aText && eventId)
            eventId.value = aText;
        M.updateTextFields();
    });
}