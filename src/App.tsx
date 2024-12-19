import './App.css'
import Grid from '@mui/material/Grid2' 
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import ControlWeather from './components/ControlWeather';
import Item from './interface/Item';

{/* Hooks */ }
import { useEffect, useState } from 'react';

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}



function App() {

  {/* Variable de estado y función de actualización */}
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [items, setItems] = useState<Item[]>([])
  let [charts, setCharts] = useState<Item[]>([])
  let [selectedVariable, setSelectedVariable] = useState<number>(-1);

  {/* Hook: useEffect */}
  useEffect( ()=>{
    let request = async () => { 
      {/* Request */}
      let API_KEY = "893988b3d60ae54835fa54a30cc4c529"
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
      let savedTextXML = await response.text();

      {/* XML Parser */}
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      {/* Arreglo para agregar los resultados */}

      let dataToIndicators : Indicator[] = new Array<Indicator>();

      {/* 
          Análisis, extracción y almacenamiento del contenido del XML 
          en el arreglo de resultados
      */}

      let name = xml.getElementsByTagName("name")[0].innerHTML || ""
      dataToIndicators.push({"title":"Location", "subtitle": "City", "value": name})

      let location = xml.getElementsByTagName("location")[1]

      let latitude = location.getAttribute("latitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      //console.log( dataToIndicators )

      {/* Modificación de la variable de estado mediante la función de actualización */}
      setIndicators( dataToIndicators )

      let dataToItems = new Array<Item>();

      let time = xml.getElementsByTagName("time");

      for (let i = 0; i < time.length && i < 10; i++) {
        const times = time[i];
        const from = times.getAttribute('from');
        const to = times.getAttribute('to');
        const precip = times.getElementsByTagName('precipitation')[0]?.getAttribute('probability') || '0';
        const temp = times.getElementsByTagName('temperature')[0]?.getAttribute('value') || '0';
        const hum = times.getElementsByTagName('humidity')[0]?.getAttribute('value') || '0';
        const cloud = times.getElementsByTagName('clouds')[0]?.getAttribute('value') || '0';

        const valorPrec = Number(precip) * 100;
        const precipit = valorPrec.toString() || '0';
        const temperatura = ((Number(temp) - 273.15).toFixed(2)).toString();

        dataToItems.push({"dateStart":from || "", 
          "dateEnd":to || "", 
          "precipitation":precipit || "", 
          "temperatura":temperatura || "",
          "humidity": hum || "", 
          "clouds": cloud || ""
        });
      }

      setItems(dataToItems)

      let chartsToItem = new Array<Item>();

      for (let i = 0; i < time.length && i < 10; i++) {
        const times = time[i];
        const from = times.getAttribute('from');
        const to = times.getAttribute('to');
        const precip = times.getElementsByTagName('precipitation')[0]?.getAttribute('probability') || '0';
        const temp = times.getElementsByTagName('temperature')[0]?.getAttribute('value') || '0';
        const hum = times.getElementsByTagName('humidity')[0]?.getAttribute('value') || '0';
        const cloud = times.getElementsByTagName('clouds')[0]?.getAttribute('all') || '0';

        const valorPrec = Number(precip) * 100;
        const precipit = valorPrec.toString() || '0';
        const temperatura = ((Number(temp) - 273.15).toFixed(2)).toString();

        chartsToItem.push({"dateStart":from || "", 
          "dateEnd":to || "", 
          "precipitation":precipit || "", 
          "temperatura":temperatura || "",
          "humidity": hum || "", 
          "clouds": cloud || ""
        });
      }

      setCharts(chartsToItem)
      
    }

    request();

  }, [] )

  let renderIndicators = () => {

    return indicators
            .map(
                (indicator, idx) => (
                    <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                        <IndicatorWeather 
                            title={indicator["title"]} 
                            subtitle={indicator["subtitle"]} 
                            value={indicator["value"]} />
                    </Grid>
                )
            )
     
  }

  const handleVariableChange = (selectedIndex: number) => {
    setSelectedVariable(selectedIndex);
  }


  return (
    <Grid container spacing={5}>

      {/* Indicadores */}
      {/*<Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} /></Grid>
      <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} /></Grid>
      <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"}/></Grid>
      <Grid size={{ xs: 12, xl: 3 }}><IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"}/></Grid>*/}

      {renderIndicators()}
      
      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 12}}>
          <TableWeather itemsIn={ items } />
          </Grid>

      
      <Grid size={{ xs: 12, xl: 12 }}>
        {/* Grid Anidado */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 12 }}>
              <ControlWeather onChange={handleVariableChange}/>
          </Grid>
          {/* Gráfico */}
          <Grid size={{ xs: 12, xl: 12 }}>
            <LineChartWeather content= {charts} selectedVariable={selectedVariable}/>
          </Grid>
          
        </Grid>
        
      </Grid>
		  
    </Grid>
  )
}

export default App

