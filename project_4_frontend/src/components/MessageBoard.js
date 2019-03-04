import React, {Component} from 'react'
import Form from "./Form.js"

class MessageBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      currentView: "showAll",
      randomMusicChats:[],
      lookingForABand:[],
      lookingForAMusican:[],
      buyingOrSelling: []
    }
  }

  componentDidMount(){
    this.getposts()
  }

 getposts = () => {
   fetch("http://localhost:3000/posts")
   .then(data=>data.json())
   .then(json => {
     this.sortPosts(json.posts)
   })
 }
sortPosts = (posts) => {
  let random = []
  let lookingForABand = []
  let lookingForAMusician = []
  let buyingOrSelling = []
posts.forEach((post)=> {
  if (post.view === "showRandom"){
    random.push(post)
  }else if (post.view === "showLookingForBand"){
    lookingForABand.push(post)
  }else if(post.view==="showLookingForMusician"){
    lookingForAMusician.push(post)
  }else if (post.view ==="showBuyingOrSelling"){
   buyingOrSelling.push(post)
  }
})
this.setPosts(posts,random,lookingForABand,lookingForAMusician,buyingOrSelling)
}
setPosts = (posts,random,lookingForABand,lookingForAMusician,buyingOrSelling) => {
  this.setState({
  posts: posts,
  randomMusicChats: random,
  lookingForABand: lookingForABand,
  lookingForAMusican: lookingForAMusician,
  buyingOrSelling: buyingOrSelling
  })
}

  handleViews = (view) => {
    this.setState({
      currentView: view
    })
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
            {post.content}
            {post.number_of_likes}
            {post.author}
           </div>
         )
       }) : '' }
       {this.state.currentView === "showRandom" ?
        this.state.randomMusicChats.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">
           {post.content}
           {post.number_of_likes}
           {post.author}
           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForBand" ?
        this.state.lookingForABand.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">
           {post.content}
           {post.number_of_likes}
           {post.author}
           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForMusician" ?
        this.state.lookingForAMusican.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">
           {post.content}
           {post.number_of_likes}
           {post.author}
           </div>
         )
       }) : '' }
       {this.state.currentView === "showBuyingOrSelling" ?
        this.state.buyingOrSelling.map((post,index) => {
         return(
           <div key ={index} className ="singularPost">
           {post.content}
           {post.number_of_likes}
           {post.author}
           </div>
         )
       }) : '' }
       </div>
        <Form submit={this.handleSubmit} view={this.state.currentView} />
      </div>
    </div>
    )
  }
}

export default MessageBoard
