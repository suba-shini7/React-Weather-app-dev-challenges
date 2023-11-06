import "../Css/SearchBar.css";
import { useState } from "react";
import Axios from "axios";
import { DayCard } from "./Daycard";
import { TodayCard } from "./Todaycard";
import "../Css/Display.css";
import { Footer } from "./Footer";

export const SearchBar = () => {
  const [showResults, setShowResults] = useState(false);
  const handelCancel = () => setShowResults(false);
  const onClicks = () => setShowResults(true);
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const handelSearch = () => {
    if (name !== "") {
      Axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=0a1a86f7c1264036183ce598dbf395b8&units=metric`
      ).then((res) => {
        setData({
          ...data,
          celcius1: res.data.list[0].main.temp,
          celcius2: res.data.list[8].main.temp,
          celcius3: res.data.list[16].main.temp,
          celcius4: res.data.list[24].main.temp,
          celcius5: res.data.list[32].main.temp,
          name: res.data.city.name,
          descrpition: res.data.list[0].weather[0].main,
          icon1: res.data.list[0].weather[0].icon,
          icon2: res.data.list[8].weather[0].icon,
          icon3: res.data.list[16].weather[0].icon,
          icon4: res.data.list[24].weather[0].icon,
          icon5: res.data.list[32].weather[0].icon,
          country: res.data.city.country,
          humidity: res.data.list[0].main.humidity,
          speed: res.data.list[0].wind.speed,
          visibility: res.data.list[0].visibility,
          pressure: res.data.list[0].main.pressure,
          date1: res.data.list[0].dt_txt.slice(0, 10),
          date2: res.data.list[8].dt_txt.slice(0, 10),
          date3: res.data.list[16].dt_txt.slice(0, 10),
          date4: res.data.list[24].dt_txt.slice(0, 10),
          date5: res.data.list[32].dt_txt.slice(0, 10),
        });
      });
      setShowResults(false);
      setName("");
    }
  };
  const Results = () => {
    return (
      <div id="results" className="search-results">
        <div className="hidden_div">
          <div className="srheader">
            <button onClick={handelCancel}>
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
          <div className="srhbar">
            <input
              className="srcloc"
              type="text"
              placeholder="Search location"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              spellcheck="false"
            />
            <button onClick={handelSearch} className="search">
              Search
            </button>
          </div>
          <div className="locsrch">
            <p>{name.toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="main">
      <div className="SearchBar">
        <div className="searchplace">
          <button className="srcplc" onClick={onClicks}>
            Search for place
          </button>
          <i class="bi bi-crosshair"></i>
          {showResults ? <Results /> : null}
        </div>
        </div>
       { data.name ? 
       <>
        <div className="bottom">
          <div className="images">
            <img
              src={`http://openweathermap.org/img/w/${data.icon1}.png`}
              alt="Loading.."
            ></img>
          </div>
          <h1>
            {data.celcius1 ? data.celcius1 : <h6>Loading...</h6>}
            <span>°C</span>
          </h1>
          <h3>{data.name}</h3>
          <h3>{dateBuilder(new Date())}</h3>
          <p>
            <span>{data.descrpition}</span>
          </p>
          <h3>
            <span>Humidity</span> {data.humidity}
            <br></br>
            <br></br>
            {data.country}
            <i class="bi bi-geo-alt"></i>
          </h3>
        </div>
     
      <div className="main-div">
        <div className="top">
          <button>°C</button>
          <button>°F</button>
        </div>
        <div className="daycards">
          <DayCard
            celcius={data.celcius1}
            date={data.date1}
            iconss={data.icon1}
          ></DayCard>
          <DayCard
            celcius={data.celcius2}
            date={data.date2}
            iconss={data.icon2}
          ></DayCard>
          <DayCard
            celcius={data.celcius3}
            date={data.date3}
            iconss={data.icon3}
          ></DayCard>
          <DayCard
            celcius={data.celcius4}
            date={data.date4}
            iconss={data.icon4}
          ></DayCard>
          <DayCard
            celcius={data.celcius5}
            date={data.date5}
            iconss={data.icon5}
          ></DayCard>
        </div>

        <div >

          <h4 className="highlight">Today's HighLights</h4>
          <div className="todaycards">
            <TodayCard
              header="wind"
              values={data.speed}
              icon={<i class="bi bi-wind"></i>}
            ></TodayCard>
            <TodayCard
              header="Humidity"
              values={data.humidity}
              icon={<i class="bi bi-activity"></i>}
            ></TodayCard>
            <TodayCard
              header="Visibitlity"
              values={data.visibility}
              icon={<i class="bi bi-binoculars"></i>}
            ></TodayCard>
            <TodayCard
              header="Air Pressure"
              values={data.pressure}
              icon={<i class="bi bi-speedometer"></i>}
            ></TodayCard>
          </div>
        </div>
        <Footer></Footer>
      </div>
      </>
      :(<div className="weather">
        <img src="https://images.unsplash.com/photo-1577730286200-046d1c45439a?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Weather"></img>
        <h1>Loading Weather data...</h1>
        <p>Search your Location</p>
      </div>)}
    </div>
  );
};
