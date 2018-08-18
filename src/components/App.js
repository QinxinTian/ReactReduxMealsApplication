import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    //dispatch an action inside of the component;
    //we can see the new format of our calendar;
    console.log(this.props)
    return (
      <div>
        Hello World
      </div>
    )
  }
}
//map redux state to the component props
//This component is going to receive state or calendar
//whatever returned from the state will be passed into
//component as long as we pass the mapSteteToProps
//as the first argument;
function mapStateToProps (calendar) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map((day) => ({
      day,
      //return the keys of the object
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? calendar[day][meal]
          : null

        return meals
      }, {})
    })),
  }
}
//pass component then you will be able to call dispatch;
export default connect(
  mapStateToProps,
)(App)
