import './App.css';
import AddItem from './AddItem.js';
import SearchItem from './SearchItem.js'
import Display from './Display.js';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddItem: false,
            showSearchItem: false,
            gearArray: []
        };

        this.toggleAddItem = this.toggleAddItem.bind(this);
        this.toggleSearchItem = this.toggleSearchItem.bind(this);
        this.resetDatabase = this.resetDatabase.bind(this);
        this.queryDB = this.queryDB.bind(this);
        this.addGear = this.addGear.bind(this);
        this.displayGear = this.displayGear.bind(this);
    }

    componentDidMount(){
        this.displayGear();
    }

    toggleAddItem() {
        this.setState( {showAddItem: !this.state.showAddItem} );
    }

    toggleSearchItem(){
        this.setState( {showSearchItem: !this.state.showSearchItem} );
    }

    // Go for multiple removes instead for performance?
    resetDatabase() {
        let func = function(db) {
            let gears = db.transaction('gears', 'readwrite').objectStore('gears');
            gears.clear();
        }

        this.queryDB(func, this);
        this.displayGear();
    }

    queryDB(func, thisArg) {
        let openRequest = indexedDB.open('database', 1);
    
        openRequest.onupgradeneeded = function(event) {
            let db = openRequest.result;
            if (!db.objectStoreNames.contains('gears')) {
                let gears = db.createObjectStore('gears', {keyPath: 'name'});
                gears.createIndex('typeIndex', 'type');
                gears.createIndex('nameIndex', 'name', {unique: true});
                gears.createIndex('gearsIndex', 'main');
                gears.createIndex('subIndex', ['sub1', 'sub2', 'sub3']);
            }
        }
    
        openRequest.onerror = function() {
            console.error('Failed to open database', openRequest.error);
        }
    
        openRequest.onsuccess = function() {
            let db = openRequest.result;
            func.apply(thisArg, [db]);
        }
    }

    addGear(gear) {
        let func = function(db) {
            let transaction = db.transaction('gears', 'readwrite');

            let gears = transaction.objectStore('gears');

            let request = gears.add(gear);

            request.onerror = function() {
                console.error('Failed to add gear to database', request.error);
            }

            request.onsuccess = function() {
                console.log(gear + ' was added to database');
            }
        }

        this.queryDB(func, this);
        this.displayGear();
    }

    displayGear() {
        let context = this;

        let func = function(db) {
            let gears = db.transaction('gears', 'readonly').objectStore('gears');

            let request = gears.getAll();

            request.onerror = function() {
                console.error('Failed to retrieve all gear', request.error);
            }

            request.onsuccess = function() {
                context.setState({gearArray: request.result});
            }
        }

        this.queryDB(func, this);
    }
  
    render() {
        return (
            <div className="App">
                <div>
                    <button onClick={this.toggleAddItem}>Toggle Add Gear Form</button>
                    <button onClick={this.toggleSearchItem}>Toggle Search Gear Form</button>
                    <button onClick={this.resetDatabase}>Resetti Spaghetti</button>
                </div>
                
                <div>
                    {this.state.showAddItem && <AddItem addGear={this.addGear} />}
                    {this.state.showSearchItem && <SearchItem />}
                </div>
                
                <Display gearArray={this.state.gearArray} />
            </div>
        );
    }
}

export default App;
/*
 * Notes:
 *  Use js localStorage for data storage
 */