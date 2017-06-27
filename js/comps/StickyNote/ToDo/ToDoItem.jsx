import React from 'react';

export default class ToDoItem extends React.Component {
    constructor(props){
        super( props );
        this.state = {
            item: {
                title: this.props.item.title,
                isChecked: this.props.item.isChecked,
                id: this.props.item.id
            }
        }
    }

    handleCheckClick = ( id ) => {
        if( typeof this.props.onCheck === 'function' ) {
            this.props.onCheck( id );
        } else {
            console.error( 'bad input, no function parsed' );
        }
    }

    handleRemoveClick = ( id ) => {
        if( typeof this.props.onRemove == 'function' ){
            this.props.onRemove( id );
        } else {
            console.error('bad props! no function passed');
        }
    }

    render(){
            let style;
            if ( this.props.item.isChecked ) {
                style = {
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'purple'
                }
            } else {
                style = {
                    width: '20px',
                    height: '20px',
                    border: '1px solid purple'
                }
            }

        return <li style={{display: 'flex'}}>
            <div
                className = 'note-text'
                onClick={ e => this.handleCheckClick( this.state.item.id )}
                style={ style }/>
            <p>{ this.state.item.title }</p>
            <button onClick={ e => this.handleRemoveClick( this.state.item.id )}>
                remove
            </button>
        </li>
    }
}
