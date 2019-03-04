import React, {Component} from 'react';

class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name,
      email:this.props.user.email,
      locations:this.props.user.locations,
      instrument:this.props.user.instrument,
      bio:this.props.user.bio
    }
  }

  render(){
    return(
      <>

      </>
    )
  }
}


export default EditProfile
