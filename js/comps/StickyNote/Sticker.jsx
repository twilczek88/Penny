import React from 'react';
import ToDo from './ToDo/ToDo.jsx';
import Text from './Text/Text.jsx';

export default class Sticker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: {
                id: this.props.note.id,
                editable: this.props.note.editable,
                text: this.props.note.text,
                posX: this.props.note.posX,
                posY: this.props.note.posY,
                width: this.props.note.width,
                title: this.props.note.title,
                likes: this.props.note.likes,
                zindex: this.props.note.zindex
            }
        };
    }

    handlePostClick = (e) => {
        if ( this.state.note.text != '' ) {
            const app = this.props.app;
            const dataNotes = app.database().ref('notes');
            const push = dataNotes.push({
                id: this.state.note.id,
                editable: false,
                text: this.state.note.text,
                posX: this.state.note.posX,
                posY: this.state.note.posY,
                width: this.state.note.width,
                title: this.state.note.title,
                likes: this.state.note.likes,
                zindex: this.state.note.zindex
            });

            this.setState({
                note: {
                    id: push.key,
                    editable: false,
                    text: this.state.note.text,
                    posX: this.state.note.posX,
                    posY: this.state.note.posY,
                    width: this.state.note.width,
                    title: this.state.note.title,
                    likes: this.state.note.likes,
                    zindex: this.state.note.zindex
                }
            });
        } else {
            console.warn('notka nie może być pusta');
        }
    }

    parseText = ( text ) => {
        this.setState({
            note: {
                id: this.state.note.id,
                editable: this.state.note.editable,
                text: text,
                posX: this.state.note.posX,
                posY: this.state.note.posy,
                width: this.state.note.width,
                title: this.state.note.title,
                likes: this.state.note.likes,
                zindex: this.state.note.zindex
            }
        });

        //determine a note size.
        if( this.state.note.text.length <= 100 ) {
            this.setState({
                note: {
                    id: this.state.note.id,
                    editable: this.state.note.editable,
                    text: text,
                    posX: this.state.note.posX,
                    posY: this.state.note.posy,
                    width: '224px',
                    title: this.state.note.title,
                    likes: this.state.note.likes,
                    zindex: this.state.note.zindex
                }
            })
        } else if (
            this.state.note.text.length >= 180 &&
            this.state.note.text.length <= 250) {
                this.setState({
                    note: {
                        id: this.state.note.id,
                        editable: this.state.note.editable,
                        text: text,
                        posX: this.state.note.posX,
                        posY: this.state.note.posy,
                        width: '300px',
                        title: this.state.note.title,
                        likes: this.state.note.likes,
                        zindex: this.state.note.zindex
                    }
                })
        } else {
            this.setState({
                note: {
                    id: this.state.note.id,
                    editable: this.state.note.editable,
                    text: text,
                    posX: this.state.note.posX,
                    posY: this.state.note.posy,
                    width: '500px',
                    title: this.state.note.title,
                    likes: this.state.note.likes,
                    zindex: this.state.note.zindex
                }
            })
        }
    }

    updatePosition = (x, y, event) => {
        // if (!this === null) {
            this.setState({
                note: {
                    id: this.state.note.id,
                    editable: this.state.note.editable,
                    text: this.state.note.text,
                    posX: x,
                    posY: y,
                    width: this.state.note.width,
                    title: this.state.note.title,
                    likes: this.state.note.likes,
                    zindex: this.state.note.zindex
                }
            });

            if (event.target.parentElement.dataset.id == this.state.note.id) {
                const app = this.props.app;
                const note = app.database().ref(`notes/${this.state.note.id}`);
                note.update({"posX": x, "posY": y});
            }
        // }
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
            draggedEl.zIndex = self.props.zindex + 1;
            boundingClientRect = draggedEl.getBoundingClientRect();

            grabPointY = boundingClientRect.top - e.clientY;
            grabPointX = boundingClientRect.left - e.clientX;
        };

        onDrag = function(e) {
            if (!draggedEl) {
                return;
            }

            let posX = e.layerX + grabPointX,
                posY = e.layerY + grabPointY;

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
            zIndex: `${1 + this.props.iterator}`,
            width: this.state.note.width,
            height: this.state.note.height
        }

        const header = <div className='grab'/>;

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
