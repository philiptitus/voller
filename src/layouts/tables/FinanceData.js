import React from "react";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

const FinanceData = ({ title, location, amount, last_updated, comment_count, handleOpenDetailModal }) => {
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
      <VuiBox display="flex" justifyContent="flex-end">
        <IconButton onClick={() => handleOpenDetailModal()} color="secondary">
          <InfoIcon />
        </IconButton>
      </VuiBox>
    </VuiBox>
  );
};

export default FinanceData;
