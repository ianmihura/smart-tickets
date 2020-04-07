// On startup app
// Inicializators and client-side settings

document.addEventListener('DOMContentLoaded', function () {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    M.Tabs.init(document.querySelectorAll('.tabs'));

    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));

    M.Modal.init(document.querySelectorAll('.modal'));
});

function LogShow(log, show) {
    if (log)
        console.log(log);
    if (show)
        M.toast({ html: show });
}