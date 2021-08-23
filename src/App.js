import './App.css';
import AddItem from './AddItem.js';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddItem: false
        };

        this.toggleAddItem = this.toggleAddItem.bind(this);
    }

    toggleAddItem(event) {
        this.setState( {showAddItem: !this.state.showAddItem} );
    }
  
    render() {
        return (
        <div className="App">
            <button onClick={this.toggleAddItem}>Toggle Add Gear Form</button>
            <AddItem isShown={this.state.showAddItem}/>
        </div>
        );
    }
}

export default App;

/*
 * Notes:
 *  Use js localStorage for data storage
 */