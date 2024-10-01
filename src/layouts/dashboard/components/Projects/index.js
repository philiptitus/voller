import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingIssueList, resetTrendingIssueList, enrollBasedOnTrendingIssue, resetEnrollBasedOnTrendingIssue } from "server/actions/actions1";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

function Projects() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(null);
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const { loading, error, issues, success } = useSelector((state) => state.trendingIssueList);
  const { loading: enrollLoading, error: enrollError, course, success: enrollSuccess } = useSelector((state) => state.enrollBasedOnTrendingIssue);

  useEffect(() => {
    dispatch(getTrendingIssueList());
    return () => {
      dispatch(resetTrendingIssueList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (success) {
      setToastMessage("Issues loaded successfully");
      setToastSeverity("success");
      setOpenToast(true);
    }
    if (enrollError) {
      setToastMessage(enrollError);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (enrollSuccess) {
      setToastMessage("Enrolled successfully");
      setToastSeverity("success");
      setOpenToast(true);
    }
  }, [error, success, enrollError, enrollSuccess]);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenEnrollModal = (issue) => {
    setSelectedIssue(issue);
    setOpenEnrollModal(true);
  };

  const handleCloseEnrollModal = () => {
    setOpenEnrollModal(false);
    setSelectedIssue(null);
  };

  const handleOpenDetailModal = (issue) => {
    setSelectedIssue(issue);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedIssue(null);
  };

  const handleEnroll = () => {
    dispatch(enrollBasedOnTrendingIssue(selectedIssue.id));
    handleCloseEnrollModal();
  };

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

  const columns = [
    { name: "issue", align: "left" },
    { name: "location", align: "left" },
    { name: "count", align: "center" },
    { name: "last_updated", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = issues && issues?.map((row) => ({
    issue: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {row.issue}
      </VuiTypography>
    ),
    location: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {row.location}
      </VuiTypography>
    ),
    count: (
      <VuiTypography variant="button" color="white" fontWeight="bold">
        {row.count}
      </VuiTypography>
    ),
    last_updated: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {new Date(row.last_updated).toLocaleString()}
      </VuiTypography>
    ),
    actions: (
      <VuiBox display="flex" justifyContent="flex-end">
        <IconButton onClick={() => handleOpenEnrollModal(row)} color="primary">
          <AddCircleOutlineIcon />
        </IconButton>
        <IconButton onClick={() => handleOpenDetailModal(row)} color="secondary">
          <InfoIcon />
        </IconButton>
      </VuiBox>
    ),
  }));

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Trending Issues
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>Updated</strong> every day
            </VuiTypography>
          </VuiBox>
        </VuiBox>
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

      <Dialog open={openEnrollModal} onClose={handleCloseEnrollModal}>
        <DialogTitle>Enroll in Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to enroll in the course related to the issue "{selectedIssue?.issue}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnrollModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEnroll} color="primary" disabled={enrollLoading}>
            {enrollLoading ? <CircularProgress size={24} /> : "Enroll"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle>Issue Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Title:</strong> {selectedIssue?.issue}
          </DialogContentText>
          <DialogContentText>
            <strong>Location:</strong> {selectedIssue?.location}
          </DialogContentText>
          <DialogContentText>
            <strong>Count:</strong> {selectedIssue?.count}
          </DialogContentText>
          <DialogContentText>
            <strong>Last Updated:</strong> {new Date(selectedIssue?.last_updated).toLocaleString()}
          </DialogContentText>
          <DialogContentText>
            <strong>Description:</strong> {selectedIssue?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity={toastSeverity} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Projects;
