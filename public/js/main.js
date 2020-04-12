// On startup app
// Inicializators and client-side settings

var datePicker;

document.addEventListener('DOMContentLoaded', function () {
    // M.Sidenav.init(document.querySelectorAll('.sidenav'));
    // M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
    // M.Modal.init(document.querySelectorAll('.modal'));
    // M.Timepicker.init(document.querySelectorAll('.timepicker'));
    // $(".dropdown-trigger").dropdown();
    // M.Tabs.init(document.querySelectorAll('.tabs', {
    //     swipeable: true
    // }));

    datePicker = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: "dd mmm, yyyy"
    });

    M.AutoInit();
});

function LogShow(log, show) {
    if (log)
        _log(log);
    if (show)
        M.toast({ html: show });
}

function _log(log) {
    console.log(log);

    if (log.id)
        AddLogToDB(log.id + ": Transaction successful. Check TX History for more details.");
    else
        AddLogToDB(log);
}

function OnCopy(id) {
    var from = getElementById(id);
    var range = document.createRange();
    window.getSelection().removeAllRanges();
    range.selectNode(from);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

function GetFormattedDate(date) {
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + " - "
        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "hs";
}

function getElementById(id) {
    return document.getElementById(id);
}