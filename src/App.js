import React, {useEffect, useState} from 'react';
import LocationList from './screens/LocationList';

export default function App() {
  const [isLoaded, setLoaded] = useState(false)

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
 }

 useEffect(() => {
   
    //prefixes of implementation that we want to test
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || 
    // window.webkitIndexedDB || window.msIndexedDB;
    
    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || 
    window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
    window.msIDBKeyRange

  //creating a database
  const request = window.indexedDB.open("localtionList", 1);
  request.onsuccess = (event) => {
    window.db = event.target.result;
    console.log('localtionList db created');
  };

  //creating a table
  request.onupgradeneeded = (event) => {
    console.log('onupgradeneeded');
    
    var db = event.target.result;
    db.createObjectStore("locations", {keyPath:'id', autoIncrement:true});
    console.log('table created successfully.');
    
  }
  
  request.onerror = event => {
    console.log('error occured while creating localtionList db');
  }
  setLoaded(true)
 
 }, []) 
 
  return (
    <>  
        {isLoaded && <LocationList/>}
    </>
  );
}
