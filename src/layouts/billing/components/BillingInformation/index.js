import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList, resetCourseList, enrollCourse, resetEnrollCourse, unenrollCourse, resetUnenrollCourse } from "server/actions/actions1";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

// @mui material components
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Course page components
import Course from "./Course";
import React from "react";

function CourseInformation() {
  const dispatch = useDispatch();
  const [openEnrollModal, setOpenEnrollModal] = useState(false);
  const [openUnenrollModal, setOpenUnenrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const { loading, error, courses, success } = useSelector((state) => state.courseList);
  const { loading: enrollLoading, error: enrollError, success: enrollSuccess } = useSelector((state) => state.enrollCourse);
  const { loading: unenrollLoading, error: unenrollError, success: unenrollSuccess } = useSelector((state) => state.unenrollCourse);

  useEffect(() => {
    dispatch(getCourseList());
    return () => {
      dispatch(resetCourseList());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (success) {
      setToastMessage("Courses loaded successfully");
      setToastSeverity("success");
      setOpenToast(true);
    }
    if (enrollError) {
      setToastMessage(enrollError);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (enrollSuccess) {
      setToastMessage("Enrolled successfully");
      setToastSeverity("success");
      setOpenToast(true);
      dispatch(resetEnrollCourse());
    }
    if (unenrollError) {
      setToastMessage(unenrollError);
      setToastSeverity("error");
      setOpenToast(true);
    }
    if (unenrollSuccess) {
      setToastMessage("Unenrolled successfully");
      setToastSeverity("success");
      setOpenToast(true);
      dispatch(resetUnenrollCourse());
    }
  }, [error, success, enrollError, enrollSuccess, unenrollError, unenrollSuccess]);

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
    dispatch(enrollCourse(selectedCourse.id));
    handleCloseEnrollModal();
  };

  const handleUnenroll = () => {
    dispatch(unenrollCourse());
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
        {loading ? (
          <CircularProgress />
        ) : (
          <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            {courses?.map((course, index) => (
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
        )}
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
          <Button onClick={handleEnroll} color="primary" disabled={enrollLoading}>
            {enrollLoading ? <CircularProgress size={24} /> : "Enroll"}
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
          <Button onClick={handleUnenroll} color="primary" disabled={unenrollLoading}>
            {unenrollLoading ? <CircularProgress size={24} /> : "Unenroll"}
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

export default CourseInformation;
