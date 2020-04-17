// UI controller of Modals
// TX modal

function PopulateTxFloat() {
    var txs = GetTxsFromDB();
    var table = getElementById("txTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    for (var txid in txs)
        AddRowToTXTable(table, txs[txid]);

    AddEventListener();
}

function AddRowToTXTable(table, tx) {
    if (!tx)
        return;

    var row = table.insertRow();
    var txid = row.insertCell(0);
    var sender = row.insertCell(1);
    var call = row.insertCell(2);
    var datetime = row.insertCell(3);

    txid.innerHTML = "<a href='#'>" + tx.id + "</a>";
    sender.innerHTML = tx.sender;
    call.innerHTML = tx.call.function;
    datetime.innerHTML = GetFormattedDate(new Date(tx.timestamp));
}

function AddEventListener() {
    $('#txTable tr').on("click", (e) => {
        e.stopPropagation();
        var aText = e.target.parentElement.getElementsByTagName("a")[0].innerText;
        OnCopy(aText);
        LogShow("", "TXID copied");
        M.updateTextFields();
    });
}

function ManualAddTx() {
    var txid = getElementById("txManualAdd").value;

    GetTxById(txid, ManuallAddTxCallback);
}

function ManuallAddTxCallback(data) {
    getElementById("txManualAdd").value = "";

    AddTxToDB(data);
    PopulateTxFloat();
}