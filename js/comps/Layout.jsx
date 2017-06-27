import React from 'react';
import Header from './Header.jsx';
import Penny from './Penny.jsx';
import StickyNote from './StickyNote/Sticker.jsx';

export default class Layout extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            newNote: {

            },
            notes: []
        }
    }

    spawnNewNote = () => {
        const notes = this.state.notes.slice();
        notes.push( this.newNote );
        this.setState({
            notes: notes
        })
    }

    render () {
        const notes = this.state.notes.slice()
        .map(el => {
            return <StickyNote note = { el } />
        });

        return <div>
            <Header/>
            <Penny spawnNewNote={ this.spawnNewNote }/>
            { notes }
        </div>
    }
}
