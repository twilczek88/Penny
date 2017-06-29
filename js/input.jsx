import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './comps/Layout.jsx';

class App extends React.Component {

        // console.log('App zostanie zamontowany');
    componentWillMount() {

    }

    render () {
        const config = {
            apiKey: "AIzaSyC5ckiCce9nQQfF2z5WL3QKeSkEMG0Q6vk",
            databaseURL: "https://penny-fec88.firebaseio.com"
        }

        const app = firebase.initializeApp(config);
        console.log(app);
        return <Layout app = { app }/>
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );
});
