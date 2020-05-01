function BaseAuthService(message, callback) {
    if (GetLoginCredentials().seed)
        callback(GetLoginCredentials());
    else
        WavesKeeperAuth(message, callback);
}

function BaseTransactionService(txData, callback) {
    if (GetLoginCredentials().seed) {
        LogShow("", "Tx signed with your login credentials.");
        SignAndPublishTransaction(txData, GetLoginCredentials().seed, callback);
    } else
        WavesKeeperTransactionService(txData, callback);
}

function BaseSignService(message, callback) {
    if (GetLoginCredentials().seed) {
        LogShow("", "Signed with your login credentials.");
        GetSignService(GetLoginCredentials().seed, message, callback);
    } else
        WavesKeeperSingService(message, callback);
}

function BaseVerifyService(checkinPass, callback) {
    if (GetLoginCredentials().seed) {
        LogShow("", "Verified with your login credentials.");
        GetVerifiedService(checkinPass, callback);
    } else
        WavesKeeperVerifyService(checkinPass, callback);
}

// ts-lib
function CreateWalletService(callback) {
    document.getElementById("ts-seed").click();
    callback({
        address: document.getElementById("ts-address-data").value,
        seed: document.getElementById("ts-seed-data").value
    });
}

function GetWalletAddressService(seed, callback) {
    document.getElementById("ts-seed-data").value = seed;
    document.getElementById("ts-address").click();
    var address = document.getElementById("ts-address-data").value;
    callback({ address: address });
}

function SignAndPublishTransaction(txData, seed, callback) {
    document.getElementById("ts-transaction-data").value = {
        txData: txData.data,
        seed: seed
    };
    document.getElementById("ts-transaction").click();

    var data = document.getElementById("ts-transaction-return").value;
    var err = document.getElementById("ts-transaction-err").value;

    if (data) {
        AddTxToDB(data);
        callback(data);
    } else if (err)
        LogShow(err, "Transaction Error. Check the Error Log for more info.");
    else
        LogShow("", "Transaction Empty.");
}

function GetSignService(seed, message, callback) {
    document.getElementById("ts-sign-data").value = {
        message: message,
        seed: seed
    };

    document.getElementById("ts-sign").click();
    var data = document.getElementById("ts-sign-return").value;

    if (data) {
        AddTxToDB(data);
        callback(data);
    } else
        LogShow("", "Transaction Empty.");
}