import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './comps/Layout.jsx';

class App extends React.Component {

    componentDidMount() {
        let posX,
            posY,
            dX = 0,
            dY = 0,
            dragging = false;

        const onScreenDragStart = e => {
            dragging = true;
            posX = e.clientX;
            posY = e.clientY;
        };

        const onScreenDrag = e => {
            if(dragging === true) {
                dX = posX - e.clientX;
                dY = posY - e.clientY;
                window.scrollBy(dX, dY);
                posX = e.clientX;
                posY = e.clientY;
            }
        };

        const onScreenDragEnd = () => {
            dragging = false;
            dX = 0;
            dY = 0;
        };

        document.addEventListener('mousedown', e => {
            if ( e.which == 2 ) {
                e.preventDefault();
                onScreenDragStart(e);
            }
        });

        document.addEventListener('mousemove', e => {
            if ( e.which == 2 ) {
                e.preventDefault();
                onScreenDrag(e);
            }
        });

        document.addEventListener('mouseup', e => {
            if ( e.which == 2 ) {
                e.preventDefault();
                onScreenDragEnd();
            }
        });
    }

    render() {
        const mobile = window.matchMedia("screen and (max-width: 640px)");

        const config = {
            apiKey: "AIzaSyC5ckiCce9nQQfF2z5WL3QKeSkEMG0Q6vk",
            databaseURL: "https://penny-fec88.firebaseio.com"
        }

        const app = firebase.initializeApp(config);
        return <Layout app={app} mobile={mobile}/>
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <App/>, document.querySelector('#app'));
});
