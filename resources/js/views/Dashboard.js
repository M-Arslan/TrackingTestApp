require('../app');
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import '../variables'
import Dashboard from '../components/Dashboard'


//create reducer



function App() {
	return (
		<React.Fragment>
            <Dashboard/>
		</React.Fragment>
	);
}

ReactDOM.render(
	<Provider >
		<App />
	</Provider>
, document.getElementById('app'))