// ZXing-js library controller
// https://github.com/zxing-js/
// Author: ZXing

var CalleeId = "";

function SetCalleeId(id) {
    CalleeId = id;
    document.getElementById('startButton').click();
}

function decodeOnce(codeReader, selectedDeviceId) {
    codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
        console.log(result);
        if (!CalleeId)
            document.getElementById('result').textContent = result.text;
        else {
            document.getElementById(CalleeId).value = result.text;
            document.getElementById('ok').click();
        }
    }).catch((err) => {
        console.log(err);
        document.getElementById('result').textContent = err;
    });
}

function decodeContinuously(codeReader, selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // properly decoded qr code
            LogShow("", 'Found QR code');
            document.getElementById('result').textContent = result.text;
        }

        // Continue errors
        if (err) {
            if (err instanceof ZXing.NotFoundException)
                console.log('No QR code found.');
            if (err instanceof ZXing.ChecksumException)
                console.log('A code was found, but it\'s read value was not valid.');
            if (err instanceof ZXing.FormatException)
                console.log('A code was found, but it was in a invalid format.');
        }
    });
}

var selectedDeviceId;

function OnChangeSourceDeviceId(deviceId) {
    selectedDeviceId = deviceId;
}

window.addEventListener('load', function () {
    const codeReader = new ZXing.BrowserQRCodeReader();
    console.log('ZXing code reader initialized');

    codeReader.getVideoInputDevices()
        .then((videoInputDevices) => {
            const sourceSelect = document.getElementById('sourceSelect');

            if (videoInputDevices[1]) selectedDeviceId = videoInputDevices[1].deviceId;
            else selectedDeviceId = videoInputDevices[0].deviceId;

            if (videoInputDevices.length >= 1) {
                videoInputDevices.forEach((element) => {
                    const sourceOption = document.createElement('a');
                    sourceOption.text = element.label;
                    sourceOption.classList.add("collection-item");
                    sourceOption.classList.add("white-text");
                    sourceOption.classList.add("grey");
                    sourceOption.classList.add("darken-4");
                    sourceOption.href = "javascript:OnChangeSourceDeviceId('" + element.deviceId + "')";

                    sourceSelect.appendChild(sourceOption);
                });
            }

            function _startup() {
                const decodeMultiple = document.getElementById('decodeMultiple').checked;
                if (decodeMultiple) decodeContinuously(codeReader, selectedDeviceId);
                else decodeOnce(codeReader, selectedDeviceId);

                console.log(`Started decode from camera with id ${selectedDeviceId}`);
            }

            document.getElementById('startButton').addEventListener('click', _startup);

            document.getElementById('resetButton').addEventListener('click', () => {
                codeReader.reset();
                console.log('Closed');
            });

            document.getElementById('ok').addEventListener('click', () => {
                codeReader.reset();
                console.log('Closed');
            });

        })
        .catch((err) => {
            console.log(err);
        });
});
