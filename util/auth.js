import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
import { createUser, getUser } from "./database";

const authContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  const signup = (email, password, name) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const data = {
          name: name,
          uid: res.user.uid,
          username: email,
          type: "normal",
        };

        createUser(res.user.uid, data);
        setUser(data);
        return data;
      });
  };

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        getUser(res.user.uid).then((res) => {
          console.log(res.data());
          setUser(res.data());
          console.log(user);
        });
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        console.log("Logged out")
      });
  };

  const handleUser = (user) => {
    if (user) {
      getUser(user.uid).then((res) => {
        console.log(res.data());
        setUser(res.data());
        return res.data();
      });
    } else {
      setUser(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    // console.log(firebase.auth().currentUser);
    return () => unsubscribe();
    // handleUser(firebase.auth().currentUser);
  }, []);

  return (
    <authContext.Provider value={{ user, signup, login, logout }}>
      {props.children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
