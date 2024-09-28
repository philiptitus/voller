import { useState } from "react";

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
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table2";

function Predictions() {
  const [menu, setMenu] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleOpenDetailModal = (prediction) => {
    setSelectedPrediction(prediction);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedPrediction(null);
  };

  const fakeRows = [
    {
      title: "Prediction 1",
      location: "Mombasa",
      predicted_at: "2024-09-28T14:43:05.183328Z",
      count: 1,
      type: "human_rights",
      description: "This is prediction 1",
    },
    {
      title: "Prediction 2",
      location: "Nairobi",
      predicted_at: "2024-09-27T14:43:05.183328Z",
      count: 2,
      type: "environmental",
      description: "This is prediction 2",
    },
    {
      title: "Prediction 3",
      location: "Kisumu",
      predicted_at: "2024-09-26T14:43:05.183328Z",
      count: 3,
      type: "economic",
      description: "This is prediction 3",
    },
    {
      title: "Prediction 4",
      location: "Nakuru",
      predicted_at: "2024-09-25T14:43:05.183328Z",
      count: 4,
      type: "social",
      description: "This is prediction 4",
    },
    {
      title: "Prediction 5",
      location: "Eldoret",
      predicted_at: "2024-09-24T14:43:05.183328Z",
      count: 5,
      type: "political",
      description: "This is prediction 5",
    },
  ];

  const columns = [
    { name: "title", align: "left" },
    { name: "location", align: "left" },
    { name: "predicted_at", align: "center" },
    { name: "count", align: "center" },
    { name: "type", align: "left" },
    { name: "actions", align: "center" },
  ];

  const rows = fakeRows.map((row) => ({
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
    predicted_at: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {new Date(row.predicted_at).toLocaleString()}
      </VuiTypography>
    ),
    count: (
      <VuiTypography variant="button" color="white" fontWeight="bold">
        {row.count}
      </VuiTypography>
    ),
    type: (
      <VuiTypography variant="button" color="white" fontWeight="medium">
        {row.type}
      </VuiTypography>
    ),
    actions: (
      <VuiBox display="flex" justifyContent="flex-end">
        <IconButton onClick={() => handleOpenDetailModal(row)} color="secondary">
          <InfoIcon />
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
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Predictions
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

      <Dialog open={openDetailModal} onClose={handleCloseDetailModal}>
        <DialogTitle>Prediction Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Title:</strong> {selectedPrediction?.title}
          </DialogContentText>
          <DialogContentText>
            <strong>Location:</strong> {selectedPrediction?.location}
          </DialogContentText>
          <DialogContentText>
            <strong>Predicted At:</strong> {new Date(selectedPrediction?.predicted_at).toLocaleString()}
          </DialogContentText>
          <DialogContentText>
            <strong>Count:</strong> {selectedPrediction?.count}
          </DialogContentText>
          <DialogContentText>
            <strong>Type:</strong> {selectedPrediction?.type}
          </DialogContentText>
          <DialogContentText>
            <strong>Description:</strong> {selectedPrediction?.description}
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

export default Predictions;
