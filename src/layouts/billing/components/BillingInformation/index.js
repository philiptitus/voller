// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Course page components
import Course from "./Course";
import React from "react";

// Hardcoded data for 10 courses
const fakeCourses = [
  {
    title: "Drought Course 1",
    ready: false,
    description: "This is a drought course 1",
    updated_at: "2024-09-28T15:52:00.250245Z",
    capacity: 0,
  },
  {
    title: "Drought Course 2",
    ready: true,
    description: "This is a drought course 2",
    updated_at: "2024-09-27T15:52:00.250245Z",
    capacity: 10,
  },
  {
    title: "Drought Course 3",
    ready: false,
    description: "This is a drought course 3",
    updated_at: "2024-09-26T15:52:00.250245Z",
    capacity: 5,
  },
  {
    title: "Drought Course 4",
    ready: true,
    description: "This is a drought course 4",
    updated_at: "2024-09-25T15:52:00.250245Z",
    capacity: 15,
  },
  {
    title: "Drought Course 5",
    ready: false,
    description: "This is a drought course 5",
    updated_at: "2024-09-24T15:52:00.250245Z",
    capacity: 20,
  },
  {
    title: "Drought Course 6",
    ready: true,
    description: "This is a drought course 6",
    updated_at: "2024-09-23T15:52:00.250245Z",
    capacity: 25,
  },
  {
    title: "Drought Course 7",
    ready: false,
    description: "This is a drought course 7",
    updated_at: "2024-09-22T15:52:00.250245Z",
    capacity: 30,
  },
  {
    title: "Drought Course 8",
    ready: true,
    description: "This is a drought course 8",
    updated_at: "2024-09-21T15:52:00.250245Z",
    capacity: 35,
  },
  {
    title: "Drought Course 9",
    ready: false,
    description: "This is a drought course 9",
    updated_at: "2024-09-20T15:52:00.250245Z",
    capacity: 40,
  },
  {
    title: "Drought Course 10",
    ready: true,
    description: "This is a drought course 10",
    updated_at: "2024-09-19T15:52:00.250245Z",
    capacity: 45,
  },
];

function CourseInformation() {
  const [openEnrollModal, setOpenEnrollModal] = React.useState(false);
  const [openUnenrollModal, setOpenUnenrollModal] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  const handleOpenEnrollModal = (course) => {
    setSelectedCourse(course);
    setOpenEnrollModal(true);
  };

  const handleCloseEnrollModal = () => {
    setOpenEnrollModal(false);
    setSelectedCourse(null);
  };

  const handleOpenUnenrollModal = (course) => {
    setSelectedCourse(course);
    setOpenUnenrollModal(true);
  };

  const handleCloseUnenrollModal = () => {
    setOpenUnenrollModal(false);
    setSelectedCourse(null);
  };

  const handleEnroll = () => {
    // Logic to enroll in the course
    handleCloseEnrollModal();
  };

  const handleUnenroll = () => {
    // Logic to unenroll from the course
    handleCloseUnenrollModal();
  };

  return (
    <Card id="course-information">
      <VuiBox>
        <VuiTypography variant="lg" color="white" fontWeight="bold">
          Course Information
        </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {fakeCourses.map((course, index) => (
            <Course
              key={index}
              title={course.title}
              ready={course.ready}
              description={course.description}
              updated_at={course.updated_at}
              capacity={course.capacity}
              onEnroll={() => handleOpenEnrollModal(course)}
              onUnenroll={() => handleOpenUnenrollModal(course)}
            />
          ))}
        </VuiBox>
      </VuiBox>

      <Dialog open={openEnrollModal} onClose={handleCloseEnrollModal}>
        <DialogTitle>Enroll in Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to enroll in the course "{selectedCourse?.title}"?
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

      <Dialog open={openUnenrollModal} onClose={handleCloseUnenrollModal}>
        <DialogTitle>Unenroll from Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unenroll from the course "{selectedCourse?.title}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUnenrollModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUnenroll} color="primary">
            Unenroll
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default CourseInformation;
