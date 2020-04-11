// UI controller of Modals
// Wallet modal

function OnWalletCreate() {
    OnWalletLogout();
    CreateWalletService(WalletCreateCallback);
}

function WalletCreateCallback(data) {
    SetLoginCredentials(getElementById("walletName").value, data.address, data.seed);

    LogShow("", "Wallet created successfully!");
    PopulateWalletFloat({
        name: getElementById("walletName").value,
        address: data.address,
        seed: data.seed,
        balance: 0
    });
}

function OnWalletLogout() {
    ClearLoginCredentials();
    PopulateWalletFloat();
}

function OnWalletLogin() {
    GetWalletAddressService(getElementById("walletSeed").value, WalletLoginCallback);
}

function WalletLoginCallback(data) {
    if (!data.address)
        return LogShow(data, "The seed is incorrect");

    SetLoginCredentials(getElementById("walletName").value, data.address, getElementById("walletSeed").value);
    GetWalletBalanceService(data.address, WalletBalanceCallback);
}

function OnOpenWallet() {
    GetWalletBalanceService(GetLoginCredentials().address, WalletBalanceCallback);
}

function WalletBalanceCallback(data) {
    if (typeof data != "number")
        return LogShow(data, "There was an error fetching the account balance");

    var loginCredentials = GetLoginCredentials();
    loginCredentials.balance = data;
    PopulateWalletFloat(loginCredentials);
}

function PopulateWalletFloat(data) {
    getElementById("walletCollection").innerHTML = "";

    for (var i in data)
        getElementById("walletCollection").innerHTML += i + _getWalletCollectionRow(data[i]);
}

function _getWalletCollectionRow(data) {
    return "<li class='collection-item white-text blue-grey darken-3'>" + data + "</li";
}