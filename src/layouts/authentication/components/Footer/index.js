/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function Footer() {
  return (
    <VuiBox
      component="footer"
      py={6}
      sx={({ breakpoints }) => ({
        maxWidth: "450px",
        [breakpoints.down("xl")]: {
          maxWidth: "400px",
        },
      })}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
        <VuiTypography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          @ 2024, Philip Titus 

          & powered by
          <VuiTypography
            ml="2px"
            mr="2px"
            component="a"
            variant="button"
            href="https://documenter.getpostman.com/view/31401198/2sAXqzVd1y"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="white"
          >
            VollerAPI
          </VuiTypography>
        </VuiTypography>
        </Grid>
        <Grid item xs={10}>
        <VuiBox item xs={10}>
        <VuiBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography
              component="a"
              href="https://mrphilip.pythonanywhere.com/portfolio/voller"
              variant="body2"
              color="white"
            >
              About
            </VuiTypography>
          </VuiBox>
          <VuiBox mr={{ xs: "20px", lg: "46px" }}>
            <VuiTypography
              component="a"
              href="https://mrphilip.pythonanywhere.com/contact/"
              variant="body2"
              color="white"
            >
              Help
            </VuiTypography>
          </VuiBox>

        </VuiBox>
      </VuiBox>
        </Grid>
      </Grid>
    </VuiBox>
  );
}

export default Footer;
