// Write your code here
import {Component} from 'react'
import './index.css'

class CommentItem extends Component {
  state = {like: false}

  onClickDeleteButton = () => {
    const {commentsList, onDeleteFunction} = this.props
    const {id} = commentsList
    onDeleteFunction(id)
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({like: !prevState.like}))
  }

  render() {
    const {like} = this.state
    const {commentsList} = this.props
    const {name, comment, time, className} = commentsList
    const initialName = name.slice(0, 1)
    let image
    if (like === true) {
      image =
        'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    } else {
      image =
        'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    }
    const likeClassName = like ? 'like-txt' : 'unlike-txt'
    return (
      <div>
        <li>
          <div className="flex-row">
            <p className={className}>{initialName}</p>
            <h1 className="name">{name}</h1>
            <p className="time">{time}</p>
          </div>
          <p className="comment">{comment}</p>
          <div className="like-div">
            <div className="like-img-row">
              <button
                type="button"
                className="like-btn"
                onClick={this.onClickLikeButton}
              >
                <img src={image} alt="like" className="like" />
              </button>
              <p className={likeClassName}>Like</p>
            </div>
            <button
              type="button"
              className="dlt"
              onClick={this.onClickDeleteButton}
              data-testid="delete"
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
                alt="delete"
              />
            </button>
          </div>
        </li>
      </div>
    )
  }
}
export default CommentItem
