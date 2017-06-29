import React from 'react';
import ToDo from './ToDo/ToDo.jsx';
import Text from './Text/Text.jsx';

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: this.props.note
        };
    }

    handlePostClick = (e) => {
        if ( !e.target.value == true ) {
            const app = this.props.app;
            const dataNotes = app.database().ref('notes');

            const push = dataNotes.push({id: this.state.note.id, editable: false, text: this.state.note.text, posX: this.state.note.posX, posY: this.state.note.posY});

            this.setState({
                note: {
                    id: push.key,
                    editable: false,
                    text: this.state.note.text,
                    posX: this.state.note.posX,
                    posY: this.state.note.posY
                }
            });
        } else {
            console.log('dupa');
        }
    }

    parseText = (text) => {
        this.setState({
            note: {
                id: this.state.note.id,
                editable: this.state.note.editable,
                text: text,
                posX: this.state.note.posX,
                posY: this.state.note.posy
            }
        })
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

        if (event.target.parentElement.dataset.id == this.state.note.id) {
            event.target.parentElement.zIndex = this.props.zindex + 1;
            console.log("zindex", event.target.parentElement.zIndex);
            console.log(event.target.parentElement.zIndex);
            const app = this.props.app;
            const note = app.database().ref(`notes/${this.state.note.id}`);
            note.update({"posX": x, "posY": y});
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

        onDragStart = function(e) {
            let boundingClientRect;
            if (e.target.className.indexOf('grab') === -1) {
                return;
            }

            draggedEl = this;
            boundingClientRect = draggedEl.getBoundingClientRect();

            grabPointY = boundingClientRect.top - e.clientY;
            grabPointX = boundingClientRect.left - e.clientX;
        };

        onDrag = function(e) {
            if (!draggedEl) {
                return;
            }

            let posX = e.clientX + grabPointX,
                posY = e.clientY + grabPointY;

            if (posX < 0) {
                posX = 0;
            }

            if (posY < 0) {
                posY = 0;
            }

            draggedEl.style.transform = `translateX( ${posX}px ) translateY( ${posY}px )`;
            positionX = posX;
            positionY = posY;
        };

        onDragEnd = function(e) {
            self.updatePosition(positionX, positionY, e);
            // console.log(draggedEl);
            draggedEl = null;
            grabPointX = null;
            grabPointY = null;

        }

        document.addEventListener('mousemove', onDrag, false);
        document.addEventListener('mouseup', onDragEnd, false);

        [...document.querySelectorAll('.sticker')].forEach(el => {
            el.addEventListener('mousedown', onDragStart, false);
        });
    }

    render() {

        const style = {
            transform: `translateX(${this.props.note.posX}px) translateY(${this.props.note.posY}px)`,
            zIndex: `${1 + this.props.iterator}`
        }

        const header = <div className='grab'></div>;

        const footer = <div></div>;

        if (this.state.note.editable) {
            return <div className='sticker' style={style}>
                {header}
                <Text editable={this.state.note.editable} parseText={this.parseText}/>
                <div className='button' onClick={this.handlePostClick}>
                    post!
                </div>
                {footer}
            </div>
        } else {
            return <div className='sticker' style={style} data-id={this.state.note.id}>
                {header}
                <Text editable={this.state.note.editable} text={this.state.note.text}/> {footer}
            </div>
        }
    }
}
