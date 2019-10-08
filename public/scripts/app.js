const soldTodayList = document.querySelector('.soldToday');
const soldThisWeekList = document.querySelector('.soldThisWeek');
const soldThisMonthList = document.querySelector('.soldThisMonth');

// code for the addSale form
const addProductForm = document.querySelector('.addSaleForm');
let productFormInputFields = addProductForm.querySelectorAll('input');

addProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const now = new Date();

    const product = {
        title: productFormInputFields[0].value.trim(),
        id: productFormInputFields[1].value.trim(),
        value: productFormInputFields[2].value.trim(),
        dateSold: dateFns.format(now, 'dddd D MMMM YYYY'),
        timeSold: `${now.getHours()}:${now.getMinutes()}`,
    };

    sendProduct(product);
    addProductForm.reset();
})

// deleting products from the soldTodayList
soldTodayList.addEventListener('click', e => {
    if(e.target.tagName === 'I'){
        const product = e.target.parentElement.parentElement;
        let productId = product.getAttribute('data-id');
        deleteProduct(productId);
    }
})

// (re)moving products from/to the month list
const determineMonth = (doc) => {
    const thisMonth = dateFns.format(new Date(), 'MMMM');

    const product = doc.data();
    const monthSold = product.dateSold.split(" ", 3)[2];
    if(monthSold === thisMonth) {
        generateProduct(doc);
    }

    if(monthSold != thisMonth) {
        deleteProduct(doc.id);
    }
}

// calculating the total sold value in the month
const valueArray = [];

const calculate = (doc) => {
    const monthText = document.querySelectorAll('.month-text');
    const value = document.querySelector('.total-value');
    const productValue = doc.data().value;
    valueArray.push(productValue);
    const numberArray = valueArray.map(Number);
    
    let totalSold = numberArray.reduce((acc, curr) => {
        if(curr > 0) {
            acc += curr;
        }
        return acc
    }, 0)

    monthText.forEach(item => {
        item.textContent = `Sold in ${dateFns.format(new Date(), 'MMMM')} : ${totalSold} USD`;
    })
}

// search products
const searchForm = document.querySelector('.search-form');
const searchField = document.querySelector('#search');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = searchField.value.trim();
    
    db.collection('products').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            findProducts(doc, term);
        })
    })
    searchForm.reset();
})

const findProducts = (doc, term) => {
    const productId = doc.data().id;
    
    if(term === productId) {
        generateSearch(doc);
    }

    /*if (term != productId) {
        deleteSearch(doc);
    }*/
}