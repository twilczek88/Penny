import React from 'react';

export default class StickyNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            textVal: ''
        };
    }

    onTextChange = ( e ) => {
        this.setState({
            textVal: e.target.values
        });

        if( typeof this.props.parseText === 'function' ) {
            this.props.parseText( e.target.value );
        } else {
            console.error( 'dupa dupa dupa' );
        }
    }

    render() {
        if( this.props.editable ) {
            return <div>
                <textarea
                    value={ this.state.textVal }
                    onChange = { this.onTextChange }
                />
            </div>
        } else {
            return <div className='note-text'>
                <p>{ this.props.text }</p>
            </div>
        }
    }
}
