import { CHANGE_ROUTE, GET_CHILDREN_LIST, SET_UPLOADING_PROGRESS, SELECT_CHILD } from '../strings';
import createDataContext from './createDataContext';
import { firebase, storageRef } from '../firebaseConfig/config';
import { v4 as uuidv4 } from "uuid";

const authReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return { ...state, routeFlow: action.payload }
        case GET_CHILDREN_LIST:
            return { ...state, children_list: action.payload }
        case SET_UPLOADING_PROGRESS:
            return { ...state, uploadingProgress: action.payload }
        case SELECT_CHILD:
            return {
                ...state, selected_child: state.children_list.filter((child) => child.id === action.payload)
            }
        default:
            return state;
    }
};

const addChild = dispatch => async (parentId, name, date_of_birth, image, callback) => {
    try {
        dispatch({ type: SET_UPLOADING_PROGRESS, payload: true });
        const response = await fetch(image.uri)
        const blob = await response.blob();
        var uploadTask = storageRef.ref('images/' + `${new Date().getTime()}-${image.name}`).put(blob);

        // // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // dispatch({ type: SET_UPLOADING_PROGRESS, payload: progress });
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const data = {
                        parentId,
                        name,
                        date_of_birth,
                        img: downloadURL
                    };
                    firebase.database().ref('Children/').push(
                        data
                    ).then((data) => {
                        dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
                        callback();
                        console.log('data ', data)
                    }).catch((error) => {
                        dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
                        console.log('error ', error)
                    })
                });
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const addMomentChild = dispatch => async (childId, name, date, image, callback) => {
    try {
        dispatch({ type: SET_UPLOADING_PROGRESS, payload: true });
        const response = await fetch(image.uri)
        const blob = await response.blob();
        var uploadTask = storageRef.ref('images/' + `${new Date().getTime()}-${image.name}`).put(blob);

        // // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // dispatch({ type: SET_UPLOADING_PROGRESS, payload: progress });
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    const data = {
                        date,
                        img: downloadURL
                    };
                    firebase.database().ref('Children/' + childId + '/' + name).update(
                        data
                    ).then((data) => {
                        dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
                        callback();
                        console.log('data ', data)
                    }).catch((error) => {
                        dispatch({ type: SET_UPLOADING_PROGRESS, payload: false });
                        console.log('error ', error)
                    })
                });
            }
        );
    } catch (e) {
        console.log(e);
    }
};

const uploadImage = async (image) => {
    // parentId, name, date_of_birth,
    try {
        console.log('uploading');
        const response = await fetch(image.uri)
        const blob = await response.blob();
        var uploadTask = storageRef.ref('images/' + `${new Date().getTime()}-${image.name}`).put(blob);

        // // Listen for state changes, errors, and completion of the upload.
        await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // return downloadURL;
                });
            }
        );

    } catch (e) {
        console.log(e);
    }

};

const getChildren = dispatch => (uid) => {
    console.log('getting child ');
    firebase.database().ref('Children/').orderByChild("parentId").equalTo(uid).on('value', function (snapshot) {
        var list = [];
        snapshot.forEach((childSnap) => {
            var obj = {
                id: childSnap.key,
                data: childSnap.val()
            }
            list.push(obj);
        });
        dispatch({ type: GET_CHILDREN_LIST, payload: list });
    });
};


const selectChild = dispatch => (childId) => {
    console.log(childId);
    dispatch({ type: SELECT_CHILD, payload: childId });
}

const setRoute = dispatch => (route) => {
    console.log(route);
    dispatch({ type: CHANGE_ROUTE, payload: route });
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { setRoute, addChild, getChildren, addMomentChild, selectChild },
    { routeFlow: 'notSignedIn', children_list: [], uploadingProgress: false, selected_child: '' }
);