export const DayCard = (props) => {
  return (
    <div className="daycard">
      <h5>{props.date}</h5>
      <img
        src={`http://openweathermap.org/img/w/${props.iconss}.png`}
        className="day"
        onerror="this.style.display='none'"
        alt="Loading..."
      ></img>
      <h6>
        {props.celcius}
        <span>°C</span>
      </h6>
    </div>
  );
};
