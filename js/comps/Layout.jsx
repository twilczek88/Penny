import React from 'react';
import Header from './Header.jsx';
import Penny from './Penny.jsx';
import Sticker from './StickyNote/Sticker.jsx';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newNote: {
                id: 0,
                editable: true,
                text: '',
                posX: 0,
                posY: 0
            },
            notes: []
        }
    }

    spawnNewNote = (e) => {
        const notes = this.state.notes.slice();
        const newNote = this.state.newNote;
        newNote.id = '';
        notes.push(newNote);
        this.setState({notes: notes});
    }

    componentWillMount() {
        // let note;
        const notes = [];
        const app = this.props.app;
        const dataNotes = app.database().ref('notes');

        dataNotes.once("value").then(data => {
            const d = data.val();
            for (let val in d) {
                d[val].id = val;
                notes.push(d[val]);
            }

            this.setState({notes: notes});
        }, error => {
            console.error(`error: ${error.code}`);
        });
    }

    componentDidMount() {}

    render() {
        const notes = this.state.notes.slice().map((el, i) => {
            return <Sticker mobile={this.props.mobile} app={this.props.app} note={el} key={i}/>
        });

        return <div className='wrapper'>
            <Penny spawnNewNote={this.spawnNewNote} pennyStyle={this.props.pennyStyle}/>
            <Header mobile={this.props.mobile}/>
            {notes}
        </div>
    }
}
