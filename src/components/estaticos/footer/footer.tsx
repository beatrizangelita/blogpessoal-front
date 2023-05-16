import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import './footer.css';

function Footer() {
  return (
    <>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
          
          <Box className="box1">
            
            <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center" >
              <Typography variant="h5" align="center" gutterBottom className="textos" >
                Siga-nos nas redes sociais{" "}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center">
              <a href="https://github.com/beatrizangelita" target="_blank" >
                <GitHubIcon className="redes" />
              </a>
              <a href="https://www.linkedin.com/in/beatriz-angelita/" target="_blank" >
                <LinkedInIcon className="redes" />
              </a>
            </Box>

          </Box>

          <Box className="box2">
            
            <Box paddingTop={1}>
              <Typography variant="subtitle2" align="center" gutterBottom className="textos" >
                © 2023 Copyright:
              </Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2" gutterBottom className="textos" align="center" >
                  Beatriz Angelita
                </Typography>
            </Box>

          </Box>

        </Grid>
      </Grid>
    </>
  );
}

export default Footer;
