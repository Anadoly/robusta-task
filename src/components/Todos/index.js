import React, { Component } from 'react';
import Todo from '../Todo';
import Axios from 'axios';
import { Spin, Icon, Modal, Button, Checkbox, Input } from 'antd';
import 'antd/lib/spin/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/icon/style/css.js';
import './style.css';

export default class Todos extends Component {
	constructor(){
		super();
		this.state = {
			newTodo: '',
			todos: [],
			loadingTodos: false,
			visible: false,
			currentPage: 1,
      		todosPerPage: 5
		};
		// this.handleClick = this.handleClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
	}
	componentWillMount(){
        this._fetchTodos();
    }
    showModal = () => {
    this.setState({
      visible: true
    });
 	}

   	handleCancel = (e) => {
	    this.setState({
	      visible: false
	    });
	}
	handleNextClick() {
	    this.setState({
	      currentPage: this.state.currentPage + 1
	    });
  	}
  	handlePreviousClick() {
	    this.setState({
	      currentPage: this.state.currentPage - 1
	    });
  	}
	_handleChange(id){
		var todos = this.state.todos.slice(0);
		var done;
		todos = todos.map((todo) => {
			if(todo.id === id){
				todo.done = !todo.done;
				done = todo.done		
			}

			return todo;
		});
		this.setState({todos});
		Axios.patch(`http://localhost:3001/todos/${id}`, {
            done: done
        })
	}
	_handleNewTodo(event){
		this.setState({newTodo: event.target.value});
	}
	_handleAddTodo(){
		const {newTodo, todos} = this.state;
		const addTodo = newTodo
		this.setState({
			todos: [
			{
				content: newTodo,
				done: false
			},
			...todos
			],
			newTodo: '',
			visible: false
		});
		Axios({
  			method: 'post',
 			url: 'http://localhost:3001/todos',
 			data: {
					content: newTodo,
					done: false
				  }
 			
		});
	}
	_deleteTodo(todo){
    	const newState = this.state.todos.slice(0);
    	if (newState.indexOf(todo) > -1) {
      newState.splice(newState.indexOf(todo), 1);
    	}
      	this.setState({todos: newState})
    	Axios.delete(`http://localhost:3001/todos/${todo.id}`)
	}
	_fetchTodos(){
		 this.setState({loadingTodos: true});
	       	setTimeout(() => {
            	Axios.get('http://localhost:3001/todos')
            		.then((response) => {
                		this.setState({todos: response.data, loadingTodos: false})
            		})
            		.catch(function (error) {
                		console.log(error);
            		});
    	    }, 500)
	}

	

	render()
	{
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		const { todos, currentPage, todosPerPage } = this.state;
		const indexOfLastTodo = currentPage * todosPerPage;
	    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
	    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
	    const renderTodos = currentTodos.map((todo) => {
      		 return  (
                   <Todo todo={todo} handleChange ={this._handleChange.bind(this)} delete = {this._deleteTodo.bind(this, todo)} />
					)
    	});
    	const pageNumbers = [];
    		for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      		pageNumbers.push(i);
    		}   	
		return (
            <div >	
            	<div className="Todos">
            		<div className= "add-todo">
	            		<div id="none">
		            		<Checkbox id="none" />
		            	</div>
		            	<div className="border1">
		            		<div className="border2">
	            				<div className="add-div" >
				            	<Button id="add-todo" type="primary" onClick={this.showModal}><Icon type="plus" /></Button>
						        <Modal
						          title="Add New Todo"
						          visible={this.state.visible}
						          onOk={this._handleAddTodo.bind(this)}
						          onCancel={this.handleCancel}
						        >
					                <Input type="text" placeholder="Add New Todo" value={this.state.newTodo} onChange={this._handleNewTodo.bind(this)}/>
					                {
					                	// <button onClick={this._handleAddTodo.bind(this)}><Icon type="plus" /></button>
					                }
						          
						        </Modal>
						    </div>
					    </div>
			        </div>
			     	</div>
                {
                    this.state.loadingTodos
                    ? (<div><Spin indicator={antIcon} /></div>)

                    : 	<div>
	          					{renderTodos}
					        
					     </div>
                }
                 <div className="border1">
                        <div className="border2">
                <div className="button-div">
                			{currentPage === 1
                				?<Button onClick={this.handlePreviousClick} disabled><span className="span"><Icon type="play-circle" /></span>previous</Button>
                				:<Button onClick={this.handlePreviousClick}><span className="span"><Icon type="play-circle" /></span>previous</Button>
                			}
                			{currentPage === (pageNumbers.length) 
                            ? <Button onClick={this.handleNextClick} disabled>Next<Icon type="play-circle"  /></Button>
                    		: <Button onClick={this.handleNextClick}>Next<Icon type="play-circle"  /></Button>}
                        </div>
                    </div>
                    </div>
                </div>
                <div className="border3">
                </div>
                <div className="border4">
                </div>
                <div className="border5">
                </div>
                <div className="border6">
                </div>
                
            </div>
        )
	}
}