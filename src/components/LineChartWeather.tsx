import Paper from '@mui/material/Paper';
 import { LineChart } from '@mui/x-charts/LineChart';
import Item from '../interface/Item';
import { useEffect, useState } from 'react';

interface Information {
    content: Item[];
    selectedVariable: number;
  }


 export default function LineChartWeather({ content, selectedVariable }: Information) {

    let [labels, setLabels] = useState<string[]>([]);
    let [data, setData] = useState<number[]>([]);

    useEffect(() => {
        let newLabels: string[] = [];
        let newData: number[] = [];
    
        content.forEach(item => {
          newLabels.push(String(item.dateStart));
    
          switch (selectedVariable) {
            case 0:
              newData.push(Number(item.precipitation));
              break;
            case 1:
              newData.push(Number(item.humidity));
              break;
            case 2:
              newData.push(Number(item.clouds));
              break;
            default:
              newData.push();
              break;
          }
        });
    
        setLabels(newLabels);
        setData(newData);
      }, [content, selectedVariable]);


     return (
         <Paper
             sx={{
                 p: 2,
                 display: 'flex',
                 flexDirection: 'column'
             }}
         >
            

             {/* Componente para un gráfico de líneas */}
             <LineChart
                 width={1250}
                 height={400}
                 series={[{ data: data, label: 'Value' }]}
                 xAxis={[{ scaleType: 'point', data: labels }]}
             />
         </Paper>
     );
 }