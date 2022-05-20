import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator';
import * as Helpers from '../Helpers'
import LoadingOverlay from 'react-loading-overlay';
import BeatLoader from 'react-spinners/BeatLoader'
import Dashboard from './Dashboard';
class Tracking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trackingCode: '',
            loading: false,
            formVisible : true
        }

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'small text-danger mdi mdi-alert'
        });
    }

    componentDidMount() {
        document.title = 'Tracking';
    }

    onChangeHandle = (e) =>{
        const { name, value } = e.target;
        this.setState({
            [name] : value
        });
    }

    onSubmitHandle = (e) =>{
        if (this.validator.allValid()) {
            this.setState({
                formVisible: false
            });
        }
        else {
            this.validator.showMessages();
        }
    }

    render() {
        if(this.state.formVisible){
        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner={<BeatLoader />}
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            opacity: '0.5',
                            filter: 'alpha(opacity=50)',
                            background: 'white'
                        })
                    }}
                >
                    <div className="auth-form-light text-left p-5 animated fadeIn">
                        <div className="brand-logo">
                            <h1 className="text-center" style={{color: '#da8cff'}}>{global.variables.site_name}</h1>
                        </div>
                        <h4>Enter Tracking Number</h4>
                        <form className="pt-3" ref={c => { this.form = c }} onSubmit={this.onSubmitHandle}>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg" name="trackingCode" id="trackingCode" placeholder="trackingCode" value={this.state.trackingCode} onChange={this.onChangeHandle}/>
                                {this.validator.message('trackingCode', this.state.trackingCode, 'required|trackingCode')}
                            </div>
                            <div className="mt-3">
                                <button type="submit" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" >
                                    Track
                                </button>
                            </div>

                        </form>
                    </div>
                    </LoadingOverlay>
            </React.Fragment> 
         )
        }else{
            return (
                <Dashboard trackingCode={this.state.trackingCode}/>
            )
        }
    }
}

export default Tracking