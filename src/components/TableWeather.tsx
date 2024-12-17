
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';

interface MyProp {
  itemsIn: Item[];
}

{/*// Función para formatear la fecha y mostrar solo la hora
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};*/}

// Función para extraer la fecha
const extractDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Función para extraer la hora
const extractTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};


export default function BasicTable(props: MyProp) {

  let [rows, setRows] = useState<Item[]>([]);

  useEffect( ()=> {
    setRows(props.itemsIn)
  }, [props])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Fecha</TableCell>
            <TableCell>Hora de inicio</TableCell>
            <TableCell align="right">Hora de fin</TableCell>
            <TableCell align="right">Precipitación (%) </TableCell>
            <TableCell align="right">Temperatura (°C) </TableCell>
            <TableCell align="right">Humedad (%)</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (

          <TableRow>
            <TableCell component="th" scope="row">
                {extractDate(String(row.dateStart))}
              </TableCell>
            <TableCell component="th" scope="row">
            {extractTime(String(row.dateStart))}
            </TableCell>
            <TableCell align="right">{extractTime(String(row.dateEnd))}</TableCell>
            <TableCell align="right">{row.precipitation}</TableCell>
            <TableCell align="right">{row.temperatura}</TableCell>
            <TableCell align="right">{row.humidity}</TableCell>
            <TableCell align="right">{row.clouds}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}