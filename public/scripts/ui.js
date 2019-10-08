// ui for the created products
const generateProduct = (doc) => {
    const product = doc.data();
    const today = dateFns.format(new Date(), 'dddd D MMMM YYYY');

    if(product.dateSold === today) {
        let html = `<div class="card z-depth-0" data-id="${doc.id}" style="opacity: .9; border: 1px solid #1a237e">
                        <div class="card-title center">${product.title}</div>
                        <div class="card-content">
                            <div class="productId">Serial number: ${product.id}</div>
                            <div class="productValue">Value: ${product.value} USD</div>
                            <div class="dateSold">Date sold: ${product.dateSold}</div>
                            <div class="timeSold">Time sold: ${product.timeSold}</div>
                        </div>
                        <div class="card-action">
                            <i class="material-icons right indigo-text text-darken-4">delete</i>
                            <h6 class="center">This product has been sold today</h6>
                        </div>
                    </div>`;

        soldTodayList.innerHTML += html;
        soldThisMonthList.innerHTML += html;
    }

    if(product.dateSold != today) {
        let html = `<div class="card z-depth-0" data-id="${doc.id}" style="opacity: .9; border: 1px solid #1a237e">
                        <div class="card-title center">${product.title}</div>
                        <div class="card-content">
                            <div class="productId">Serial number: ${product.id}</div>
                            <div class="productValue">Value: ${product.value} USD</div>
                            <div class="dateSold">Date sold: ${product.dateSold}</div>
                            <div class="timeSold">Time sold: ${product.timeSold}</div>
                        </div>
                        <div class="card-action">
                            <h6 class="center">This product has been sold this month</h6>
                        </div>
                    </div>`;

        soldThisMonthList.innerHTML += html;
    }
}

// conditional ui
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const tabs = document.querySelector('.tabs-section');
const userName = document.querySelectorAll('.user-label');

const setupUI = (user) => {
    if(user) {
        loggedOutLinks.forEach(link => link.style.display = 'none');
        loggedInLinks.forEach(link => link.style.display = 'block');
        tabs.style.display = 'block';

        userName.forEach(label => {
            label.textContent = user.email;
        })
    }
    else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
        tabs.style.display = 'none';

        userName.forEach(label => {
            label.textContent = '';
        })

        const modal = document.querySelector('#signUp');
        M.Modal.getInstance(modal).open();
    }
}

// search output
const generateSearch = (doc) => {
    const searchOutput = document.querySelector('.search-output');
    const product = doc.data();

    let html = `<div class="card z-depth-0" data-id="${doc.id}" style="opacity: .9; border: 1px solid #1a237e">
                    <div class="card-title center">${product.title}</div>
                    <div class="card-content">
                        <div class="productId">Serial number: ${product.id}</div>
                        <div class="productValue">Value: ${product.value} USD</div>
                        <div class="dateSold">Date sold: ${product.dateSold}</div>
                        <div class="timeSold">Time sold: ${product.timeSold}</div>
                    </div>
                    <div class="card-action">
                        <h6 class="center">This product has been sold this month</h6>
                    </div>
                </div>`;

    searchOutput.innerHTML += html;
}

/*const deleteSearch = (doc) => {
    const searchOutput = document.querySelector('.search-output');
    searchOutput.innerHTML = '';
    let card = searchOutput.querySelector(`[data-id='${doc.id}']`);
    card.remove();
}*/