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
            <table>
                <thead>
                    <tr>
                        <th headers="type">Type</th>
                        <th headers="name">Name</th>
                        <th headers="main">Main</th>
                        <th headers="sub1">Sub 1</th>
                        <th headers="sub2">Sub 2</th>
                        <th headers="sub3">Sub 3</th>
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