import React, { useState } from 'react';
import './comment.css'; // Import the CSS file

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyText, setReplyText] = useState(''); // State to store reply text

  const handlePostComment = () => {
    const newComment = {
      id: comments.length + 1,
      text: newCommentText,
      replies: [],
      timestamp: new Date().toISOString(),
      starred: false
    };
    setComments([...comments, newComment]);
    setNewCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleReplyToComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: comment.replies.length + 1,
              text: replyText, // Use replyText from state
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return comment;
    });
    setComments(updatedComments);
    setReplyText(''); // Clear reply text after replying
  };

  const handleDeleteReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.filter(reply => reply.id !== replyId);
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleToggleStar = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, starred: !comment.starred };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const sortByLatest = () => {
    const sortedComments = [...comments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setComments(sortedComments);
  };

  const sortByMostReplies = () => {
    const sortedComments = [...comments].sort((a, b) => b.replies.length - a.replies.length);
    setComments(sortedComments);
  };

  return (
    <div>
      <div className="comment-box">
        <p className="head-text">What's on your mind?</p>
        <input 
          type="text" 
          placeholder="...Enter text" 
          className="comment-input" 
          value={newCommentText} 
          onChange={(e) => setNewCommentText(e.target.value)} 
        />
        <button className="post-button" onClick={handlePostComment}>POST</button>
      </div>
      <div className="divider"><hr /></div>
      <div className='sort-headline'>
        <div className="reply-text">Replies</div>
        <div className="sort-text">According to:</div>
        <div className="btns">
          <button onClick={sortByLatest} className='btn1'>Sort by Latest</button>
          <button onClick={sortByMostReplies} className='btn2'>Sort by Most Replies</button>
        </div>
      </div>
      
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.text}</p>
          <p>{comment.timestamp}</p> {/* Displaying timestamp */}
          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          
          {/* Star icon */}
          <span 
            className={`star-icon ${comment.starred ? 'starred' : ''}`} 
            onClick={() => handleToggleStar(comment.id)}
          >
            &#9733;
          </span>
          
          {/* Input box for reply */}
          <input 
            type="text" 
            placeholder="Reply" 
            value={replyText} 
            onChange={(e) => setReplyText(e.target.value)} 
          />
          
          {/* Reply button */}
          <button onClick={() => handleReplyToComment(comment.id)}>Reply</button>
          
          {comment.replies.map(reply => (
            <div key={reply.id} className="reply">
              <p>{reply.text}</p>
              <p>{reply.timestamp}</p> {/* Displaying timestamp */}
              <button onClick={() => handleDeleteReply(comment.id, reply.id)}>Delete Reply</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Comment;
