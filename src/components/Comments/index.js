/* eslint-disable no-alert */
import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

// eslint-disable-next-line no-unused-vars
const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  // eslint-disable-next-line react/no-unused-state
  state = {nameInput: '', commentInput: '', commentsList: []}

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeTextarea = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    if (nameInput !== '' && commentInput !== '') {
      const now = new Date()
      const timeGap = formatDistanceToNow(now)
      const randomBg =
        initialContainerBackgroundClassNames[
          Math.floor(
            Math.random() * initialContainerBackgroundClassNames.length,
          )
        ]
      const newComment = {
        name: nameInput,
        comment: commentInput,
        id: uuidv4,
        time: timeGap,
        isLiked: false,
        className: randomBg,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: ' ',
      }))
    } else if (nameInput === '' && commentInput === '') {
      alert('Please enter Details')
    } else if (nameInput === '') {
      alert('please enter name')
    } else if (commentInput === '') {
      alert('please enter comment')
    }
  }

  onDeleteFunction = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachList => eachList.id !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {nameInput, commentInput, commentsList} = this.state
    const count = commentsList.length
    return (
      <div className="container">
        <h1>Comments</h1>
        <form name="form" onSubmit={this.onAddComment}>
          <div className="label-img">
            <div>
              <p>Say Something about 4.0 Technologies</p>
              <br />
              <input
                placeholder="Your Name"
                id="input"
                onChange={this.onChangeName}
                value={nameInput}
              />
              <br />
              <textarea
                placeholder="Your Comment"
                className="textarea"
                onChange={this.onChangeTextarea}
                value={commentInput}
              />
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
              className="comments-img"
            />
          </div>
          <button type="submit">Add Comment</button>
        </form>
        <hr />
        <div className="comments-container">
          <p className="comments-count">{count}</p>
          <p className="comments">Comments</p>
        </div>
        <ul>
          {commentsList.map(eachComment => (
            <CommentItem
              commentsList={eachComment}
              key={eachComment.id}
              onDeleteFunction={this.onDeleteFunction}
            />
          ))}
        </ul>
      </div>
    )
  }
}
export default Comments
