import React from 'react';

class GearForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    static type = [
        'Headgear',
        'Clothing',
        'Shoes'
    ];

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
        'Ink Resistance Up',
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

    static empty = <option key="empty" value="empty">Empty</option>;
    static blank = <option key="blank" value="blank"/>

    render(){
        function createOption(string) {     // May need to edit how options for dropdown lists are created. Let capitals exist?
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

        let stackAb = GearForm.stackAb.map(createOption);

        let type = GearForm.type.map(createOption);

        let mainAb;
        if (this.props.gear.type === 'headgear'){
            mainAb = stackAb.concat(GearForm.headgearAb.map(createOption));

        } else if (this.props.gear.type === 'clothing'){
            mainAb = stackAb.concat(GearForm.clothingAb.map(createOption));
        
        } else {
            mainAb = stackAb.concat(GearForm.shoesAb.map(createOption));
        }

        stackAb.push(GearForm.empty);

        if (this.props.allowBlank){
            mainAb.push(GearForm.blank);
            stackAb.push(GearForm.blank);
            type.push(GearForm.blank);
        }        

        return (
            <form className="Form" onSubmit={(event) => this.props.handleSubmit(event)}>
                <h1>{this.props.formTitle}</h1>
                
                <div className="Form-input">
                    <label>Type:</label>
                    <select name="type" value={this.props.gear.type} onChange={(event) => this.props.handleChange(event)}>
                        {type}
                    </select>
                </div>
                
                <div className="Form-input">
                    <label>Name:</label>
                    <input type="text" name="name" value={this.props.gear.name} onChange={(event) => this.props.handleChange(event)}/>
                </div>
                
                <div className="Form-input">
                    <label>Main Abillity:</label>
                    <select className="Main-Ab" name="main" value={this.props.gear.main} onChange={(event) => this.props.handleChange(event)}>
                        {mainAb}
                    </select>
                </div>
                
                <div className="Form-input">
                    <label>Sub Abilities:</label>
                    <div className="Sub-abilities">
                        <select className="Sub-ab" name="sub1" value={this.props.gear.sub1} onChange={(event) => this.props.handleChange(event)}>
                            {stackAb}
                        </select>

                        <select className="Sub-ab" name="sub2" value={this.props.gear.sub2} onChange={(event) => this.props.handleChange(event)}>
                            {stackAb}
                        </select>

                        <select className="Sub-ab" name="sub3" value={this.props.gear.sub3} onChange={(event) => this.props.handleChange(event)}>
                            {stackAb}
                        </select>
                    </div>
                </div>
            
                <div className="Form-submit">
                    <input type="submit" value={this.props.submitText} />
                    {this.props.children}
                </div>
                
            </form>
        );
    }
}

export default GearForm;