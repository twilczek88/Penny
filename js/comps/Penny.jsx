import React from 'react';

export default class Penny extends React.Component {

    onPennyClick = (e) => {
        if (typeof this.props.spawnNewNote === 'function') {
            this.props.spawnNewNote(e);
        } else {
            console.error('no function parsed');
        }
    }

    render() {
        return <div className='penny' onClick={this.onPennyClick}>
            <p>&#65504;</p>
        </div>
    }
}
