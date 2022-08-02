import * as firebase from "firebase/app";
import { FirebaseError } from "firebase/app";
import * as admin from "firebase-admin";
import { auth } from "firebase-admin";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import User from "../users/user.interface";
import * as UserLibrary from "../users/user.library";

const firebaseConfig = require("../../../firebase.json");
const serviceAccount = require("../../../serviceAccountKey.json");

firebase.initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<User> => {
    const auth = getAuth();
    const userCredential: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user: User = <User>await UserLibrary.createUser({
        ...userCredential.user,
        name,
    });

    user.stsTokenManager = userCredential.user.stsTokenManager;

    return user;
};

export const login = async (email: string, password: string): Promise<User> => {
    const auth = getAuth();
    const userCredential: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    const user: User = <User>await UserLibrary.getUser(email);

    user.stsTokenManager = userCredential.user.stsTokenManager;

    return user;
};

export const validateToken = async (idToken: string): Promise<User> => {
    const { uid } = await auth().verifyIdToken(idToken);
    const user: User = <User>await UserLibrary.getUser(uid);
    return user;
};
