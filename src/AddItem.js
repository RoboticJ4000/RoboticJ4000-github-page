import React from 'react';

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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static stackAb = [
        'Ink Saver (Main)',         
        'Ink Saver (Sub)',
        'Ink Recovery Up',
        'Run Speed Up',
        'Swim Speed Up',
        'Special Charge Up',
        'Special Saver',
        'Special Power Up',
        'Quick Respawn',
        'Quick Super Jump',
        'Sub Power Up',
        'Ink Resistance',
        'Bomb Defense Up DX',
        'Main Power Up'
    ];

    static headgearAb = [
        'Opening Gambit',
        'Last Ditch Effort',
        'Tenacity',
        'Comeback'
    ];

    static clothingAb = [
        'Ninja Squid',
        'Haunt',
        'Thermal Ink',
        'Respawn Punisher',
        'Ability Doubler'
    ];

    static shoesAb = [
        'Stealth Jump',
        'Object Shredder',
        'Drop Roller'
    ];

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted");
    }

    createOption(string) {
        const fixed = string.charAt(0).toLowerCase().concat(string.substring(1));
        
        let shortened = '';
        const alphaRegex = new RegExp('[a-zA-Z]');

        for (let char of fixed){
            if (alphaRegex.test(char)){
                shortened += char;
            }
        }

        return (
            <option key={shortened} value={shortened}>{string}</option>
        );
    }

    render(){
        const stackAb = AddItem.stackAb.map(this.createOption);

        let mainAb;
        if (this.state.type === 'headgear'){
            mainAb = stackAb.concat(AddItem.headgearAb.map(this.createOption));

        } else if (this.state.type === 'clothing'){
            mainAb = stackAb.concat(AddItem.clothingAb.map(this.createOption));
        
        } else {
            mainAb = stackAb.concat(AddItem.shoesAb.map(this.createOption));
        }

        const subAb = stackAb.concat(<option key="empty" value="empty">Empty</option>);


        /*
         * Form:
         *      Type
         *      Name
         *      Main
         *      Sub
         *      1  2  3
         */
        return (this.props.isShown &&
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>Add Gear</h1>

                    <label>Type:</label>
                    <select name="type" value={this.state.type} onChange={this.handleChange}>
                        <option key="headgear" value="headgear">Headgear</option>
                        <option key="clothing" value="clothing">Clothing</option>
                        <option key="shoes" value="shoes">Shoes</option>
                    </select>
                </div>
                
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
                
                <div>
                    <label>Main Abillity:</label>
                    <select className="Main-Ab" name="main" value={this.state.main} onChange={this.handleChange}>
                        {mainAb}
                    </select>
                </div>
                
                <div>
                    <label>Sub Abilities:</label>
                    <div className="Sub-Abilities">
                        <select className="Sub-Ab" name="sub1" value={this.state.sub1} onChange={this.handleChange}>
                            {subAb}
                        </select>

                        <select className="Sub-Ab" name="sub2" value={this.state.sub2} onChange={this.handleChange}>
                            {subAb}
                        </select>

                        <select className="Sub-Ab" name="sub3" value={this.state.sub3} onChange={this.handleChange}>
                            {subAb}
                        </select>
                    </div>
                </div>
            
                <div>
                    <input type="submit" value="Add"/>
                </div>
                
            </form>
        );
    }
}

export default AddItem;