// Packages
import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import 'firebase/firestore';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
import notifyReducer from './redux/reducers/NotifyReducer';
import settingsReducer from './redux/reducers/SettingsReducer';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyClFta2yeISc-s-L72rmu-xGJHtBUBpuBc",
    authDomain: "react-c-app.firebaseapp.com",
    databaseURL: "https://react-c-app.firebaseio.com",
    projectId: "react-c-app",
    storageBucket: "react-c-app.appspot.com",
    messagingSenderId: "528225215360"
};

// React-Redux-Firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add React-Redux-Firebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <-- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
});

// Check for localstorage settings
if(localStorage.getItem('settings') == null) {
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: true,
        allowRegistration: true
    }

    // Set to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = {
    settings: JSON.parse(localStorage.getItem('settings'))
};

// Create store
const store = createStoreWithFirebase(
                rootReducer, 
                initialState, 
                compose(
                    reactReduxFirebase(firebase), 
                    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
            );

export default store;
