import React from 'react';

class ImportFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        if (event.target.files.length > 0) {
            this.setState({
                file: event.target.files[0]     // Does this work? Should be the File object in theory.
            });
        } else {
            this.setState({
                file: null
            });
        }
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.state.file) {
            this.props.importFile(this.state.file);
        } else {
            window.alert("No file selected. No database was imported.");
        }
    }

    render() {
        return (
            <form className="Form" onSubmit={(event) => this.onSubmit(event)}>
                <h1>File IO</h1>
                <div className="Form-input">
                    <label>Select file:</label>
                    <input type="file" accept=".json"
                        onChange={(event) => this.onChange(event)}/>
                </div>

                <div className="Form-submit">
                    <input type="submit" value="Import"/>
                    {this.props.children}
                </div>
            </form>
        );
    }
}

export default ImportFile;