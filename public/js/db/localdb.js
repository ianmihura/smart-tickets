// Access to localStorage

const TXS = "txs";
const TESTNET_SEED = "testnet_seed";
const TESTNET_ADDRESS = "testnet_address";
const CHECKIN_SEED = "checkin_seed";
const CHECKIN_ADDRESS = "checkin_address";

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