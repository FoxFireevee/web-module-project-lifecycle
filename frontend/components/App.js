import React from 'react'
import axios from 'axios'
import TodoList from './TodoList'

const fetchURL = () => {
  return axios.get('http://localhost:9000/api/todos').then(res => res).catch(err => console.err(err))
}

let id = 0;
const getID = () => id++;


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    }
  }
  componentDidMount() {
    fetchURL(this.state.todos).then(res => {
      console.log('Component has mounted')
      this.setState({...this.state, todos: res.data.data})
    }).catch(err => console.err(err))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update')
    if(prevState.todos !== this.state.todos) {
      console.log('The state has changed!')
    }

  }

  add = (name) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.concat({ id: getID(), completed: false, name })
    })
  }

  onClick = (itemId) => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map(todo => {
        console.log(todo)
        if(itemId === todo.id) return {...todo, completed: !todo.completed}
        return todo
      })
    })
  }

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos} add={this.add} onClick={this.onClick}/>
      </div>
    )
  }
}
