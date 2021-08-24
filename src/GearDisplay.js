import React from 'react';

class GearDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return (
            <tr>
                <td headers="type">{this.props.gear.type}</td>
                <td headers="name">{this.props.gear.name}</td>
                <td headers="main">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.main + ".png"} alt={this.props.gear.main}/>
                </td>
                <td headers="sub1">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub1 + ".png"} alt={this.props.gear.sub1}/>
                </td>
                <td headers="sub2">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub2 + ".png"} alt={this.props.gear.sub2}/>
                </td>
                <td headers="sub3">
                    <img src={process.env.PUBLIC_URL + "/ability_icons/" + this.props.gear.sub3 + ".png"} alt={this.props.gear.sub3}/>
                </td>
            </tr>
        );
    }
}

export default GearDisplay;