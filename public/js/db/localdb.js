// Access to localStorage

const TXS = "txs";
const LOGS = "logs";
const WALLET_NAME = "wallet_name";
const WALLET_ADDRESS = "wallet_address";
const WALLET_SEED = "wallet_seed";
const TRUSTEE_ID = "trustee_id";

function GetTxsFromDB() {
    try {
        return JSON.parse(localStorage.getItem(TXS));
    } catch (err) {
        LogShow(err, "Error at database. Clear page cache to restart.");
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

// Log History
function GetLogsFromDB() {
    try {
        return JSON.parse(localStorage.getItem(LOGS));
    } catch (err) {
        LogShow(err, "Error at database. Clear page cache to restart.");
        return [];
    }
}

function AddLogToDB(log) {
    var logs = GetLogsFromDB();
    if (!logs) logs = [];
    logs.unshift({
        log: log,
        timestamp: new Date()
    });

    _setLogs(logs);
}

function _setLogs(logs) {
    localStorage[LOGS] = JSON.stringify(logs);
}

function ClearLogsDB() {
    delete localStorage[LOGS];
}

// Wallet Login Credentials
function SetLoginCredentials(name, address, seed) {
    localStorage[WALLET_NAME] = name;
    localStorage[WALLET_ADDRESS] = address;
    localStorage[WALLET_SEED] = seed;
}

function GetLoginCredentials() {
    return {
        name: localStorage[WALLET_NAME],
        address: localStorage[WALLET_ADDRESS],
        seed: localStorage[WALLET_SEED]
    };
}

function ClearLoginCredentials() {
    delete localStorage[WALLET_NAME];
    delete localStorage[WALLET_ADDRESS];
    delete localStorage[WALLET_SEED];
}

// Trustee Id
function SetTrusteeId(trusteeId) {
    localStorage[TRUSTEE_ID] = trusteeId;
}

function GetTrusteeId() {
    return localStorage[TRUSTEE_ID];
}

function ClearTrusteeId() {
    delete localStorage[TRUSTEE_ID];
}