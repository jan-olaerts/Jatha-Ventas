db.collection('products').orderBy('dateSold').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {

        if(change.type === 'added') {
            determineMonth(change.doc);
            calculate(change.doc);
        }
        
        if(change.type === 'removed') {
            let card = document.querySelector(`[data-id='${change.doc.id}']`);
            card.remove();
        }
    })
})

const sendProduct = (product) => {
    db.collection('products').add(product);
}

const deleteProduct = (productId) => {
    db.collection('products').doc(productId).delete();
}