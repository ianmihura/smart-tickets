// UI controller of Modals
// Wallet modal

function OnWalletCreate() {
    OnWalletLogout();
    CreateWalletService(WalletCreateCallback);
}

function WalletCreateCallback(data) {
    var name = "New Testnet Wallet";
    SetLoginCredentials(name, data.address, data.seed);
    PopulateWalletFloat({
        name: name,
        address: data.address,
        seed: data.seed,
        balance: 0
    });

    LogShow("", "Wallet created successfully!");
}

function OnWalletLogout() {
    ClearLoginCredentials();
    LogShow("", "Logout successful");
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
    if (GetLoginCredentials().address)
        GetWalletBalanceService(GetLoginCredentials().address, WalletBalanceCallback);
}

function WalletBalanceCallback(data) {
    if (typeof data != "number")
        return LogShow(data, "There was an error fetching the account balance");

    var loginCredentials = GetLoginCredentials();
    loginCredentials.balance = data;

    if (GetTrusteeId().trusteeId)
        loginCredentials.trustee = GetTrusteeId().trusteeEventId;

    LogShow("", "Login successful");
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

function OnCheckoutTrustee() {
    ClearTrusteeId();
    LogShow("", "Trustee Checked out");
    OnOpenWallet();
}