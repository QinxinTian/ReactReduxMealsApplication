# ReactReduxMealsApplication

# Notes ordered by different day are listed below this commit section on this page.
# Project description is on the bottom.

# Commits:
8/19
- Edamam API and combine altogether.
- Calendar grid.
- Combine Reducers.

8/18
- Map redux state to the component props, store subscribe.
- Provider, currying and connect
- Switch action type.
- Utilizing the store, reducer, action altogether.

8/16
- Create actions, create reducers, create a redux store, with a lot of comments in details.


Notes updated:
8/20/2018 00:43AM
A user clicks the button in the component to render an index page, this component calls a thunk action creator that returns a function, the orders should be:
API request occurs.
API request is resolved.
Thunk middleware invokes the function with dispatch();
Action is dispatched.


Organizing by types,
and organizing by features.


Applying middleware such as thunk helps solve the issue of asynchronous data flow. Thunk allows us to write action creators that return functions (rather than objects). The thunk can then be used to delay an action dispatch, or to dispatch only if a certain condition is met (e.g., a request is resolved).

Notes updated:
8/19/2018 5:18AM
# middleware:
thunk middleware can support asynchronous flow.
asynchronous flow - interraction with the server.
# reusability;
# predictability;

# thunk action creators - dispatch functions or promises.
In order to change the store’s state, an action describing that change must be dispatched to the reducer. In turn, the reducer returns the new state.
Middlware: An third party extension point between dispatching an action, and the moment it reaches the reducer.

Once middleware receives the action, it can then carry out a number of operations, including:
Producing a side effect
Processing the action on its own (e.g., making an asynchronous HTTP request)
Redirecting the action (e.g., to another piece of middleware)
Running some code during the dispatch
Dispatching supplementary actions.
Redux is a “predictable state container” for web applications

# The logger middleware: printing the store’s state before and after the reducer processes the action.

# redux thunk
We’re building a web app that stores a user’s to-do items. After the user logs in, the app needs to fetch all of the user’s to-dos from a database. Since Redux only supports the synchronous flow of data, we can use thunk middleware to asynchronously produce the HTTP request for this fetch action
Make sure our store is ready to receive middleware:

// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const store = () => createStore(rootReducer, applyMiddleware(thunk));

export default store;


//http request, util/todos_api_util.js
export const fetchTodos = () => fetch('/api/todos');

Since thunk middleware allows us to write asynchronous action creators that return functions rather than objects, our new action creator can now look like:

// actions/todo_actions.js

import * as TodoAPIUtil from '../util/todo_api_util';

export const RECEIVE_TODOS = "RECEIVE_TODOS";

export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
});

export const fetchTodos = () => dispatch => (
  TodoAPIUtil
      .fetchTodos()
      .then(todos => dispatch(receiveTodos(todos)))
);

receiveTodos() is an action creator that returns an object, with a type key of RECEIVE_TODOS along with the todos payload.
fetchTodos() on the other hand, allows us to return a function. Here, we first make the HTTP request from TodoAPIUtil by setting up a Promise, the action to receive all to-do items is dispatched only when the original request is resolved.



# Notes updated:
8/18/2018

-----------------Provider, currying and connect:--------------------------


-------connect(mapStateToProps, mapDispatchToProps)(MyComponent)----------
As a preview, MyComponent is the component you want to receive store state, dispatch, or both. mapStateToProps is a function that receives the current store, current props, and what it returns will be available to MyComponent is props. mapDispatchToProps allows you wrap action creators inside of dispatch. Let's take a closer look at each of them!

In other words: the properties of the object returned from mapStateToProps() will be passed to the component as props! You can think of mapSateToProps() is just a function that lets connect() know how to map specific parts of the store’s state into usable props.

import { connect } from 'react-redux';

const User = ({ name, age }) => {
  // ...
};
//optional ownprops
const mapStateToProps = (state, props) => ({
  name: state.user.name,
  age: state.user.age
});



export default connect(mapStateToProps)(User);
In the above example, both name and age will be available as props for the User component to access.
A great place to use ownprops is when filtering some data. Let's say we want to build a component MyPhotos that, upon login, renders an index of all the user's photos. The logged-in user is stored in another location in the application, and is passed down to the MyPhotos component as a prop. We can then leverage ownPros to access and display only what we need:
const mapStateToProps = (state, ownProps) => ({
  photos: state.photos.filter(photo => photo.user === ownProps.user)
});

export default connect(mapStateToProps)(MyPhotos);

--------MapDispatchToProps------------------
import React, { Component } from 'react';
import {connect } from 'react-redux';
import {updateName } from './actions';
class User extends component {
  state = { name: '' }
  handleUpdateUser = () => {
  this.props.dispatch(updateName(this.state.name))
  }
  render(){
  //...
  }
  }
  export default connect()(User);
  
  ---bind dispatch to your action creators before they ever reach your component-------------
  import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from './actions';

class User extends Component {
  state = { name: '' }
  handleUpdateUser = () => {
    this.props.boundUpdateName(this.state.name)
  }
  render () {
    // ...
  }
}

const mapDispatchToProps = dispatch => ({
  boundUpdateName: (name) => dispatch(updateName(name))
});

export default connect(null, mapDispatchToProps)(User);

connect() connect store and component;


How does MyComponent access state?
A container component connects the store to MyComponent, giving MyComponent slices of state accessible via props.
