import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetail, resetCourseDetail } from "server/actions/actions1";
import {
  CircularProgress,
  Typography,
  Grid,
  Box,
  IconButton,
  Paper,
} from "@mui/material";
import { OpenInNew as ExternalLink } from "@mui/icons-material";
import { styled } from "@mui/system";

const darkPurple = "#2c003e";
const lightPurple = "#8059ff";

const StyledBox = styled(Box)({
  backgroundColor: darkPurple,
  color: "white",
  minHeight: "100vh",
  padding: "40px",
});

const StyledPaper = styled(Paper)({
  backgroundColor: "#1b0030", // Darker shade for paper background
  color: "white",
  padding: "20px",
  borderRadius: "8px",
  border: `1px solid ${lightPurple}`,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
});

const StyledIconButton = styled(IconButton)({
  color: lightPurple,
});

const CourseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, course } = useSelector((state) => state.courseDetail);

  useEffect(() => {
    dispatch(getCourseDetail(id));
    return () => {
      dispatch(resetCourseDetail());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <StyledBox display="flex" justifyContent="center" alignItems="center">
        <CircularProgress color="secondary" />
      </StyledBox>
    );
  }

  if (error) {
    return (
      <StyledBox display="flex" justifyContent="center" alignItems="center">
        <Typography color="error" variant="h5">
          {error}
        </Typography>
      </StyledBox>
    );
  }

  if (!course) {
    return (
      <StyledBox display="flex" justifyContent="center" alignItems="center">
        <Typography color="error" variant="h5">
          Course not found
        </Typography>
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h4" align="center" gutterBottom>
              {course.title}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              {course.description}
            </Typography>
            <Typography variant="body2" align="center" sx={{ fontStyle: "italic" }}>
              Updated at: {new Date(course.updated_at).toLocaleString()}
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Questions and Answers Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Questions and Answers
            </Typography>
            {course.blocks?.map((block) => (
              <Box key={block.id} sx={{ marginBottom: "20px" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Q: {block.question}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "5px" }}>
                  A: {block.answer}
                </Typography>
              </Box>
            ))}
          </StyledPaper>
        </Grid>

        {/* Google Search Results Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              Google Search Results
            </Typography>
            {course.google_search_results?.map((result) => (
              <Box
                key={result.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "15px" }}
              >
                <Typography variant="body1">{result.title}</Typography>
                <StyledIconButton
                  aria-label="open link"
                  onClick={() => window.open(result.link, "_blank")}
                >
                  <ExternalLink />
                </StyledIconButton>
              </Box>
            ))}
          </StyledPaper>
        </Grid>

        {/* YouTube Links Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>
              YouTube Links
            </Typography>
            {course.youtube_links?.map((link) => (
              <Box
                key={link.id}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "15px" }}
              >
                <Typography variant="body1">{link.title}</Typography>
                <StyledIconButton
                  aria-label="open link"
                  onClick={() => window.open(link.embed_url, "_blank")}
                >
                  <ExternalLink />
                </StyledIconButton>
              </Box>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default CourseDetail;
