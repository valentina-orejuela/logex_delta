import { auth } from './firebase';

// Sign Up
export const createUserWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

// Sign In
export const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => auth.signOut();

export const passwordReset = email => 
    auth.sendPasswordResetEmail(email);

export const passwordUpdate = password => 
    auth.currentUser.updatePassword(password);
