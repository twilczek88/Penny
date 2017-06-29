import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './comps/Layout.jsx';

class App extends React.Component {

    render() {
        let pennyStyle;
        const mobile = window.matchMedia("screen and (max-width: 640px)");
        if (mobile.matches) {
            pennyStyle = {
                position: 'static',
                float: 'right'
            };
        } else {
            pennyStyle = {
                top: `${Math.floor((Math.random() * 90))}vh`,
                left: `${Math.floor((Math.random() * 90))}vw`
            };
        }

        const config = {
            apiKey: "AIzaSyC5ckiCce9nQQfF2z5WL3QKeSkEMG0Q6vk",
            databaseURL: "https://penny-fec88.firebaseio.com"
        }

        const app = firebase.initializeApp(config);
        return <Layout app={app} mobile={mobile} pennyStyle={pennyStyle}/>
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>, document.querySelector('#app'));
});
