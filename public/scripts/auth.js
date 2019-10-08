// signing a user up
const signUpForm = document.querySelector('.signUpForm');

const regexEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
const regexPassword = /^[\w@-]{5,10}$/i;

signUpForm['signup-email'].addEventListener('keyup', e => {
    if(regexEmail.test(e.target.value)) {
        e.target.style.border = '2px solid green';
    }
    else {
        e.target.style.border = '2px solid red';
    }
})

signUpForm['signup-password'].addEventListener('keyup', e => {
    if(regexPassword.test(e.target.value)) {
        e.target.style.border = '2px solid green';
    }
    else {
        e.target.style.border = '2px solid red';
    }
})

signUpForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then(credential => {
        signUpForm.reset();
        const modal = document.querySelector('#signUp');
        M.Modal.getInstance(modal).close();

        const userLabel = document.querySelector('.userLabel');
        console.log(credential);

        db.collection('users').doc(credential.user.uid).set({
            email: email,
            password: password
        });
    }).catch(error => {
        const errMessage = document.querySelector('.signup-error-message');
        errMessage.textContent = error.message;
    })
})

// logging a user out
const logOut = document.querySelector('.logout');

logOut.addEventListener('click', e => {
    auth.signOut().then(() => {
        console.log('the user signed out');
    })
})

// logging a user in
const logInForm = document.querySelector('.logInForm');

logInForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = logInForm['login-email'].value;
    const password = logInForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(user => {
        logInForm.reset();
        const modal = document.querySelector('#logIn');
        M.Modal.getInstance(modal).close();
    }).catch(error => {
        console.log(error);
        const errMessage = document.querySelector('.signin-error-message');
        errMessage.textContent = error.message;
    })
    
})

// from sign up form to sign in form
const link = document.querySelector('.refer');

link.addEventListener('click', e => {
    const signupModal = document.querySelector('#signUp');
    M.Modal.getInstance(signupModal).close();

    const signinModal = document.querySelector('#logIn');
    M.Modal.getInstance(signinModal).open();
})

// listening for auth changes
auth.onAuthStateChanged(user => {
    if(user) {
        setupUI(user);
    }
    else {
        setupUI();
    }
})