import React from 'react';

class GearForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
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

    render(){
        function createOption(string) {
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

        const stackAb = GearForm.stackAb.map(createOption);

        let mainAb;
        if (this.state.type === 'headgear'){
            mainAb = stackAb.concat(GearForm.headgearAb.map(createOption));

        } else if (this.state.type === 'clothing'){
            mainAb = stackAb.concat(GearForm.clothingAb.map(createOption));
        
        } else {
            mainAb = stackAb.concat(GearForm.shoesAb.map(createOption));
        }

        if (this.props.allowEmptyMain){
            mainAb = mainAb.concat(GearForm.empty);
        }

        const subAb = stackAb.concat(GearForm.empty);

        return (
            <form onSubmit={(event) => this.props.handleSubmit(event)}>
                <div>
                    <h1>{this.props.formTitle}</h1>

                    <label>Type:</label>
                    <select name="type" value={this.props.gear.type} onChange={(event) => this.props.handleChange(event)}>
                        <option key="headgear" value="headgear">Headgear</option>
                        <option key="clothing" value="clothing">Clothing</option>
                        <option key="shoes" value="shoes">Shoes</option>
                    </select>
                </div>
                
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={this.props.gear.name} onChange={(event) => this.props.handleChange(event)}/>
                </div>
                
                <div>
                    <label>Main Abillity:</label>
                    <select className="Main-Ab" name="main" value={this.props.gear.main} onChange={(event) => this.props.handleChange(event)}>
                        {mainAb}
                    </select>
                </div>
                
                <div>
                    <label>Sub Abilities:</label>
                    <div className="Sub-Abilities">
                        <select className="Sub-Ab" name="sub1" value={this.props.gear.sub1} onChange={(event) => this.props.handleChange(event)}>
                            {subAb}
                        </select>

                        <select className="Sub-Ab" name="sub2" value={this.props.gear.sub2} onChange={(event) => this.props.handleChange(event)}>
                            {subAb}
                        </select>

                        <select className="Sub-Ab" name="sub3" value={this.props.gear.sub3} onChange={(event) => this.props.handleChange(event)}>
                            {subAb}
                        </select>
                    </div>
                </div>
            
                <div>
                    <input type="submit" value={this.props.submitText} />
                    {this.props.children}
                </div>
                
            </form>
        );
    }
}

export default GearForm;