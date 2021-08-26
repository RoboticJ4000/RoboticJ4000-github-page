import React from 'react';
import GearForm from './GearForm';

class SearchItem extends React.Component {
    constructor(props){
        super(props);
        this.state = SearchItem.initialState;   // State represents a piece of gear.


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.resetForm = this.resetForm.bind(this); 
    }

    static initialState = {
        type: 'blank',
        name: '',
        main: 'blank',
        sub1: 'blank',
        sub2: 'blank',
        sub3: 'blank'
    };

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        
        console.log(this.state);

        // Check if submitted values are the same as 'blank' values.
        let filterValues = Object.values(this.state);
        let initialValues = Object.values(SearchItem.initialState);
        let bool = true;

        for (let i = 0; i < initialValues.length; i++){
            bool = bool && filterValues[i] === initialValues[i];
        }

        if (bool) {
            this.props.setFilter({});
        } else {
            this.props.setFilter(this.state);
        }
    }

    resetForm(){
        this.setState(SearchItem.initialState);
    }

    render(){
        return (
            <GearForm gear={this.state}
                formTitle="Search Gear"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                submitText="Search"
                allowBlank={true}>
                <button onClick={this.resetForm}>Reset</button>
            </GearForm>
        );
    }
}

export default SearchItem;