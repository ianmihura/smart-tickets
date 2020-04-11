// UI controller of Modals
// TX modal

function PopulateTxFloat() {
    var txs = GetTxsFromDB();
    var table = document.getElementById("txTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    for (var txid in txs)
        AddRowToTXTable(table, txs[txid]);
}

function AddRowToTXTable(table, tx) {
    if (!tx)
        return;

    var row = table.insertRow();
    var txid = row.insertCell(0);
    var sender = row.insertCell(1);
    var call = row.insertCell(2);
    var datetime = row.insertCell(3);

    txid.innerHTML = tx.id;
    sender.innerHTML = tx.sender;
    call.innerHTML = tx.call.function;
    datetime.innerHTML = GetFormattedDate(new Date(tx.timestamp));
}

function ManualAddTx() {
    var txid = document.getElementById("txManualAdd").value;

    GetTxById(txid, ManuallAddTxCallback);
}

function ManuallAddTxCallback(data) {
    document.getElementById("txManualAdd").value = "";

    AddTxToDB(data);
    PopulateTxFloat();
}