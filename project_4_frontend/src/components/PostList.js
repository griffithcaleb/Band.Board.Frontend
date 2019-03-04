import React, { Component } from 'react';

class PostList extends Component{
  constructor(props){
    super(props)
    this.state = {
      postList: null,
      postListLoaded: false
    }
  }

  fetchData = () => {
    fetch('http://localhost:3000/posts')
    .then((res) => {
      res.json()
      .then((data) => {
        this.setState({
          postList: data.posts,
          postListLoaded: true
        })
      },(err) => {
        console.log(err);
        })
      })
  }


  componentDidMount(){
    this.fetchData()
  }

  renderPosts(){
    return this.state.postList.map((post) => {
      return(
        <div>
          <h2>{post.title}</h2>
          <p>{post.info}</p>
        </div>
      )
    })
  }

  render(){
    return(
      <div>
      {this.state.postListLoaded? this.renderPosts():
      <p>Post are Loading....</p>}
      </div>
    )
  }

}


export default PostList;
