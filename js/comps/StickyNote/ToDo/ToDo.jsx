import React from 'react';
import ToDoList from './ToDoList.jsx';
import NewToDo from './NewToDo.jsx';

export default class ToDo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
        };
    }

    onAddNew = ( item ) => {
        if( item.title != '' ) {
            const items = this.state.items.slice();
            items.push( item );
            this.setState({
                items: items
            });
        }
    }

    onCheck = ( id ) => {
        const items = this.state.items.slice();
        let index;
        items.forEach((el, i) => {
            if( items[i].id === id ) {
                index = i;
            }
        });
        items[index].isChecked = !items[index].isChecked;
        this.setState({
            items: items
        })
    }

    onRemove = ( id ) => {
        const items = this.state.items.slice();
        let index;
        items.forEach((el, i) => {
            if( items[i].id === id ) {
                index = i;
            }
        });
        items.splice(index, 1);
        this.setState({
            items: items
        })
    }

    removeAll = () => {
        const items = this.state.items.filter( el => {
            return el.isChecked === false;
        });
        this.setState({
            items : items
        });
    }

    render(){
        return <div>
            <ToDoList
                items = { this.state.items }
                onCheck = { this.onCheck }
                onRemove = { this.onRemove }
            />
        <NewToDo
                onAddNew = { this.onAddNew }
                removeAll = { this.removeAll }
            />
        </div>
    }
}
