# ReactReduxMealsApplication


Notes updated:
8/18/2018

Provider, currying and connect:


connect(mapStateToProps, mapDispatchToProps)(MyComponent)
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
