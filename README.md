<h1 align="center">Todo List - React Hooks & Firebase </h1>
<p align="center">
    A simple Todo List built using 
    <a href="https://reactjs.org/">React</a>, 
     <a href="https://mui.com/">Mantine UI</a> and 
     <a href="https://firebase.google.com/">Firebase</a>
</p>


<h2>Install the Package</h2>

```shell
npm install
```

<h2>Added Firebase Cloud Firestore in Web</h2>

<h3>Build project and application on Firebase</h3>
First go to <a href="https://firebase.google.com/">Firebase</a> and create a project.

Then add a new web application to register it, and add the firebase SDKs to our development program.


Here, we initialize Firebase and add the SDK to `firebase.js`. Also, 
replace `firebaseConfig` with Your web app's Firebase configuration.

```javaScript
import { initializeApp } from "firebase/app";


export function initFirebase() {

  // Replace the app's Firebase project configuration
  const firebaseConfig = {
	//...
};
  
  const app = initializeApp(firebaseConfig);

}

```
<h3>Using Cloud Firestore Features</h3>
Use Cloud Firestore features in the app and create a Database.

Cloud Firestore provides test mode and locked mode to start our Database, we can choose according to our needs.

Next, specify where to store your Cloud Firestore data and enable Database.

<h3>Initialize Cloud Firestore</h3>

Likewise, we import and initialize Cloud Firestore in the `firebase.js` file.

```javaScript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export function initFirebase() {

  // Replace the app's Firebase project configuration
  const firebaseConfig = {
	//...
};
  
  const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return db;
}

```

<h2>Run the App</h2>

```shell
npm run
```

<h2>Features </h2>

- Add todos, todos will be sorted according to the added time.
- Ability to directly edit the content of todos.
- Can view completed todos on done, and completed items will be sorted according to the ticked time.
- Save todos to Firebase Local Storage and Cloud Firestore  when the state changes.
- Load the todos from Local Storage and Firebase Cloud Firestore when the site is loaded again.
- When the Firebase Cloud Firestore is updated, the todos data will be updated instantly.

<h2>Demo</h2>

https://user-images.githubusercontent.com/50144690/181178708-08a8d791-66e2-45f0-b065-17ccaad60368.mov


