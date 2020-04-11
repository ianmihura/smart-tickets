// Client-side Javascript
// DOM elements manipulation & event listeners

function OnGetTxidData() {
    var txid = getElementById("txidInput").value;

    if (!txid)
        return LogShow("", "Please fill in the required fields");

    GetTxStateById(txid, GetTxidStateCallback);
    GetTxById(txid, GetTxByIdCallback);
}

function GetTxidStateCallback(data) {
    if (!data.data && !data.transfers)
        LogShow("", "TX retrieved successfully");

    var keyArray = data.data[0].key.split("_");
    var _eventId = keyArray[keyArray.length - 1];

    AddEventIdToTxidCollection(_eventId);
    PopulateTxidTable(data);
    LogShow("", "TX retrieved successfully");
}

function GetTxByIdCallback(data) {
    if (data.id)
        PopulateTxidCollection(data);
}

function PopulateTxidTable(data) {
    var table = document.getElementById("txidTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    for (var i in data.data)
        AddRowToTxidTable(table, data.data[i]);

    for (var i in data.transfers)
        AddRowToTxidTable(table, data.transfers[i]);
}

function AddRowToTxidTable(table, data) {
    if (!data)
        return;

    var row = table.insertRow();
    var id = row.insertCell(0);
    var key = row.insertCell(1);
    var value = row.insertCell(2);

    if (data.address) {
        id.innerHTML = "Asset Transfer";
        key.innerHTML = data.address;
        value.innerHTML = data.amount;
    } else if (data.key) {
        id.innerHTML = "State Change";
        key.innerHTML = data.key.split("_")[0] == "e" ? "owner" : data.key.split("_")[0];
        value.innerHTML = data.value;
    }
}

function PopulateTxidCollection(data) {
    var collection = getElementById("txidCollection");

    collection.innerHTML += "Sender: " + _getTxidCollectionRow(data.sender)
        + "Function: " + _getTxidCollectionRow(data.call.function)
        + "Time: " + _getTxidCollectionRow(new Date(data.timestamp));
}

function AddEventIdToTxidCollection(eventId) {
    getElementById("txidCollection").innerHTML += "Event ID: " + _getTxidCollectionRow("e_" + eventId);
}

function _getTxidCollectionRow(data) {
    return "<li class='collection-item grey darken-4'>" + data + "</li>";
}