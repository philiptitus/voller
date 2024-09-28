// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

function FinanceData({ title, location, amount, last_updated, comment_count }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {title}
        </VuiTypography>

      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>


      </VuiBox>
      <VuiBox display="flex" flexDirection="column" ml={2}>

      </VuiBox>
    </VuiBox>
  );
}

export default {
  columns: [
    { name: "title", align: "left" },
    { name: "location", align: "left" },
    { name: "amount", align: "center" },
    { name: "last_updated", align: "center" },
    { name: "comment_count", align: "center" },
  ],

  rows: [
    {
      title: <FinanceData title="Test Finance 1" location="Nairobi, Kenya" amount={60000} last_updated="2024-09-28T14:40:41.859874Z" comment_count={0} />,
      location: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Nairobi, Kenya
        </VuiTypography>
      ),
      amount: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          60000
        </VuiTypography>
      ),
      last_updated: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date("2024-09-28T14:40:41.859874Z").toLocaleString()}
        </VuiTypography>
      ),
      comment_count: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          0
        </VuiTypography>
      ),
    },
    {
      title: <FinanceData title="Test Finance 2" location="Mombasa, Kenya" amount={70000} last_updated="2024-09-27T14:40:41.859874Z" comment_count={1} />,
      location: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Mombasa, Kenya
        </VuiTypography>
      ),
      amount: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          70000
        </VuiTypography>
      ),
      last_updated: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date("2024-09-27T14:40:41.859874Z").toLocaleString()}
        </VuiTypography>
      ),
      comment_count: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          1
        </VuiTypography>
      ),
    },
    {
      title: <FinanceData title="Test Finance 3" location="Kisumu, Kenya" amount={80000} last_updated="2024-09-26T14:40:41.859874Z" comment_count={2} />,
      location: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Kisumu, Kenya
        </VuiTypography>
      ),
      amount: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          80000
        </VuiTypography>
      ),
      last_updated: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date("2024-09-26T14:40:41.859874Z").toLocaleString()}
        </VuiTypography>
      ),
      comment_count: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          2
        </VuiTypography>
      ),
    },
    {
      title: <FinanceData title="Test Finance 4" location="Nakuru, Kenya" amount={90000} last_updated="2024-09-25T14:40:41.859874Z" comment_count={3} />,
      location: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Nakuru, Kenya
        </VuiTypography>
      ),
      amount: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          90000
        </VuiTypography>
      ),
      last_updated: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date("2024-09-25T14:40:41.859874Z").toLocaleString()}
        </VuiTypography>
      ),
      comment_count: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          3
        </VuiTypography>
      ),
    },
    {
      title: <FinanceData title="Test Finance 5" location="Eldoret, Kenya" amount={100000} last_updated="2024-09-24T14:40:41.859874Z" comment_count={4} />,
      location: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Eldoret, Kenya
        </VuiTypography>
      ),
      amount: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          100000
        </VuiTypography>
      ),
      last_updated: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {new Date("2024-09-24T14:40:41.859874Z").toLocaleString()}
        </VuiTypography>
      ),
      comment_count: (
        <VuiTypography variant="button" color="white" fontWeight="bold">
          4
        </VuiTypography>
      ),
    },
  ],
};
