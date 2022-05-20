import React, {  useState, useEffect } from 'react'
import Pagination from "react-js-pagination";
import { useSelector, connect } from 'react-redux';
import { fadeIn } from 'animate.css'
import 'iziToast/dist/css/iziToast.css';
import { stubFalse } from 'lodash';
const iziToast = require('iziToast');
function Dashboard(props) {

    const [state, setState] = useState({
       trackingCode: props.trackingCode,
       loading: false,
       product : [],
       show:false
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
        }
        
        loadData();
    }, []);

    const loadData = () => {
        debugger;
        axios.post('/api/findTrackingData', {
           trackingCode : state.trackingCode
        })
        .then(response => {
            debugger;
            if(response.data.status == 'success'){
               
                iziToast.show({
                    timeout: 0,
                    progressBar: false,
                    displayMode: 'once',
                    position:'topRight',
                    theme: 'light',
                    id: 'star-notification',
                    title: 'Tracking Code Found',
                    message: ''
                });
                setState({
                    ...state,
                    loading: false,
                    product: response.data.product,
                    show:true
                })

            }else{
                iziToast.show({
                    timeout: 0,
                    progressBar: false,
                    displayMode: 'once',
                    position:'topRight',
                    theme: 'error',
                    id: 'star-notification',
                    title: 'Tracking Code not Found',
                    message: ''
                });
                setState({
                    ...state,
                    loading: false,
                    product: response.data.product,
                    show: false
                })

            }
            
            
        })
        .catch((error) => {
            setState({
                ...state,
                loading: false
            });
            console.log(error);
        });
    };

    
    if(!state.loading){
    return (
        <React.Fragment>
            <div className="page-header">
				<h3 className="page-title">
					<span className="page-title-icon bg-gradient-primary text-white mr-2">
						<i className="mdi mdi-home"></i>
					</span>
                    <div className="auth-form-light text-left p-5 animated fadeIn">
                        <div className="brand-logo">
                            <h1 className="text-center" style={{color: '#da8cff'}}>{global.variables.site_name}</h1>
                        </div>
                         {state.show ? (
                            <>
                             <span>Tracking Code : {state.product.code}</span><br/>
                             <span>Product Name : {state.product.product}</span><br/>
                             <span>Delivery Date : {state.product.date}</span><br/>
                            </>
                         ) : (<span> Tracking Code not found</span>)}
                         
                    </div>
				</h3>
			</div>
        </React.Fragment>
    );
}

else{
    return <></>
}
}



//redux state can be accessed as props in this component(Optional)

export default Dashboard;