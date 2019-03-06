import React, {Component} from 'react'
import Form from "./Form.js"
import DirectMessage from "./DirectMessage.js"

class MessageBoard extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      currentView: "showAll",
      randomMusicChats:[],
      lookingForABand:[],
      lookingForAMusican:[],
      buyingOrSelling: [],
      sendTo: false
    }
  }

 updateArray = (data) => {

  if (data.post.view === "showAll"){
    this.setState(prevState=>{
      prevState.posts.push(data.post)
      return{
        posts:prevState.posts
      }
    })


  }  else if (data.post.view === "showRandom"){
      this.setState(prevState=>{
        prevState.randomMusicChats.push(data.post)
        return{
          randomMusicChats:prevState.randomMusicChats
        }
      })


    }
    else if (data.post.view === "showLookingForBand"){
      this.setState(prevState=>{
        prevState.lookingForABand.push(data.post)
        return{
          lookingForABand:prevState.lookingForABand
        }
      })


    }
    else if (data.post.view === "showLookingForMusician"){
      this.setState(prevState=>{
        prevState.lookingForAMusican.push(data.post)
        return{
          lookingForAMusican:prevState.lookingForAMusican
        }
      })
    }
    else if (data.post.view === "showBuyingOrSelling"){
      this.setState(prevState=>{
        prevState.buyingOrSelling.push(data.post)
        return{
          buyingOrSelling:prevState.buyingOrSelling
        }
      })
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

  restReplay = () => {
    this.setState((prev) => {
      for (let i = 0; i < prev.posts.length; i++) {
        prev.posts[i].id = 1
      }
      return{}

    })
  }

  messegerInfo = (index,user) => {
    this.restReplay()
    this.setState({sendTo:user})
    this.setState((prev) => {
      if(prev.posts[index].id > 0){
        prev.posts[index].id = 0
      }else{
        prev.posts[index].id = 1
      }
      return{
        // posts[index].id: prev.posts[index].id
      }
    })
  }



  render(){
    return (
      <div className = 'container'>
      <h2> Message Board </h2>
        <nav>
        <h5 onClick={() => {
          this.handleViews('showAll')
        }}>Show All</h5>
          <h5 onClick={() => {
            this.handleViews('showRandom')
          }}>Random Music Chats</h5>
          <h5 onClick={() => {
            this.handleViews('showLookingForBand')
          }}>Looking for a band</h5>
          <h5 onClick={() => {
            this.handleViews('showLookingForMusician')
          }}>Looking for a musician</h5>
          <h5 onClick={() => {
            this.handleViews('showBuyingOrSelling')
          }}>Buying/Selling</h5>

        </nav>

      <div className = 'MainContent'>
       <div className ='posts'>

       {this.state.currentView === "showAll" ?

        this.state.posts.map((post,index) => {
          const split = post.created_at.split('')
          const shorter = split.slice(0,10).join().replace(/,/g,"")


         return(
           <div key ={index} className ="singularPost">
           <div className = "primaryInfo">
           <p className ='created_at'> On: {shorter} </p>
           <p className = "author"> {post.author} posted: </p>
           <p className = "info"> {post.info} </p>
           </div>
           <div className = 'likes'>
           <p className ='number_of_likes'> Likes: {post.number_of_likes} </p>
           <p onClick={()=>this.messegerInfo(index,post.user_id)}>Reply</p>
           {this.state.posts[index].id == 0? <DirectMessage reload={this.props.reload}
             sendTo={this.state.sendTo}/>: ""}
           </div>




           </div>
         )
       }) : '' }
       {this.state.currentView === "showRandom" ?
        this.state.randomMusicChats.map((post,index) => {
          const split = post.created_at.split('')
          const shorter = split.slice(0,10).join().replace(/,/g,"")
         return(
           <div key ={index} className ="singularPost">
           <div className = "primaryInfo">
           <p className ='created_at'> On: {shorter} </p>
           <p className = "author"> {post.author} posted: </p>
           <p className = "info"> {post.info} </p>
           </div>
           <div className = 'likes'>
           <p className ='number_of_likes'> Likes: {post.number_of_likes} </p>
           </div>

           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForBand" ?
        this.state.lookingForABand.map((post,index) => {
          const split = post.created_at.split('')
          const shorter = split.slice(0,10).join().replace(/,/g,"")
         return(
           <div key ={index} className ="singularPost">
           <div className = "primaryInfo">
           <p className ='created_at'> On: {shorter} </p>
           <p className = "author"> {post.author} posted: </p>
           <p className = "info"> {post.info} </p>
           </div>
           <div className = 'likes'>
           <p className ='number_of_likes'> Likes: {post.number_of_likes} </p>
           </div>

           </div>
         )
       }) : '' }
       {this.state.currentView === "showLookingForMusician" ?
        this.state.lookingForAMusican.map((post,index) => {
          const split = post.created_at.split('')
          const shorter = split.slice(0,10).join().replace(/,/g,"")
         return(
           <div key ={index} className ="singularPost">
           <div className = "primaryInfo">
           <p className ='created_at'> On: {shorter} </p>
           <p className = "author"> {post.author} posted: </p>
           <p className = "info"> {post.info} </p>
           </div>
           <div className = 'likes'>
           <p className ='number_of_likes'> Likes: {post.number_of_likes} </p>
           </div>

           </div>
         )
       }) : '' }
       {this.state.currentView === "showBuyingOrSelling" ?
        this.state.buyingOrSelling.map((post,index) => {
          const split = post.created_at.split('')
          const shorter = split.slice(0,10).join().replace(/,/g,"")
         return(
           <div key ={index} className ="singularPost">
           <div className = "primaryInfo">
           <p className ='created_at'> On: {shorter} </p>
           <p className = "author"> {post.author} posted: </p>
           <p className = "info"> {post.info} </p>
           </div>
           <div className = 'likes'>
           <p className ='number_of_likes'> Likes: {post.number_of_likes} </p>
           </div>

           </div>
         )
       }) : '' }
       </div>
        {this.state.currentView !==
        "showAll" ?
        <Form

        updateArray = {this.updateArray}
        submit={this.handleSubmit}
        view={this.state.currentView} /> : ''}
      </div>
    </div>
    )
  }
}

export default MessageBoard
