import { useEffect, useState } from 'react'
import './App.css'
import 'boxicons'
import './styles/hovers.css'
import NotFoundError from './components/NotFoundError';

function App() {

  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState<string>('miami');

  const [coords, setCoords] = useState<{ lat: number, lon: number } | undefined>();

  const [tem, setTem] = useState<string>('C')

  const apiKey = `93194ca6e2a516c3482cfb6fcc53761e`

  
  function searchLocation(): void {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`

    fetch(url)
      .then((res) => res.json())
      .then(json => {
        setData(json)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const handledSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocation(e.currentTarget.search.value)

    console.log(location)

    searchLocation()
  }
console.log(location)

  useEffect(() => {
    if (location) {
      searchLocation()
    }

    const success = (pos: GeolocationPosition) => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      setCoords(latlon);


    };
    navigator.geolocation.getCurrentPosition(success)

  }, [location, coords?.lat]);

  console.log(
    data

  )

  // current location

  const handleCurrentLocation = () => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`

    if (coords?.lat) {
      fetch(URL)
        .then(res => res.json())
        .then(json => setData(json))

        .catch(err => console.log(err))
    }
  }

  //Change Temperature

  const handleTem = () => {

    if (tem == 'C') {
      setTem('F')
    } else {
      setTem('C')
    }
    console.log(tem)
  }

  console.log(coords)

  return (
    <main className="App">

      {
        data?.cod == '400' ? <NotFoundError data={data} /> : ""
      }


      <div>

        <section className="search" >
          <form className='search_form' onSubmit={handledSearch} action="" >
            <input
              id='search'
              type="text"
              placeholder='Enter City'
            />
            <button className='btn_search hvr-buzz'  ><i className='bx bx-search'></i></button>
          </form>
        </section>


        <section className="container">
          <div className="container_top hvr-border-fade">
            <div className="container_top_location">
              {data?.sys ? <h1>{data?.sys.country}</h1> : ""}
              <h2>{data?.name}</h2>
            </div>
            <div className="container_top_temp">
              {

                data?.main ? <h3>{tem == 'C' ? Math.round((data.main.temp - 273.15) * 9 / 5 + 32) + "°F" : Math.round(data.main.temp - 273.15) + "°C"}</h3>
                  : null
              }
            </div>
            <div className="container_top_description">
              {data?.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

          </div>
          <div className="container_botton hvr-ripple-out">
            <div className="container_botton_feels">

              {
                data?.main ? <p className='bold'>{tem == 'C' ? Math.round((data.main.feels_like - 273.15) * 9 / 5 + 32) + "°F" : Math.round(data.main.feels_like - 273.15) + "°C"}</p>
                : null
              }
              <p>Feels Like</p>
            </div>
            <div className="container_botton_humidity">
              {data?.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="container_botton_wind">
              {data?.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>

          <div className='current_loc'>
            <button className='btn hvr-ripple-in' onClick={handleCurrentLocation}>Search Current Location</button>
            <button onClick={handleTem} className='btn hvr-ripple-in' >Change to °{tem}</button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
