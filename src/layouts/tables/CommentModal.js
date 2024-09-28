import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const CommentModal = ({ open, handleClose, finance }) => {
  const [comments, setComments] = useState(finance?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  const handleAddComment = () => {
    const comment = {
      id: comments.length + 1,
      content: newComment,
      created_at: new Date().toISOString(),
      parent: null,
      replies: [],
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleEditComment = (commentId, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleReply = (commentId, replyContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: [
              ...(comment.replies || []),
              {
                id: (comment.replies || []).length + 1,
                content: replyContent,
                created_at: new Date().toISOString(),
                parent: commentId,
                replies: null,
              },
            ],
          }
        : comment
    );
    setComments(updatedComments);
  };

  if (!finance) {
    return null; // or render a loading spinner or some fallback UI
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        {comments.map((comment) => (
          <Box key={comment.id} mb={2}>
            <Box display="flex" alignItems="center">
              <Typography>{comment.content}</Typography>
              <IconButton
                size="small"
                onClick={() => setEditingComment(comment.id)}
              >
                <Edit />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <Delete />
              </IconButton>
            </Box>
            {editingComment === comment.id && (
              <TextField
                fullWidth
                value={comment.content}
                onChange={(e) =>
                  handleEditComment(comment.id, e.target.value)
                }
                onBlur={() => setEditingComment(null)}
                autoFocus
              />
            )}
            {comment.replies &&
              comment.replies.map((reply) => (
                <Box key={reply.id} ml={4} mb={1}>
                  <Typography>{reply.content}</Typography>
                </Box>
              ))}
            <TextField
              fullWidth
              placeholder="Reply"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleReply(comment.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </Box>
        ))}
        <TextField
          fullWidth
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddComment();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;
