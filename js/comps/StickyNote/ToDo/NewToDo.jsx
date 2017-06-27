import React from 'react';

export default class NewToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item: {
                title: '',
                isChecked: false,
                id: 0
            }
        }
    }

    handleAddClick = ( item ) => {
        if( typeof this.props.onAddNew === 'function' ) {
            this.props.onAddNew( item );
            const id = this.state.item.id + 1;
            this.setState({
                item : {
                    title: '',
                    isChecked: this.state.item.isChecked,
                    id : id
                }
            });
        } else {
            console.error('not a function');
        }
    }

    handleRemoveAllDoneClick = () => {
        if( typeof this.props.removeAll === 'function' ){
            this.props.removeAll();
        } else {
            console.error('expected a function');
        }
    }

    handleInputChange = ( e ) => {
        this.setState({
            item: {
                title: e.target.value,
                isChecked: false,
                id: this.state.item.id
            }
        });
    }

    render(){
        return <div>
            <input
                type = 'text'
                value = { this.state.item.title }
                onChange = { this.handleInputChange }
            />
            <button
                onClick = { e => this.handleAddClick( this.state.item )}>
                Add
            </button>
            <button
                onClick = { this.handleRemoveAllDoneClick }>
                remove all completed
            </button>
        </div>
    }
}
