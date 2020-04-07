// Access to localStorage

const TXS = "txs";
const LOGS = "logs";
const TESTNET_SEED = "testnet_seed";
const TESTNET_ADDRESS = "testnet_address";
const CHECKIN_SEED = "checkin_seed";
const CHECKIN_ADDRESS = "checkin_address";

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
    logs.push({
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

// Fast Checkin - Login checkin
function SetLoginCheckin(address, seed) {
    localStorage[CHECKIN_SEED] = seed;
    localStorage[CHECKIN_ADDRESS] = address;
}

function GetLoginCheckin() {
    return {
        seed: localStorage[CHECKIN_SEED],
        address: localStorage[CHECKIN_ADDRESS]
    };
}

function ClearLoginCheckin() {
    delete localStorage[CHECKIN_SEED];
    delete localStorage[CHECKIN_ADDRESS];
}

// Testnet Wallet - alternative to Waves.Keeper
function SetTestnetWallet(address, seed) {
    localStorage[TESTNET_ADDRESS] = address;
    localStorage[TESTNET_SEED] = seed;
}

function GetTestnetWallet() {
    return {
        seed: localStorage[TESTNET_SEED],
        address: localStorage[TESTNET_ADDRESS]
    };
}
