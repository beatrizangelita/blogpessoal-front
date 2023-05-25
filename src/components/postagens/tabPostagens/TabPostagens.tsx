import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import './TabPostagens.css';
import ListaPostagens from '../listaPostagens/ListaPostagens';


function TabPostagens() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div >
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example" style={{margin: '0 auto'}}>
            <Tab label="Postagens" value="1" />
            <Tab label="Sobre" value="2" />
          </TabList>
        </AppBar>
        <TabPanel value="1"><ListaPostagens /></TabPanel>
        <TabPanel value="2">
          Olá
        </TabPanel>
        
      </TabContext>
    </div>
  )
}
export default TabPostagens;