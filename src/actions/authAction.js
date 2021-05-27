import Swal from "sweetalert2";
import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./uiAction";

export const login = (uid, displayName) => ({
  type: types.Login,
  payload: {
    uid,
    displayName,
  },
});

export const startRegisterNameEmailPassword = (name, email, password) => (
  dispatch
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async ({ user }) => {
      await user.updateProfile({ displayName: name });
      dispatch(login(user.uid, user.displayName));
    })
    .catch((err) => Swal.fire("Error", err.message, "error"));
};

export const startLoginEmailPassword = (email, password) => (dispatch) => {
  dispatch(startLoading());
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
      dispatch(finishLoading());
    })
    .catch((err) => {
      console.log(err.message);
      dispatch(finishLoading());
      Swal.fire("Error", err.message, "error");
    });
};

export const startGoogleLogin = () => (dispatch) => {
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(({ user }) => dispatch(login(user.uid, user.displayName)));
};

export const startLogout = () => async (dispatch) => {
  await firebase.auth().signOut();
  dispatch(logout());
};

export const logout = () => ({
  type: types.Logout,
});
