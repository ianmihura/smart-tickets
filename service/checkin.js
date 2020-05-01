var ts = require('@waves/ts-lib-crypto');
var main = require('./main.js');

function Verify(req, res) {
    try {
        let byteArray = ts.concat([255, 255, 255, 1], ts.stringToBytes(req.body.message));
        res.status(200).json({
            verify: ts.verifySignature(req.body.publicKey, byteArray, req.body.signature),
            message: req.body.message,
            address: ts.address({ publicKey: req.body.publicKey }, ts.TEST_NET_CHAIN_ID)
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    Verify: Verify
};