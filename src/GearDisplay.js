import React from 'react';

class GearDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.selectGear(this.props.gear.name);
    };

    render(){
        const selected = {
            color: 'red'
        };

        const notSelected = {
            color: 'black'
        };

        return (
            <tr className="Gear-display" style={this.props.selected ? selected : notSelected} onClick={this.onClick}>
                <td className="Type-cell" headers="type">{this.props.gear.type}</td>

                <td className="Name-cell" headers="name">{this.props.gear.name}</td>

                <td className="Ability-cell" headers="main">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.main + ".png"} alt={this.props.gear.main}/>
                </td>

                <td className="Ability-cell" headers="sub1">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub1 + ".png"} alt={this.props.gear.sub1}/>
                </td>

                <td className="Ability-cell" headers="sub2">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub2 + ".png"} alt={this.props.gear.sub2}/>
                </td>

                <td className="Ability-cell" headers="sub3">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub3 + ".png"} alt={this.props.gear.sub3}/>
                </td>
            </tr>
        );
    }
}

export default GearDisplay;