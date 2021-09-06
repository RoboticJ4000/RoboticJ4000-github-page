import './App.css';
import React from 'react';
import GearDisplay from './GearDisplay.js';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render(){
        let gearEntries = this.props.gearArray.map((gearObj) =>
            <GearDisplay key={gearObj.name} gear={gearObj}
            selectGear={this.props.selectGear} selected={gearObj.name === this.props.gearSelected}/>);

        return (
            <table className="Display">
                <thead>
                    <tr>
                        <th className="Type-cell" headers="type">Type</th>
                        <th className="Name-cell" headers="name">Name</th>
                        <th className="Ability-cell" headers="main">Main</th>
                        <th className="Ability-cell" headers="sub1">Sub 1</th>
                        <th className="Ability-cell" headers="sub2">Sub 2</th>
                        <th className="Ability-cell" headers="sub3">Sub 3</th>
                    </tr>
                </thead>

                <tbody>
                    {gearEntries}
                </tbody>
            </table>
        );
    }
}

export default Display;