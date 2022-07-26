<h1 align="center">Todo List - React Hooks & Firebase </h1>
<p align="center">
    A simple Todo List built using 
    <a href="https://reactjs.org/">React</a>, 
     <a href="https://mui.com/">Mantine UI</a> and 
     <a href="https://firebase.google.com/">Firebase</a>
</p>

<h2>Usage</h2>

<h3>Install the Package</h3>

```shell
npm install
```


<h3>Add Firebase configuration in firebase.js</h3>

```javaScript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export function initFirebase() {

  // Replace the app's Firebase project configuration
  const firebaseConfig = {
	//...
};
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  return db;
}

```

<h3>Run the App</h3>

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

https://user-images.githubusercontent.com/50144690/180988685-60654b72-fa8f-42f9-a31a-a5c03d201596.mov


Builds the app for production to the `build` folder.\
