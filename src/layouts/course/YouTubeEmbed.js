import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress } from "@mui/material";

const YouTubeEmbed = ({ embedUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract the YouTube video ID from the embed URL
  const getYouTubeId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  };

  const embedId = getYouTubeId(embedUrl);

  // Handle iframe load event
  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="315px"
      borderRadius="8px"
      overflow="hidden"
      boxShadow={3}
      sx={{
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: 5,
        },
      }}
    >
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="gray.200"
          zIndex="1"
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{ color: "blue.500" }}
          />
        </Box>
      )}
      <Box
        component="iframe"
        width="100%"
        height="315px"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
        sx={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </Box>
  );
};

YouTubeEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
};

export default YouTubeEmbed;
