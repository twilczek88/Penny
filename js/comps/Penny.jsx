import React from 'react';

export default class Penny extends React.Component {

    onPennyClick = () => {
        if (typeof this.props.spawnNewNote === 'function') {
            this.props.spawnNewNote();
        } else {
            console.error('no function parsed');
        }
    }

    render() {
        return <div className='penny' style={this.props.pennyStyle} onClick={this.onPennyClick}>
            <p>&#65504;</p>
        </div>
    }
}
