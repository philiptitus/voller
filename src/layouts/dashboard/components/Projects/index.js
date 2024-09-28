import { useState } from "react";

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
  const [menu, setMenu] = useState(null);
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

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
    // Logic to enroll in the course
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

  const fakeRows = [
    {
      issue: "Drought",
      location: "Kilifi",
      count: 1,
      last_updated: "2024-09-28T14:43:46.265683Z",
      description: "Drought in Kilifi",
    },
    {
      issue: "Flood",
      location: "Mombasa",
      count: 2,
      last_updated: "2024-09-27T14:43:46.265683Z",
      description: "Flood in Mombasa",
    },
    {
      issue: "Earthquake",
      location: "Nairobi",
      count: 3,
      last_updated: "2024-09-26T14:43:46.265683Z",
      description: "Earthquake in Nairobi",
    },
    {
      issue: "Landslide",
      location: "Kisumu",
      count: 4,
      last_updated: "2024-09-25T14:43:46.265683Z",
      description: "Landslide in Kisumu",
    },
    {
      issue: "Wildfire",
      location: "Nakuru",
      count: 5,
      last_updated: "2024-09-24T14:43:46.265683Z",
      description: "Wildfire in Nakuru",
    },
  ];

  const columns = [
    { name: "issue", align: "left" },
    { name: "location", align: "left" },
    { name: "count", align: "center" },
    { name: "last_updated", align: "center" },
    { name: "actions", align: "center" },
  ];

  const rows = fakeRows.map((row) => ({
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
          <Button onClick={handleEnroll} color="primary">
            Enroll
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
    </Card>
  );
}

export default Projects;
