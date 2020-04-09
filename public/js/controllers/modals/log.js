// UI controller of Modals
// Logs modal

function PopulateLogFloat() {
    var logs = GetLogsFromDB();
    var table = document.getElementById("logTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    for (var i in logs)
        AddRowToLogTable(table, logs[i]);
}

function AddRowToLogTable(table, log) {
    if (!log)
        return;

    var row = table.insertRow();
    var info = row.insertCell(0);
    var datetime = row.insertCell(1);

    info.innerHTML = JSON.stringify(log.log);
    datetime.innerHTML = log.timestamp;
}