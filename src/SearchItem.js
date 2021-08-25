import React from 'react';
import GearForm from './GearForm';

class SearchItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: 'headgear',
            name: '',
            main: 'empty',
            sub1: 'empty',
            sub2: 'empty',
            sub3: 'empty'
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.resetForm = this.resetForm.bind(this); 
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        
    }

    resetForm(){
        this.setState({
            type: 'headgear',
            name: '',
            main: 'empty',
            sub1: 'empty',
            sub2: 'empty',
            sub3: 'empty'
        });
    }

    render(){
        return (
            <GearForm gear={this.state}
                formTitle="Search Gear"
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                submitText="Search"
                allowEmptyMain={true}>
                <button onClick={this.resetForm}>Reset</button>
            </GearForm>
        );
    }
}

export default SearchItem;