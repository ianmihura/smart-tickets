// On startup app
// Inicializators and client-side settings

var datePicker;

document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    M.Tabs.init(document.querySelectorAll('.tabs', {
        swipeable: true
    }));

    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));

    M.Modal.init(document.querySelectorAll('.modal'));

    datePicker = M.Datepicker.init(document.querySelectorAll('.datepicker'), {
        format: "dd mmm, yyyy"
    });

    M.Timepicker.init(document.querySelectorAll('.timepicker'));
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