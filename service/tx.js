var waves = require('@waves/waves-transactions');
var main = require('./main.js');

function PostTransaction(req, res) {
    try {
        let ts = waves.invokeScript({
            dApp: main.dapp,
            call: {
                function: req.body["txData[data][call][function]"],
                args: _getArgs(req.body)
            },
            payment: _getPayment(req.body),
            chainId: 84,
        }, req.body.seed);

        waves.broadcast(ts, main.nodeUrl)
            .then(wResp => res.status(200).json(wResp))
            .catch(err => res.status(400).json(err));
    } catch (err) {
        console.log(err);
    }
}

function _getArgs(body) {
    var args = [];
    var index = 0;

    while (body[_getArgsIndex(index, "type")]) {
        var value = body[_getArgsIndex(index, "value")];
        value = value == "false" ? false : value;
        console.log(value);

        args.push({
            type: body[_getArgsIndex(index, "type")],
            value: value
        });
        index++;
    }

    return args;
}

function _getArgsIndex(index, key) {
    return 'txData[data][call][args][' + index + '][' + key + ']';
}

function _getPayment(body) {
    var amount = body['txData[data][payment][0][amount]'];
    var payment = amount ? [{
        amount: body['txData[data][payment][0][amount]']
    }] : [];

    return payment;
}

module.exports = {
    PostTransaction: PostTransaction
};

