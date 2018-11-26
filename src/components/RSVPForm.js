import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCurrentUser, selectCurrentUserRSVPs} from "../redux/Selectors";
import Button from './Button';
import {submitRSVP} from "../redux/Actions";
import {TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel} from "@material-ui/core";

class RSVPForm extends Component {

    constructor(props) {
        super(props);
        let rsvps = this.propsToRsvps(props);
        this.state = {rsvps};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            rsvps: this.propsToRsvps(props)
        })
    };

    propsToRsvps(props) {
        let rsvps = [];
        for (let i = 0; i < this.getRSVPCount(); i++) {
            let rsvp = props.previousRSVPs[i] || {};
            console.log(rsvp.data, props);
            rsvps.push(rsvp.data || {});
        }
        return rsvps;
    }

    getRSVPCount() {
        return 2;
    }

    handleChange(id) {
        return (key) => {
            return (e) => {
                let rsvps = Object.assign({}, this.state.rsvps);
                if (!rsvps[id]) {
                    rsvps[id] = {};
                }
                rsvps[id][key] = e.target.value;
                this.setState({rsvps}, () => console.log(this.state));
            }
        }
    }

    handleSubmit() {
        this.props.submitRSVPs(this.state.rsvps)
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-xl-8 offset-xl-2">
                    <p>
                        Please submit the below form to RSVP to our wedding
                    </p>
                    {this.renderForms()}
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </div>
            </div>
        );
    }

    renderForms() {
        let forms = [];
        for (let i = 0; i < this.getRSVPCount(); i++) {
            forms.push(this.renderForm(i));
        }
        return forms;
    }

    renderForm(id) {
        let rsvp_string = id + Object.values(this.state.rsvps[id]).toString();
        return (
            <div key={rsvp_string} className="row">

                <div className="col-md-8 right-align">
                    <TextField
                        id="outlined-name"
                        label="Name"
                        onChange={this.handleChange(id)('name')}
                        defaultValue={this.state.rsvps[id].name}
                        margin="normal"
                        type="text"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="col-md-4    ">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Diner Option</FormLabel>
                        <RadioGroup
                            aria-label="Dinner"
                            name="dinner"
                            onChange={this.handleChange(id)('dinner')}
                            value={this.state.rsvps[id].dinner}
                            row
                        >
                            <FormControlLabel value="tofu" control={<Radio/>} label="Tofu"/>
                            <FormControlLabel value="seitan" control={<Radio/>} label="Seitan"/>
                        </RadioGroup>
                    </FormControl>
                </div>


            </div>
        )
    }
}

export default connect(
    (state) => ({
        previousRSVPs: selectCurrentUserRSVPs(state),
        currentUser: selectCurrentUser(state)
    }),
    (dispatch) => ({
        submitRSVPs: (RSVPs) => dispatch(submitRSVP(RSVPs))
    })
)(RSVPForm);