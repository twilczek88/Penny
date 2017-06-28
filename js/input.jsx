import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './comps/Layout.jsx';

class App extends React.Component {

    componentWillMount(){

        // console.log('App zostanie zamontowany');

        let config = {
            apiKey: "AIzaSyC5ckiCce9nQQfF2z5WL3QKeSkEMG0Q6vk",
            databaseURL: "https://penny-fec88.firebaseio.com",
        };
        const app = firebase.initializeApp(config);

        let test = app.database().ref('halo');
        test.on('value', data => {
            // console.log(data.val());
        }, error => {
            console.error(`error: ${error.code}`);
        });
    }

    render () {
        return <Layout/>
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );
});
