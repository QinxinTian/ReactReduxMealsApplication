import React, { Component } from 'react'
import { addRecipe } from '../actions'

class App extends Component {
  state = {
    calendar: null
  }
  componentDidMount () {
    //3, grab the store from props
    const { store } = this.props
    store.subscribe(() => {
      //4, subscribe to the changes
      //get the state out of the store
      //then put into the local component state;
      //That will cause the re-render the Monday's breakfast;
      this.setState(() => ({
        calendar: store.getState()
      }))
    })
  }
  //5, create submit food method;
  //invoke the addRecipe action creator;
  //Remember to import it;
  submitFood = () => {
    //refer to the addRecipe;
    //go to the reducer and update the store;
    //It can also be replaced by using react-redux library;
    this.props.store.dispatch(addRecipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.input.value
      },
    }))

    this.input.value = ''
  }
  render() {
    return (
      //2, input field;
      <div>
        <input
          type='text'
          ref={(input) => this.input = input}
          placeholder="Monday's Breakfast"
        />
        <button onClick={this.submitFood}>Submit</button>

        <pre>
          Monday's Breakfast: {this.state.calendar && this.state.calendar.monday.breakfast}
        </pre>
      </div>
    )
  }
}

export default App
