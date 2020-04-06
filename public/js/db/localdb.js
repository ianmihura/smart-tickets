// Access to localStorage

const TXS = "txs";

function GetTxsFromDB() {
    var txs = localStorage.getItem(TXS);
    try {
        return JSON.parse(localStorage.getItem(TXS));
    } catch (err) {
        return {};
    }
}

function AddTxToDB(tx) {
    var txs = GetTxsFromDB();
    if (!txs) txs = {};
    txs[tx.id] = tx;

    _setTxs(txs);
}

function _setTxs(txs) {
    localStorage[TXS] = JSON.stringify(txs);
}

function ClearTxsDB() {
    delete localStorage[TXS];
}