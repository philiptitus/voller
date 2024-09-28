// @mui material components
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

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

  return {
    columns: [
      { name: "issue", align: "left" },
      { name: "location", align: "left" },
      { name: "count", align: "center" },
      { name: "last_updated", align: "center" },
      { name: "actions", align: "center" },
    ],

    rows: fakeRows.map((row) => ({
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
    })),
  };
}
