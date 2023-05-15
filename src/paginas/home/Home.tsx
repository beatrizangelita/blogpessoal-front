import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import {Box} from '@mui/material';
import "./Home.css";

function Home() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ background: "#3F51B5" }}
      >
        <Grid alignItems="center" item xs={6}>
          <Box padding={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="h3"
              align="center"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Sejam Bem Vindos(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Expressar aqui seus pensamentos e opniões.
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}></Box>
            <Button variant="outlined" style={{ borderColor: "white", backgroundColor: "#3F51B5", color: "white" }}>Ver Postagens</Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img src="/src/img/bart.png" alt="Imagem do Bart" />
        </Grid>
        <Grid xs={12} style={{ backgroundColor: "white" }}></Grid>
      </Grid>
    </>
  );
}

export default Home;
