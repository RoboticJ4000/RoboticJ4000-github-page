import './App.css';
import AddItem from './AddItem.js';
import SearchItem from './SearchItem.js';
import ImportFile from './ImportFile.js';
import Display from './Display.js';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddItem: false,
            showSearchItem: false,
            showFileIO: false,
            gearFilter: {},
            gearArray: [],
            gearSelected: undefined
        };

        this.toggleAddItem = this.toggleAddItem.bind(this);
        this.toggleSearchItem = this.toggleSearchItem.bind(this);
        this.toggleFileIO = this.toggleFileIO.bind(this);
        this.selectGear = this.selectGear.bind(this);
        this.resetDatabase = this.resetDatabase.bind(this);
        this.queryDB = this.queryDB.bind(this);
        this.addGear = this.addGear.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.removeGear = this.removeGear.bind(this);
        this.importFile = this.importFile.bind(this);
        this.displayGear = this.displayGear.bind(this);
    }

    componentDidMount(){
        this.displayGear();
    }

    toggleAddItem() {
        this.setState( {
            showAddItem: !this.state.showAddItem,
            showSearchItem: false,
            showFileIO: false
        } );
    }

    toggleSearchItem(){
        this.setState( {
            showAddItem: false,
            showSearchItem: !this.state.showSearchItem,
            showFileIO: false
        } );
    }

    toggleFileIO(){
        this.setState( {
            showAddItem: false,
            showSearchItem: false,
            showFileIO: !this.state.showFileIO
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
                gears.createIndex('typeIndex', 'type');
            }
        }
    
        openRequest.onerror = function() {
            console.error('Failed to open database', openRequest.error);
        }
    
        openRequest.onsuccess = function() {
            let db = openRequest.result;
            func.apply(thisArg, [db]);
        }

        openRequest.onblocked = function() {
            window.alert('Error. Please delete the "gears" IndexedDB database.');
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

    // TODO: double-check or refine
    importFile(file) {
        // Use FileReader to read the File object.
        let reader = new FileReader();
        let dataString;
        let thisArg = this;

        reader.onload = function(){
            dataString = reader.result;

            // Translate from JSON to objects (JSON.parse). Contain in array.
            let array = JSON.parse(dataString);     // Will this be brought over to function?

            // Clear database.
            thisArg.resetDatabase();

            // Insert the objects, contained in array. Do within one database-open operation preferably.
            let func = function(db) {
                let transaction = db.transaction('gears', 'readwrite');
                let gears = transaction.objectStore('gears');

                for (let gear of array) {       // Will the array be brought over? Yes
                    let request = gears.add(gear);

                    request.onerror = function() {
                        window.alert('Error importing objects into database...');
                        transaction.abort();    // Keep or remove?
                    }
                }

                transaction.oncomplete = function() {
                    window.alert('Import successful');
                }
            };

            thisArg.queryDB(func, this);
            thisArg.displayGear();
        };        
        
        reader.readAsText(file); 
    }

    displayGear() {
        let context = this;
        let func;

        if (Object.keys(this.state.gearFilter).length === 0) {
            func = function(db) {
                let transaction = db.transaction('gears', 'readonly');
                let gears = transaction.objectStore('gears');
                let index = gears.index('typeIndex');

                let requestHeadgear = index.getAll('headgear');
                let requestClothing = index.getAll('clothing');
                let requestShoes = index.getAll('shoes');

                let headgears;
                let clothing;
                let shoes;
    
                requestHeadgear.onsuccess = function() {
                    headgears = requestHeadgear.result;
                }

                requestClothing.onsuccess = function() {
                    clothing = requestClothing.result;
                }

                requestShoes.onsuccess = function() {
                    shoes = requestShoes.result;
                }

                transaction.oncomplete = function() {
                    if (headgears && clothing && shoes){
                        let array = headgears.concat(clothing).concat(shoes);
                        context.setState({gearArray: array});
                    
                    } else {
                        console.log('Error retrieving from index.');
                    }
                }
            }

        } else {
            // Alternatively, just use array.filter(function) on the array produced in the above
            // if code block.
            let filter = this.state.gearFilter;
            let array = [];

            let cursorFunction = function(request) {
                let cursor = request.result;
                
                if (cursor) {   // A 'hasNext' type of deal.
                    let gear = cursor.value;
                    let subs = [gear.sub1, gear.sub2, gear.sub3];

                    if (
                        (!filter.name || gear.name.includes(filter.name)) &&
                        (filter.main === 'blank' || gear.main === filter.main) &&
                        (filter.sub1 === 'blank' || subs.includes(filter.sub1)) &&
                        (filter.sub2 === 'blank' || subs.includes(filter.sub2)) &&
                        (filter.sub3 === 'blank' || subs.includes(filter.sub3))
                    ) {
                        array.push(gear);
                    }

                    cursor.continue();
                }
            }

            func = function(db) {
                let transaction = db.transaction('gears', 'readonly');
                let gears = transaction.objectStore('gears');
                let index = gears.index('typeIndex');
                

                if (filter.type === 'blank' || filter.type === 'headgear') {
                    let requestHeadgear = index.openCursor('headgear');
                    requestHeadgear.onsuccess = function() {
                        cursorFunction(requestHeadgear);
                    }
                }

                transaction.oncomplete = function() {
                    context.queryDB(funcClothing, context);     // "Sync" call to clothing cursor.
                }
            }

            let funcClothing = function(db) {
                let transaction = db.transaction('gears', 'readonly');
                let gears = transaction.objectStore('gears');
                let index = gears.index('typeIndex');

                if (filter.type === 'blank' || filter.type === 'clothing') {
                    let requestClothing = index.openCursor('clothing');
                    requestClothing.onsuccess = function() {
                        cursorFunction(requestClothing);
                    }
                }

                transaction.oncomplete = function() {
                    context.queryDB(funcShoes, context);        // "Sync" call to shoes cursor.
                }
            }

            let funcShoes = function(db) {
                let transaction = db.transaction('gears', 'readonly');
                let gears = transaction.objectStore('gears');
                let index = gears.index('typeIndex');

                if (filter.type === 'blank' || filter.type === 'shoes') {
                    let requestShoes = index.openCursor('shoes');
                    requestShoes.onsuccess = function() {
                        cursorFunction(requestShoes);
                    }
                }

                transaction.oncomplete = function() {
                    context.setState({gearArray: array});       // Set state.
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

        // Consider adding a unique identifier code to ensure input file is acceptable?
        // Perhaps made up or unique file extension? Or first object? etc.
        let link = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.gearArray));
        

        // TODO: update export link to a button? perhaps just in CSS style?
        return (
            <div className="App">
                <div className="Tab-header">
                    <button onClick={this.toggleAddItem}>Add Gear</button>
                    <button onClick={this.toggleSearchItem}>Search Gear</button>
                    <button onClick={this.toggleFileIO}>File IO</button>
                    <button onClick={this.removeGear}>Remove Selected Gear</button>
                    <button onClick={this.resetDatabase}>Resetti Spaghetti</button>
                </div>
                
                <div>
                    {this.state.showAddItem && <AddItem addGear={this.addGear} />}
                    {this.state.showSearchItem && <SearchItem setFilter={this.setFilter} />}
                    {this.state.showFileIO && 
                        <div>
                            <ImportFile importFile={this.importFile}>
                                <a href={link} download="gearArray.json">Export as .json</a>
                            </ImportFile>
                        </div>
                    }
                </div>
                
                <Display gearArray={this.state.gearArray} selectGear={this.selectGear} gearSelected={this.state.gearSelected} />


                <footer>
                    <p className="Status">
                        This React app is at a stable build. Development may or may not be continuing.
                    </p>
                    <br/>
                    <p className="Disclaimer">
                        This React app is in no way affilated with Nintendo.
                        <br/>
                        All product names, logos, and brands are property of their respective owners.
                    </p>
                </footer>
            </div>
        );
    }
}

export default App;