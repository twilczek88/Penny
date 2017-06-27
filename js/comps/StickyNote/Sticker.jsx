import React from 'react';
import ToDo from './ToDo/ToDo.jsx';
import Text from './Text/Text.jsx';

export default class Sticker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editable: true,
            text: ''
        };
    }

    handleEditClick = () => {
        this.setState({
            editable: !this.state.editable
        })
    }

    parseText = ( text ) => {
        this.setState({
            text: text
        })
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
            if ( e.target.className.indexOf('bar') === -1 ) {
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
        const header = <div className='bar'>

        </div>;

        const footer = <div>

        </div>;

        if( this.state.editable ){
            return <div className='sticker'>
                { header }
                <Text
                    editable = { this.state.editable }
                    parseText = { this.parseText }
                />
                <button onClick = { this.handleEditClick }>
                    post!
                </button>
                { footer }
            </div>
        } else {
            return <div className='sticker'>
                { header }
                <Text
                    editable = { this.state.editable }
                    text = { this.state.text }
                />
                { footer }
            </div>
        }
    }
}
