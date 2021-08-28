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
            gearFilter: {},
            gearArray: [],
            gearSelected: undefined
        };

        this.toggleAddItem = this.toggleAddItem.bind(this);
        this.toggleSearchItem = this.toggleSearchItem.bind(this);
        this.selectGear = this.selectGear.bind(this);
        this.resetDatabase = this.resetDatabase.bind(this);
        this.queryDB = this.queryDB.bind(this);
        this.addGear = this.addGear.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.removeGear = this.removeGear.bind(this);
        this.displayGear = this.displayGear.bind(this);
    }

    componentDidMount(){
        this.displayGear();
    }

    toggleAddItem() {
        this.setState( {
            showAddItem: !this.state.showAddItem,
            showSearchItem: false
        } );
    }

    toggleSearchItem(){
        this.setState( {
            showAddItem: false,
            showSearchItem: !this.state.showSearchItem
        } );
    }

    selectGear(gearName){
        this.setState( {gearSelected: gearName} );
    }

    queryDB(func, thisArg) {
        let openRequest = indexedDB.open('database', 1);
    
        openRequest.onupgradeneeded = function(event) {
            let db = openRequest.result;
            if (!db.objectStoreNames.contains('gears')) {
                let gears = db.createObjectStore('gears', {keyPath: 'name'});
                gears.createIndex('nameIndex', 'name', {unique: true});
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
                window.alert('Cannot add the gear to the database.\nGear must have unique names.');
            }

            request.onsuccess = function() {
                window.alert('"' + gear.name + '" was added to database.');
            }
        }

        this.queryDB(func, this);
        this.displayGear();
    }

    setFilter(gear){
        this.setState(
            {gearFilter: gear},
            () => (this.displayGear())      // Synchronously call displayGear().
        );
    }

    removeGear() {
        if (this.state.gearSelected) {
            let func = function(db) {
                let gears = db.transaction('gears', 'readwrite').objectStore('gears');
    
                gears.delete(this.state.gearSelected);
    
                window.alert('"' + this.state.gearSelected + '" was removed from the database');
                this.setState( {gearSelected: undefined} );
            }
    
            this.queryDB(func, this);
            this.displayGear();
        } else {
            window.alert('No gear was selected.\nNothing was removed from the database.')
        }
        
    }

    displayGear() {
        let context = this;
        let func;

        if (Object.keys(this.state.gearFilter).length === 0) {
            func = function(db) {
                // Sort by gear type?
                let gears = db.transaction('gears', 'readonly').objectStore('gears');
    
                let request = gears.getAll();
    
                request.onerror = function() {
                    console.error('Failed to retrieve all gear', request.error);
                }
    
                request.onsuccess = function() {
                    context.setState({gearArray: request.result});
                }
            }

        } else {
            func = function(db) {
                let gears = db.transaction('gears', 'readonly').objectStore('gears');
                
                let filter = this.state.gearFilter;
                let array = [];

                let request = gears.openCursor();

                request.onsuccess = function() {    // Called for each cursor item.
                    let cursor = request.result;
                    
                    if (cursor) {   // A 'hasNext' type of deal.
                        let gear = cursor.value;
                        let subs = [gear.sub1, gear.sub2, gear.sub3];

                        if (
                            (filter.type === 'blank' || gear.type === filter.type) &&
                            (!filter.name || gear.name.includes(filter.name)) &&
                            (filter.main === 'blank' || gear.main === filter.main) &&
                            (filter.sub1 === 'blank' || subs.includes(filter.sub1)) &&
                            (filter.sub2 === 'blank' || subs.includes(filter.sub2)) &&
                            (filter.sub3 === 'blank' || subs.includes(filter.sub3))
                        ) {
                            array.push(gear);
                        }

                        cursor.continue();
                    } else {
                        context.setState({gearArray: array});
                    }
                }
            }
        }
    
        this.queryDB(func, this);
    }

    resetDatabase() {
        let func = function(db) {
            let gears = db.transaction('gears', 'readwrite').objectStore('gears');
            gears.clear();
            // indexedDB.deleteDatabase('gears');
        }

        this.queryDB(func, this);
        this.setState({gearFilter: {}});
        this.displayGear();
    }
  
    render() {
        // TODO: Alerts for each action.
        // TODO: Select gear via click, remove (and maybe edit) gear button.

        return (
            <div className="App">
                <div>
                    <button onClick={this.toggleAddItem}>Add Gear</button>
                    <button onClick={this.toggleSearchItem}>Search Gear</button>
                    <button onClick={this.removeGear}>Remove Selected Gear</button>
                    <button onClick={this.resetDatabase}>Resetti Spaghetti</button>
                </div>
                
                <div>
                    {this.state.showAddItem && <AddItem addGear={this.addGear} />}
                    {this.state.showSearchItem && <SearchItem setFilter={this.setFilter} />}
                </div>
                
                <Display gearArray={this.state.gearArray} selectGear={this.selectGear} gearSelected={this.state.gearSelected} />

                <footer>
                    This React app is incomplete. Development is ongoing.<br/>
                    <br/>
                    This React app is in no way affilated with Nintendo. None of the images used in this app are owned by the creator.
                </footer>
            </div>
        );
    }
}

export default App;