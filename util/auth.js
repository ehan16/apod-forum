import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser, getUser } from "./database";

const authContext = createContext();

export function UserContextProvider({ children }) {
  const user = useProvideAuth();
  return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const data = {
          uid: res.user.uid,
          username: email,
          type: "normal",
        };

        createUser(res.user.uid, data);
        setUser(data);
        return data;
      });
  };

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        getUser(res.user.uid).then((res) => {
          console.log(res);
          // return
        });
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        return false;
      });
  };

  const handleUser = (user) => {
    if (user) {
      const data = {
        uid: user.uid,
        username: user.email,
      };

      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signup,
    signin,
    logout,
  };
}

export const useAuth = () => {
  return useContext(authContext);
};
