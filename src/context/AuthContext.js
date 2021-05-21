import { CHANGE_ROUTE, SIGN_IN_LOADING, SIGN_UP_LOADING, SET_USER_ID, USER_DATA } from '../strings';
import createDataContext from './createDataContext';
import { firebase, db } from '../firebaseConfig/config';

const authReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return { ...state, routeFlow: action.payload }
        case SIGN_UP_LOADING:
            return { ...state, signUpLoading: action.payload }
        case SIGN_IN_LOADING:
            return { ...state, signInLoading: action.payload }
        case USER_DATA:
            return { ...state, user_data: action.payload }
        case SET_USER_ID:
            return { ...state, user_id: action.payload }
        default:
            return state;
    }
};

const signup = dispatch => (name, email, password, callback) => {
    console.log(name);
    dispatch({ type: SIGN_UP_LOADING, payload: true });
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            console.log('registered')
            const uid = response.user.uid;
            const data = {
                name,
                email,
            };
            firebase.database().ref('Users/' + uid).set(
                data
            ).then((data) => {
                dispatch({ type: SIGN_UP_LOADING, payload: false });
                dispatch({ type: CHANGE_ROUTE, payload: 'SignedIn' });
                dispatch({ type: SET_USER_ID, payload: uid });
                console.log('data ', data)
            }).catch((error) => {
                dispatch({ type: SIGN_UP_LOADING, payload: false });
                console.log('error ', error)
            })
        })
        .catch((error) => {
            dispatch({ type: SIGN_UP_LOADING, payload: false });
            alert(error);
        });
};

const signin = dispatch => (email, password, remember_me, callback) => {
    dispatch({ type: SIGN_IN_LOADING, payload: true });
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid;
            dispatch({ type: SIGN_IN_LOADING, payload: false });
            dispatch({ type: SET_USER_ID, payload: uid });
            dispatch({ type: CHANGE_ROUTE, payload: 'SignedIn' });
        })
        .catch(error => {
            dispatch({ type: SIGN_IN_LOADING, payload: false });
            alert(error);
        })
};

const getUserData = dispatch => (uid) => {
    console.log(uid);
    firebase.database().ref('Users/' + uid).on('value', function (snapshot) {
        // snapshot.forEach((childSnap) => {
        //     console.log(childSnap.val());
        // });
        dispatch({ type: USER_DATA, payload: snapshot.val() });
    });
};

const setRoute = dispatch => (route) => {
    console.log(route);
    dispatch({ type: CHANGE_ROUTE, payload: route });
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { setRoute, signup, signin, getUserData },
    { routeFlow: 'notSignedIn', fistRouteFlow: 'notDone', signInLoading: false, signUpLoading: false, user_data: null, user_id: '' }
);