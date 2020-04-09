// UI controller of Modals
// TX modal

function PopulateTxFloat() {
    PopulateWallet();
    var txs = GetTxsFromDB();
    var table = document.getElementById("txTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--) {
        table.deleteRow(tableLength - 1);
    }

    for (var txid in txs) {
        AddRowToTXTable(table, txs[txid]);
    }
}

function PopulateWallet() {
    var wallet = GetTestnetWallet();
    if (!wallet.seed) return;

    $("#testnetWalletSeed")[0].innerHTML = "Seed: " + wallet.seed;
    $("#testnetWalletAddress")[0].innerHTML = "Address: " + wallet.address;

}

function AddRowToTXTable(table, tx) {
    if (!tx)
        return;

    var row = table.insertRow();
    var txid = row.insertCell(0);
    var sender = row.insertCell(1);
    var call = row.insertCell(2);
    var datetime = row.insertCell(3);

    var date = new Date(tx.timestamp);
    txid.innerHTML = tx.id;
    sender.innerHTML = tx.sender;
    call.innerHTML = tx.call.function;
    datetime.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "hs";
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