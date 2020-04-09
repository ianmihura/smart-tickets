// classyqr.min.js plugin controller

function OnMakeQRCode(id) {
    var element = document.getElementById(id);
    var text;

    if (!element)
        return LogShow("", "Couldn't generate the QR code");
    else if (element.value)
        text = element.value;
    else if (element.innerHTML)
        text = element.innerHTML;
    else
        return LogShow("", "Couldn't generate the QR code");

    if ($('#qrcode')[0].children.length)
        $('#qrcode')[0].removeChild($('#qrcode')[0].children[0]);

    $('#qrcode').ClassyQR({
        create: true,
        type: 'text',
        text: text
    });
}