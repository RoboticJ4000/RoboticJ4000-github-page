import './App.css';
import AddItem from './AddItem.js';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
  
    render() {
        return (
        <div className="App">
            <AddItem isShown={true}/>
        </div>
        );
    }
}

export default App;

/*
 * Notes:
 *  Use js localStorage for data storage
 */