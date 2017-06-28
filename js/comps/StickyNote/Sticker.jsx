import React from 'react';
import ToDo from './ToDo/ToDo.jsx';
import Text from './Text/Text.jsx';

export default class Sticker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            note: {
                id: this.props.id,
                editable: true,
                text: ''
            }
        };
    }

    handleEditClick = () => {
        this.setState({
            note : {
                id : this.state.note.id,
                editable : !this.state.note.editable,
                text : this.state.note.text
            }
        })
    }

    parseText = ( text ) => {
        this.setState({
            note: {
                id : this.state.note.id,
                editable: this.state.note.editable,
                text: text
            }
        })
    }

    handleDeleteClick = () => {
        console.log('delete click');
    }

    componentDidMount() {
        let draggedEl,
            onDragStart,
            onDrag,
            onDragEnd,
            grabPointY,
            grabPointX,
            createSticker;

        createSticker = function() {
            let stickerEl = null;
            barEl
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
        };

        onDragEnd = function() {
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
        const header = <div className='grab' >
        </div>;

        const footer = <div>

        </div>;

        if( this.state.note.editable ){
            return <div className='sticker'>
                { header }
                <Text
                    editable = { this.state.note.editable }
                    parseText = { this.parseText }
                />
                <div
                    className = 'button'
                    onClick = { this.handleEditClick }>
                        post!
                </div>
                { footer }
            </div>
        } else {
            return <div className='sticker'>
                { header }
                <Text
                    editable = { this.state.note.editable }
                    text = { this.state.note.text }
                />
                <div
                    className = 'button'
                    onClick = { this.handleDeleteClick }>
                        remove
                </div>
                { footer }
            </div>
        }
    }
}
