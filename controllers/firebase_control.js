const { initializeApp } = require("firebase/app");
const {getDatabase, set, get, onValue, update, remove, ref, child} = require('firebase/database');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, setPersistence, browserSessionPersistence, updateEmail,
    updatePassword } = require('firebase/auth');
// import {getDatabase, set, get, onValue, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence, updateEmail, updatePassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsZ_OiNSr_TZKv5bEDeVmeewqqzMnPGt8",
    authDomain: "mademoiselle-ecommerce-724ce.firebaseapp.com",
    databaseURL: "https://mademoiselle-ecommerce-724ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mademoiselle-ecommerce-724ce",
    storageBucket: "mademoiselle-ecommerce-724ce.appspot.com",
    messagingSenderId: "218324369791",
    appId: "1:218324369791:web:068a52ce9a97dc0bb5da4a",
    measurementId: "G-0CN8EW3Q4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialise DB from firebase
const DB = getDatabase();

exports.allProducts_control = (req,res) => {
    get(ref(DB,"Products/"))
    .then((snapshot) => {
        return res.status(200).json(snapshot.val());
    })
    .catch((error)=>{
        console.log(error);
    })
}

exports.lastOrder_control = (req,res) => {
    get(ref(DB,"Dates/Collection"))
    .then((snapshot) => {
        return res.status(200).json({date:snapshot.val()});
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.newsletter_control = (req,res) => {
    const { parcel } = req.body;

    if (!parcel) {
        return res.status(400).json({status:"failed"});
    }
    set(ref(DB,`Newsletter/${parcel}`), {
        Mail: true,
    }).then(()=>{
        return res.status(200).json({status:"success"});
    }).catch((error) => {
        console.log(error);
        return res.status(400).json({status:"failed"});
    });
}

exports.paynow_control = (req,res) => {
    const { curDay, curTime, email, id, cart, paid } = req.body;
    if (!curDay) {
        return res.status(400).json({status:"failed"});
    }
    set(ref(DB,`paynowOrders/${curDay}/${curTime}`), {
        email: email,
        id: id,
        cart: cart,
        paid: paid
    })
    .then(()=> {
        return res.status(200).json({status:"success"});
    })
    .catch((error) => {
        console.log(error);
    })
}

exports.auth_control = (req,res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            get(ref(DB,`Admins/${user.uid}`))
            .then(() => {
                console.log("logged in dashboard")
                return res.status(200).send();
            })
        }
        else {
            console.log("logged out dashboard")
            return res.status(400).send();
        }
    })      
}

exports.login_control = (req, res) => {
    const { email, pass } = req.body;
    
    signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
        console.log("success sign in")
        return res.status(200).send()
    })
    .catch((error)=>{
        console.log(error)
        return res.status(404).send(error.message)
    })
}