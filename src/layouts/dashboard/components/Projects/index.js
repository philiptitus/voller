import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translateText, resetTranslateText } from "server/actions/actions1";
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
  const [translatedIssues, setTranslatedIssues] = useState([]);
  const [modalTranslatedTitle, setModalTranslatedTitle] = useState(null);
  const [modalTranslatedDescription, setModalTranslatedDescription] = useState(null);
  const [tableTranslateLoading, setTableTranslateLoading] = useState(false);
  const [modalTranslateLoading, setModalTranslateLoading] = useState(false);

  const { loading: translateLoading, error: translateError, translation, success: translateSuccess } = useSelector((state) => state.translateText);

  useEffect(() => {
    if (translateError) {
      setToastMessage(translateError);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (translateSuccess && tableTranslateLoading) {
      setToastMessage("Translation successful");
      setToastSeverity("success");
      setOpenToast(true);

      // Parse the translation response for the table
      const translatedIssuesArray = translation.output.split(' ').filter(item => item.trim() !== '');
      setTranslatedIssues(translatedIssuesArray);
      setTableTranslateLoading(false);
    }
    if (translateSuccess && modalTranslateLoading) {
      setToastMessage("Translation successful");
      setToastSeverity("success");
      setOpenToast(true);

      // Parse the translation response for the modal
      const translatedText = translation.output;
      const titleMatch = translatedText.match(/1\. (.+?)(?: 2\.|$)/);
      const descriptionMatch = translatedText.match(/2\. (.+)/);

      if (titleMatch) {
        setModalTranslatedTitle(titleMatch[1].trim());
      }
      if (descriptionMatch) {
        setModalTranslatedDescription(descriptionMatch[1].trim());
      }
      setModalTranslateLoading(false);
    }
  }, [translateError, translateSuccess, translation, dispatch, tableTranslateLoading, modalTranslateLoading]);

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
    setModalTranslatedTitle(null);
    setModalTranslatedDescription(null);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedIssue(null);
    setModalTranslatedTitle(null);
    setModalTranslatedDescription(null);
  };

  const handleEnroll = () => {
    // Dummy enroll action
    setToastMessage("Enrolled successfully");
    setToastSeverity("success");
    setOpenToast(true);
    handleCloseEnrollModal();
  };

  const handleTranslateIssues = () => {
    const issuesText = issues.map((issue, index) => `${index + 1}.${issue.issue}`).join(' ');
    setTableTranslateLoading(true);
    dispatch(translateText(issuesText));
  };

  const handleTranslateDetail = () => {
    const textToTranslate = `1. ${selectedIssue.issue} 2. ${selectedIssue.description}`;
    setModalTranslateLoading(true);
    dispatch(translateText(textToTranslate));
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

  const issues = [
    {
      id: 1,
      issue: "High Unemployment Rates",
      location: "Nairobi",
      count: 1500,
      last_updated: "2023-10-01T10:00:00Z",
      description: "Unemployment rates in Nairobi have been steadily increasing due to economic downturns."
    },
    {
      id: 2,
      issue: "Food Insecurity",
      location: "Rift Valley",
      count: 2000,
      last_updated: "2023-09-25T12:00:00Z",
      description: "Food insecurity is a growing concern in the Rift Valley region due to drought and poor harvests."
    },
    {
      id: 3,
      issue: "Healthcare Access",
      location: "Coastal Region",
      count: 1200,
      last_updated: "2023-09-15T14:00:00Z",
      description: "Access to healthcare services is limited in the coastal region, affecting the overall health of the population."
    },
    {
      id: 4,
      issue: "Education Quality",
      location: "Western Kenya",
      count: 1800,
      last_updated: "2023-09-10T16:00:00Z",
      description: "The quality of education in Western Kenya is below standard, impacting the future prospects of students."
    },
    {
      id: 5,
      issue: "Water Scarcity",
      location: "Northern Kenya",
      count: 2500,
      last_updated: "2023-09-05T18:00:00Z",
      description: "Water scarcity is a major issue in Northern Kenya, affecting agriculture and daily life."
    }
  ];

  const rows = issues && issues.map((row, index) => ({
    issue: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {translatedIssues[index] ? translatedIssues[index] : row.issue}
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
            Socioeconomic Issues in Kenya
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
        <Button variant="contained" color="primary" onClick={handleTranslateIssues} disabled={tableTranslateLoading}>
          {tableTranslateLoading ? <CircularProgress size={24} /> : "Translate All Issues"}
        </Button>
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
        <Table columns={columns} rows={rows} />
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
          <Button onClick={handleEnroll} color="primary" disabled={false}>
            Enroll
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle>Issue Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Title:</strong> {modalTranslatedTitle || selectedIssue?.issue}
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
            <strong>Description:</strong> {modalTranslatedDescription || selectedIssue?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTranslateDetail} color="primary" disabled={modalTranslateLoading}>
            {modalTranslateLoading ? <CircularProgress size={24} /> : "Translate"}
          </Button>
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
