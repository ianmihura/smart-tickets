// Client-side Javascript
// Txids controller

function PopulateTable() {
    var txs = GetTxsFromDB();
    var table = document.getElementById("txTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--) {
        table.deleteRow(tableLength - 1);
    }

    for (var txid in txs) {
        AddRowToTable(table, txs[txid]);
    }
}

function AddRowToTable(table, tx) {
    if (!tx)
        return;

    var row = table.insertRow();
    var txid = row.insertCell(0);
    var sender = row.insertCell(1);
    var call = row.insertCell(2);
    var datetime = row.insertCell(3);
    var statechange = row.insertCell(4);

    txid.innerHTML = tx.id;
    sender.innerHTML = tx.sender;
    call.innerHTML = tx.call.function;
    datetime.innerHTML = new Date(tx.timestamp);
}

function ManualAddTx() {
    var txid = document.getElementById("txManualAdd").value;

    GetTxById(txid, ManuallAddTxCallback);
}

function ManuallAddTxCallback(data) {
    document.getElementById("txManualAdd").value = "";
    if (!data || data.error) return;

    AddTxToDB(data);
    PopulateTable();
}