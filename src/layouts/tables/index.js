import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinanceList, resetFinanceList } from "server/actions/actions1";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table3";

function FinanceData({ title, location, amount, last_updated, comment_count }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {title}
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {location}
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>
        <VuiTypography variant="button" color="white" fontWeight="bold">
          {amount}
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date(last_updated).toLocaleString()}
        </VuiTypography>
      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>
        <VuiTypography variant="button" color="white" fontWeight="bold">
          {comment_count}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Tables() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [selectedFinance, setSelectedFinance] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [showNewCommentField, setShowNewCommentField] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const { loading, error, finances, success } = useSelector((state) => state.financeList);

  useEffect(() => {
    dispatch(getFinanceList());
    return () => {
      dispatch(resetFinanceList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (success) {
      setToastMessage("Finances loaded successfully");
      setToastSeverity("success");
      setOpenToast(true);
    }
  }, [error, success]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenDetailModal = (finance) => {
    setSelectedFinance(finance);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedFinance(null);
  };

  const handleOpenCommentModal = (finance) => {
    setSelectedFinance(finance);
    setOpenCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
    setSelectedFinance(null);
    setEditingComment(null);
    setReplyingTo(null);
    setDeleteConfirmation(null);
    setShowNewCommentField(false);
    setNewComment("");
  };

  const toggleReplies = (commentId) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  const handleReplyToComment = (comment) => {
    setReplyingTo(comment);
  };

  const handleDeleteComment = (comment) => {
    setDeleteConfirmation(comment);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    setDeleteConfirmation(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleAddNewComment = () => {
    setShowNewCommentField(true);
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitNewComment = () => {
    // Implement logic to submit the new comment here
    setShowNewCommentField(false);
    setNewComment("");
  };

  const columns = [
    { name: "title", align: "left" },
    { name: "location", align: "left" },
    { name: "amount", align: "center" },
    { name: "last_updated", align: "center" },
    { name: "comment_count", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = finances && finances?.map((row) => ({
    title: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {row.title}
      </VuiTypography>
    ),
    location: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {row.location}
      </VuiTypography>
    ),
    amount: (
      <VuiTypography variant="button" color="white" fontWeight="bold">
        {row.amount}
      </VuiTypography>
    ),
    last_updated: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {new Date(row.last_updated).toLocaleString()}
      </VuiTypography>
    ),
    comment_count: (
      <VuiTypography variant="button" color="white" fontWeight="bold">
        {row.comment_count}
      </VuiTypography>
    ),
    actions: (
      <VuiBox display="flex" justifyContent="flex-end">
        <IconButton onClick={() => handleOpenDetailModal(row)} color="secondary">
          <InfoIcon />
        </IconButton>
        <IconButton onClick={() => handleOpenCommentModal(row)} color="secondary">
          <Icon>comment</Icon>
        </IconButton>
      </VuiBox>
    ),
  }));

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Latest Public Resources Usage
              </VuiTypography>
              <VuiBox color="text" px={2}>
                <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
                  more_vert
                </Icon>
              </VuiBox>
              {renderMenu}
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Table columns={columns} rows={rows} />
              )}
            </VuiBox>
          </Card>
        </VuiBox>

        <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
          <DialogTitle>Finance Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Title:</strong> {selectedFinance?.title}
            </DialogContentText>
            <DialogContentText>
              <strong>Location:</strong> {selectedFinance?.location}
            </DialogContentText>
            <DialogContentText>
              <strong>Amount:</strong> {selectedFinance?.amount}
            </DialogContentText>
            <DialogContentText>
              <strong>Last Updated:</strong> {new Date(selectedFinance?.last_updated).toLocaleString()}
            </DialogContentText>
            <DialogContentText>
              <strong>Comment Count:</strong> {selectedFinance?.comment_count}
            </DialogContentText>
            <DialogContentText>
              <strong>Description:</strong> {selectedFinance?.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDetailModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openCommentModal} onClose={handleCloseCommentModal}>
          <DialogTitle>Comments</DialogTitle>
          <DialogContent>
            <VuiBox display="flex" alignItems="center" mb={2}>
              <IconButton size="small" onClick={handleAddNewComment}>
                <AddIcon fontSize="small" color="primary" />
              </IconButton>
              <VuiTypography variant="body2" color="textSecondary" ml={1}>
                Add New Comment
              </VuiTypography>
            </VuiBox>
            {showNewCommentField && (
              <VuiBox mb={2}>
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  value={newComment}
                  onChange={handleNewCommentChange}
                  placeholder="Type your comment here..."
                />
                <Button onClick={handleSubmitNewComment} color="primary">
                  Submit
                </Button>
              </VuiBox>
            )}
            <VuiBox position="relative" pl={2}>
              <VuiBox position="absolute" top={0} left={0} bottom={0} width="2px" bgColor="grey.300" />
              {selectedFinance?.comments.map((comment) => (
                <VuiBox key={comment.id} mb={2} pl={4}>
                  <VuiBox display="flex" alignItems="center">
                    <IconButton size="small" onClick={() => handleEditComment(comment)}>
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleReplyToComment(comment)}>
                      <ReplyIcon fontSize="small" color="secondary" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteComment(comment)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </VuiBox>
                  <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                    <VuiTypography variant="body2" color="text">
                      {editingComment?.id === comment.id ? (
                        <TextField
                          fullWidth
                          multiline
                          variant="outlined"
                          value={editingComment.content}
                          onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                        />
                      ) : (
                        comment.content
                      )}
                    </VuiTypography>
                    <VuiTypography variant="caption" color="textSecondary">
                      {new Date(comment.created_at).toLocaleString()}
                    </VuiTypography>
                  </VuiBox>
                  {comment.replies && comment.replies.length > 0 && (
                    <VuiBox mt={1}>
                      <IconButton size="small" onClick={() => toggleReplies(comment.id)}>
                        {expandedComments[comment.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      {expandedComments[comment.id] && (
                        <VuiBox ml={4}>
                          {comment.replies.map((reply) => (
                            <VuiBox key={reply.id} mb={2}>
                              <VuiBox display="flex" alignItems="center">
                                <IconButton size="small" onClick={() => handleEditComment(reply)}>
                                  <EditIcon fontSize="small" color="primary" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleReplyToComment(reply)}>
                                  <ReplyIcon fontSize="small" color="secondary" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDeleteComment(reply)}>
                                  <DeleteIcon fontSize="small" color="error" />
                                </IconButton>
                              </VuiBox>
                              <VuiBox display="flex" justifyContent="space-between" alignItems="center">
                                <VuiTypography variant="body2" color="text">
                                  {editingComment?.id === reply.id ? (
                                    <TextField
                                      fullWidth
                                      multiline
                                      variant="outlined"
                                      value={editingComment.content}
                                      onChange={(e) => setEditingComment({ ...editingComment, content: e.target.value })}
                                    />
                                  ) : (
                                    reply.content
                                  )}
                                </VuiTypography>
                                <VuiTypography variant="caption" color="textSecondary">
                                  {new Date(reply.created_at).toLocaleString()}
                                </VuiTypography>
                              </VuiBox>
                            </VuiBox>
                          ))}
                        </VuiBox>
                      )}
                    </VuiBox>
                  )}
                  <Divider />
                </VuiBox>
              ))}
            </VuiBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCommentModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={Boolean(deleteConfirmation)} onClose={handleCancelDelete}>
          <DialogTitle>Delete Comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </VuiBox>
      <Footer />
      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity={toastSeverity} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Tables;
