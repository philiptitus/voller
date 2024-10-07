// @mui material components
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Course({ title, ready, description, updated_at, capacity, onEnroll, onUnenroll }) {
  return (
    <Card sx={{ mb: 2 }}>
      <VuiBox p={2} display="flex" justifyContent="space-between" alignItems="center">
        <VuiBox>
          <VuiTypography variant="h6" color="white" fontWeight="bold">
            {title}
          </VuiTypography>
          <VuiTypography variant="body2" color="text">
            {description}
          </VuiTypography>
          <VuiTypography variant="body2" color="text">
            Ready: {ready ? "Yes" : "No"}
          </VuiTypography>
          <VuiTypography variant="body2" color="text">
            Updated At: {new Date(updated_at).toLocaleString()}
          </VuiTypography>
          <VuiTypography variant="body2" color="text">
            Capacity: {capacity}
          </VuiTypography>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <IconButton onClick={onEnroll} color="primary">
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={onUnenroll} color="secondary">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default Course;
