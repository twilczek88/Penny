import React from 'react';
import ToDo from './ToDo/ToDo.jsx';
import Text from './Text/Text.jsx';

export default class Sticker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            note: this.props.note
        };
    }

    handlePostClick = () => {
        const app = this.props.app;
        const dataNotes = app.database().ref('notes')

        const push = dataNotes.push({
            id: this.state.note.id,
            editable: false,
            text: this.state.note.text,
            posX: this.state.note.posX,
            posY: this.state.note.posY
        });

        this.setState({
            note : {
                id : push.key,
                editable : false,
                text : this.state.note.text,
                posX : this.state.note.posX,
                posY : this.state.note.posY
            }
        });
    }

    parseText = ( text ) => {
        this.setState({
            note: {
                id : this.state.note.id,
                editable : this.state.note.editable,
                text : text,
                posX : this.state.note.posX,
                posY : this.state.note.posy
            }
        })
    }

    sendData = ( data ) => {
    }

    handleDeleteClick = () => {
        console.log('delete click');
    }

    updatePosition = (x, y, event) => {
        this.setState({
            note: {
                id: this.state.note.id,
                editable: this.state.note.editable,
                text: this.state.note.text,
                posX: x,
                posY: y
            }
        });

        if ( event.target.parentElement.dataset.id == this.state.note.id ) {
            const app = this.props.app;
            const note = app.database().ref(`notes/${this.state.note.id}`);
            console.log('sdaasd',this.state.note.id);
            note.update({
                "posX": x,
                "posY": y
            });
        }
    }

    componentDidMount() {
        let draggedEl,
            onDragStart,
            onDrag,
            onDragEnd,
            grabPointY,
            grabPointX,
            createSticker;

        const self = this;
        let positionX,
            positionY;

        createSticker = function() {
            let stickerEl = null;
        }

        onDragStart = function( e ) {
            let boundingClientRect;
            if ( e.target.className.indexOf('grab') === -1 ) {
                return;
            }

            draggedEl = this;
            boundingClientRect = draggedEl.getBoundingClientRect();

            grabPointY = boundingClientRect.top - e.clientY;
            grabPointX = boundingClientRect.left - e.clientX;
        };

        onDrag = function( e ) {
            if( !draggedEl ){
                return;
            }

            let posX = e.clientX + grabPointX,
                posY = e.clientY + grabPointY;

            if ( posX < 0 ) {
                posX = 0;
            }

            if ( posY < 0 ) {
                posY = 0;
            }

            draggedEl.style.transform = `translateX( ${posX}px ) translateY( ${posY}px )`;
            positionX = posX;
            positionY = posY;
        };

        onDragEnd = function( e ) {
            // console.log(e.target.parentElement.dataset.id);
            // console.log('id w evencie: ', e.target.parentElement.dataset.id, 'id w self: ', self.state.note.id);
            // if ( e.target.parentElement.dataset.id == self.state.note.id ) {
            //     self.updatePosition( positionX, positionY, e );
            // }
            self.updatePosition( positionX, positionY, e );
            draggedEl = null;
            grabPointX = null;
            grabPointY = null;

        }

        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);

        [...document.querySelectorAll('.sticker')].forEach( el => {
            el.addEventListener('mousedown', onDragStart, false);
        });
    }

    render() {

        const style = {
            transform: `translateX(${this.props.note.posX}px) translateY(${this.props.note.posY}px)`
        }

        const header = <div className='grab' >
        </div>;

        const footer = <div>
        </div>;

        if( this.state.note.editable ){
            return <div className= 'sticker'

                    style = { style }
                >
                { header }
                <Text
                    editable = { this.state.note.editable }
                    parseText = { this.parseText }
                />
                <div
                    className = 'button'
                    onClick = { this.handlePostClick }>
                        post!
                </div>
                { footer }
            </div>
        } else {
            return <div className='sticker'
                    style = { style }
                    data-id = { this.state.note.id }
                >
                { header }
                <Text
                    editable = { this.state.note.editable }
                    text = { this.state.note.text }
                />
                { footer }
            </div>
        }
    }
}
