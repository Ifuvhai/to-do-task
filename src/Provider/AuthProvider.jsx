import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([null])
    const [loading, setLoading] = useState(true)
    const [verify, setVerify] = useState("")

    // google login 
    const handleGoogleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    };

    // register user 
    const handleRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const handleLogIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }


    // signOut 
    const handleSignOut = () => {
        setLoading(true)
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        handleGoogleSignIn,
        user,
        setUser,
        handleSignOut,
        handleRegister,
        handleLogIn,
        loading,
        setVerify,
        verify
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;