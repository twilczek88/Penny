import React from 'react';
import Header from './Header.jsx';
import Penny from './Penny.jsx';
import StickyNote from './StickyNote/Sticker.jsx';

export default class Layout extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
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

    componentWillMount(){
        
        console.log('w will mount: ', this.state);
    }

    componentDidMount(){
        console.log('w did mount: ', this.state);
    }

    render () {
        console.log('w render: ',this.state);
        const notes = this.state.notes.slice()
        .map((el, i) => {
            return <StickyNote
                note = { el }
                id = { i }
                key = { i }
            />
        });

        return <div>
            <Header/>
            <Penny spawnNewNote={ this.spawnNewNote }/>
            { notes }
        </div>
    }
}
