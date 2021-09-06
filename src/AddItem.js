import React from 'react';
import GearForm from './GearForm.js';

class AddItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: 'headgear',
            name: '',
            main: 'inkSaverMain',
            sub1: 'empty',
            sub2: 'empty',
            sub3: 'empty'
        };      // State represents a piece of gear.


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleChange(event) {
        if (event.target.name === 'name') {
            this.setState({
                name: event.target.value.toUpperCase()      // Keep text as uppercase.
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.name) {
            this.props.addGear(this.state);

        } else {
            window.alert("Gear has no name.\nAll gear must have a name.\nNo gear was added to the database.")
        }
    }

    render(){
        return( 
            <GearForm gear={this.state} 
                formTitle="Add Gear"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                submitText="Add"
            />
        );
    }
}

export default AddItem;