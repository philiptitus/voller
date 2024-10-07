import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPredictionList, resetPredictionList } from "server/actions/actions1";
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
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table2";

function Predictions() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const { loading, error, predictions, success } = useSelector((state) => state.predictionList);

  useEffect(() => {
    dispatch(getPredictionList());
    return () => {
      dispatch(resetPredictionList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (success) {
      setToastMessage("Predictions loaded successfully");
      setToastSeverity("success");
      setOpenToast(true);
    }
  }, [error, success]);

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

  const columns = [
    { name: "title", align: "left" },
    { name: "location", align: "left" },
    { name: "predicted_at", align: "center" },
    { name: "type", align: "left" },
    { name: "actions", align: "center" },
  ];

  const rows = predictions && predictions?.map((row) => ({
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
        margin: "16px", // Add margin to the sides
        maxWidth: "calc(100% - 32px)", // Ensure the card doesn't expand beyond the screen width
        overflowX: "auto",
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
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Table columns={columns} rows={rows} />
        )}
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

      <Snackbar open={openToast} autoHideDuration={6000} onClose={() => setOpenToast(false)}>
        <Alert onClose={() => setOpenToast(false)} severity={toastSeverity} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Predictions;
