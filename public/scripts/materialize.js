document.addEventListener('DOMContentLoaded', () => {
    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {edge:'left'});

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs);
})