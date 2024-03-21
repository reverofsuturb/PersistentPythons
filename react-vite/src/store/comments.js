const GET_ALL_COMMENTS = "comments/getAllComments";
const POST_COMMENT = "comments/postComment";
// const EDIT_COMMENT = "comments/editComment";
const DELETE_COMMENT = "comments/deleteComment";

const getAllComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments,
});

const postComment = (comment) => ({
  type: POST_COMMENT,
  comment,
});

// const editComment = (comment) => ({
//   type: EDIT_COMMENT,
//   comment
// })

const deleteComment = (comment_id) => ({
  type: DELETE_COMMENT,
  comment_id,
});

export const thunkGetAllComments = (card_id) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card_id}/comments`);
  const data = await response.json();
  console.log("🚀 ~ thunkGetAllComments ~ data:", data)
  if (data.errors) {
    console.log(data.errors);
    return data;
  }
  dispatch(getAllComments(data));
};

export const thunkPostComment = (card_id, comment) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card_id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  const data = await response.json();
  if (data.errors) {
    console.log(data.errors);
    return data;
  } else {
    const comment = await dispatch(postComment(data));
    return comment;
  }
<<<<<<< HEAD
};

export const thunkDeleteComment = (card_id, comment_id) => async (dispatch) => {
  const response = await fetch(`/api/cards/${card_id}/comments/${comment_id}`, {
=======
  const newComment = await dispatch(postComment(data));
  return newComment;
};

export const thunkDeleteComment = (comment_id) => async (dispatch) => {
  const response = await fetch(`/api/cards/comments/${comment_id}`, {
>>>>>>> db95e8cdab9ae1a74467ed8b4844c184ef35cc14
    method: "DELETE",
  });
  const data = await response.json();
  if (data.errors) {
    console.log(data.errors);
    return data.errors;
  }
  await dispatch(deleteComment(data));
};

const initialState = {};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS: {
      let commentState = {};
      action.comments.Comments.forEach((comment) => {
        commentState[comment.id] = comment;
      });
      return commentState;
    }
    case POST_COMMENT: {
      return { ...state, [action.comment.id]: action.comment };
    }
    case DELETE_COMMENT: {
      let commentState = { ...state };
      delete commentState[action.comment_id];
      return commentState;
    }
    default:
      return state;
  }
};
