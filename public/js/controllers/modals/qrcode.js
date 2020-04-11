// classyqr.min.js plugin controller

function OnMakeQRCode(id) {
    var element = getElementById(id);
    var qrCode = getElementById("qrcode");
    var text;

    if (!element)
        return LogShow("", "Couldn't generate the QR code");
    else if (element.value)
        text = element.value;
    else if (element.innerHTML)
        text = element.innerHTML;
    else
        return LogShow("", "Couldn't generate the QR code");

    if (qrCode.children.length)
        qrCode.removeChild(qrCode.children[0]);

    $('#qrcode').ClassyQR({
        create: true,
        type: 'text',
        text: text
    });

    getElementById("qrText").value = text;
}