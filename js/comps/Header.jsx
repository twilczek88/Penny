import React from 'react';
import Penny from './Penny.jsx';
//className = 'clearfix'
export default class Header extends React.Component {

    render() {
        return <header >
            <Penny spawnNewNote={this.props.spawnNewNote}/>
            <div className='header'>
                <h1>a penny for Your thoughts!</h1>
                <p>grab a penny and share a note!</p>
            </div>
        </header>
    }
}
