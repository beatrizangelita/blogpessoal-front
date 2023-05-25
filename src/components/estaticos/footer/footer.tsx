import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Grid } from "@material-ui/core";
import { Box } from "@mui/material";
import "./footer.css";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useSelector } from "react-redux";

function Footer() {

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  var footerComponent;

  if(token != ""){
    footerComponent = 
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid alignItems="center" item xs={6}>
          <Box className="box1">
            <Box
              paddingTop={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                className="fonte"
              >
                Siga-nos nas redes {" "}

                <a href="https://github.com/beatrizangelita" target="_blank">
                <GitHubIcon className="redes" />
              </a>
              <a
                href="https://www.linkedin.com/in/beatriz-angelita/"
                target="_blank"
              >
                <LinkedInIcon className="redes" />
              </a>
              </Typography>
          </Box>

          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="box1">
            <Box paddingTop={2}>
              <Typography
                variant="subtitle2"
                align="center"
                gutterBottom
                className="fonte"
              >
                © 2023 Copyright: Beatriz Angelita
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
  }
  
  return (
    <>
      {footerComponent}
    </>
  );
}

export default Footer;
