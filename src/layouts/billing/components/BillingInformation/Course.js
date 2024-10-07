import React from "react";
import { Box, Typography, Button } from "@mui/material";

function Course({ title, ready, description, updated_at, capacity, onEnroll, onUnenroll, onTitleClick }) {
  return (
    <Box component="li" display="flex" alignItems="center" justifyContent="space-between" p={2} borderBottom="1px solid #ccc">
      <Box>
        <Typography variant="h6" component="div" onClick={onTitleClick} style={{ cursor: 'pointer', color: 'blue' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ready: {ready ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Updated At: {updated_at}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Capacity: {capacity}
        </Typography>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={onEnroll}>
          Enroll
        </Button>
        <Button variant="contained" color="secondary" onClick={onUnenroll} style={{ marginLeft: '10px' }}>
          Unenroll
        </Button>
      </Box>
    </Box>
  );
}

export default Course;
