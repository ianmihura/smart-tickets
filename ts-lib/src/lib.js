import { randomSeed, address, concat, stringToBytes, signBytes, publicKey } from '@waves/ts-lib-crypto';
import { invokeScript, broadcast } from '@waves/waves-transactions';

export default {
    name: 'App',
    methods: {
        _seedData: function () {
            return document.getElementById("ts-seed-data").value;
        },
        GetAddress: function () {
            var seed = this._seedData();
            document.getElementById("ts-address-data").value = address(seed, 'T');
        },
        GetSeed: function () {
            document.getElementById("ts-seed-data").value = randomSeed();
            this.GetAddress();
        },
        Transaction: function () {
            var data = document.getElementById("ts-transaction-data").value;
            var txData = data.txData;
            var seed = data.seed;
            txData.chainId = 84;
            delete txData.fee;

            let ts = invokeScript(txData, seed);

            var nodeUrl = "https://testnodes.wavesnodes.com";
            broadcast(ts, nodeUrl)
                .then(data => {
                    console.log(data);
                    document.getElementById("ts-transaction-return").value = data;
                    document.getElementById("ts-transaction-err").value = "";
                }).catch(err => {
                    console.log(err);
                    document.getElementById("ts-transaction-return").value = "";
                    document.getElementById("ts-transaction-err").value = err;
                });
        },
        Sign: function () {
            var data = document.getElementById("ts-sign-data").value;
            var byteArray = concat([255, 255, 255, 1], stringToBytes(data.message));

            document.getElementById("ts-sign-return").value = {
                signature: signBytes(data.seed, byteArray),
                message: data.message,
                publicKey: publicKey(data.seed),
            };
        }
    }
};
