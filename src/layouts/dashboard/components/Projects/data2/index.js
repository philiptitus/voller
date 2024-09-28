// @mui material components
import Tooltip from "@mui/material/Tooltip";

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

export default function predictionData() {
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
      title: "Prediction 1",
      location: "Mombasa",
      predicted_at: "2024-09-28T14:43:05.183328Z",
      count: 1,
      type: "human_rights",
    },
    {
      title: "Prediction 2",
      location: "Nairobi",
      predicted_at: "2024-09-27T14:43:05.183328Z",
      count: 2,
      type: "environmental",
    },
    {
      title: "Prediction 3",
      location: "Kisumu",
      predicted_at: "2024-09-26T14:43:05.183328Z",
      count: 3,
      type: "economic",
    },
    {
      title: "Prediction 4",
      location: "Nakuru",
      predicted_at: "2024-09-25T14:43:05.183328Z",
      count: 4,
      type: "social",
    },
    {
      title: "Prediction 5",
      location: "Eldoret",
      predicted_at: "2024-09-24T14:43:05.183328Z",
      count: 5,
      type: "political",
    },
  ];

  return {
    columns: [
      { name: "title", align: "left" },
      { name: "location", align: "left" },
      { name: "predicted_at", align: "center" },
      { name: "count", align: "center" },
      { name: "type", align: "left" },
    ],

    rows: fakeRows.map((row) => ({
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
    })),
  };
}
