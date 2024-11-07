
import { nanoid } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const api = import.meta.env.VITE_API_KEY;
console.log(api)

const firebaseConfig = {
  // apiKey: api,
  apiKey: "AIzaSyB7E1i9W3ne5_nbGd3opiZ_Ws-HB6Atbe8",
  authDomain: "employee-management-30557.firebaseapp.com",
  projectId: "employee-management-30557",
  storageBucket: "employee-management-30557.appspot.com",
  messagingSenderId: "288119791189",
  appId: "1:288119791189:web:fee920c49ef2bd3a78fedc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    console.log(user);
  } catch (error) {
    console.error("Error during sign-up:", error.message);
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    if (userCredential) {
      console.log("signin successfully")
    }
  }
  catch (error) {
    console.error("Error during sign-in:", error.message);
  }
}

const logout = async () => {
  try {
    await signOut(auth);
    alert("User signed out successfully!");
    
  } catch (err) {
    alert(err.code.split('/')[1].split('-').join(" "));
    console.log(err);
    console.log(err);
  }
}

const db = getFirestore();
const storage = getStorage();

const addUser = async (data) => {
  try {
    let imageUrl = '';

    if (data.image && data.imageSrc) {
      const storageRef = ref(storage, `profile_pictures/${data.image}`);

      const response = await fetch(data.imageSrc);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob)
      imageUrl = await getDownloadURL(storageRef);
      console.log("Uploaded image URL:", imageUrl);
    } else {
    }
    const newEmployeeRef = doc(db, 'employees', data.email);
    await setDoc(newEmployeeRef, {
      id:nanoid(),
      name: data.name,
      email: data.email,
      gender: data.gender,
      role: data.role,
      imageUrl: imageUrl,
      contact:data.contact,
      city:data.city,
      address:data.address
    }).then(
      alert("Form Data Submitted")
    );
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Failed to save employee data.');
  }
}

const Dashboard = async(data)=>{
  console.log(data)
  try {
    const newDashbaord = doc(db, 'Dashboard', data.name)
    await setDoc(newDashbaord, {
      id: nanoid(),
      name: data.name,
      department: data.department
    })
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Failed to save Dashboard data.');
  }
}

const exportUser = async () => {
  try {
    const docSnapshot = await getDocs(collection(db, "employees"));
    const arr = [];
    docSnapshot.forEach((doc) => {
      arr.push({ id: doc.email, ...doc.data() });
    });
    return arr;
  } catch (error) {
    console.log(error)
  }
}
const exportDash = async () => {
  try {
    const docSnapshot = await getDocs(collection(db, "Dashboard"));
    const arr = [];
    docSnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    return arr;
  } catch (error) {
    console.log(error)
  }
}

export { signUp, signIn, auth, logout, addUser, exportUser , Dashboard , exportDash }