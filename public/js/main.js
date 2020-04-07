document.addEventListener('DOMContentLoaded', function () {
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });

    M.Sidenav.init(document.querySelectorAll('.sidenav'));

    M.Tabs.init(document.querySelectorAll('.tabs'));

    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));

    M.Modal.init(document.querySelectorAll('.modal'));
});