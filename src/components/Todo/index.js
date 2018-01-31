import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/icon/style/css.js';
import 'antd/lib/button/style/index.css';
import './style.css';

export default class Todo extends Component {
    render(){
        const {todo, handleChange} = this.props;
        return (
            <div>
                {
                   // todo.done === false?
                   //  <Checkbox checked={todo.done} onChange={() => {handleChange(todo.id)}}/>
                   //  :
                   //  <Checkbox defaultChecked={true} disabled />
                    
                }
                <div className="border" >
                    <div id="checkbox">
                        <Checkbox checked={todo.done} onChange={() => {handleChange(todo.id)}}/>
                    </div>
                    <div className="border1">
                        <div className="border2">
                            <div className="todo-div">
                                <p className="todo">{todo.content}</p>
                            </div>
                                <Icon type="delete" className="delete" onClick={this.props.delete} />
                        </div>
                    </div>
                </div>
                   
            </div>
        )
    }
}
