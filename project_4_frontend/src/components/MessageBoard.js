import React, {Component} from 'react'


class MessageBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      currentView: 'showAll',
      randomMusicChats:[],
      lookingForABand:[],
      lookingForAMusican:[],
      buyingOrSelling: []
    }
  }
  handleSubmit = () => {
    // fetch create
  }
  handleViews = (view) => {
    this.setState({
      currentView: view
    })
  }
  handleChange = (e) => {
    this.setState({[e.target.id]:e.target.value})
  }
  render(){
    return (
      <div className = 'container'>
        <nav>
          <h3 onClick={() => {
            this.handleViews('showRandom')
          }}>Random Music Chats</h3>
          <h3 onClick={() => {
            this.handleViews('showLookingForBand')
          }}>Looking for a band</h3>
          <h3 onClick={() => {
            this.handleViews('showLookingForMusician')
          }}>Looking for a musician</h3>
          <h3 onClick={() => {
            this.handleViews('showBuyingOrSelling')
          }}>Buying/Selling</h3>

        </nav>

      <div className = 'MainContent'>
      <h1> {this.state.currentView} </h1>
       <div className ='posts'>
       {this.state.currentView === "showAll" ?
        this.state.posts.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">

           </div>
         )
       }) : '' }
       {this.state.currentView === "showRandom" ?
        this.state.randomMusicChats.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">

           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForBand" ?
        this.state.lookingForABand.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">

           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForMusician" ?
        this.state.lookingForAMusican.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">

           </div>
         )
       }) : '' }
       {this.state.currentView === "showBuyingOrSelling" ?
        this.state.buyingOrSelling.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">
          
           </div>
         )
       }) : '' }
       </div>
        <div className = 'createPost'>
          <form onSubmit ={this.handleSubmit}>
          <textarea
          onChange ={this.handleChange}
          id='content'
          value = {this.state.content}
          type = 'text'
          />
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default MessageBoard
