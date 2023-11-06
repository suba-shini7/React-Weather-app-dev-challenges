export const DayCard = (props) => {
  return (
    <div className="daycard">
      <p>{props.date}</p>
      <img
        src={`http://openweathermap.org/img/w/${props.iconss}.png`}
        className="day"
        onerror="this.style.display='none'"
        alt="Loading..."
      ></img>
      <p>
        {props.celcius}
        <span>°C</span>
      </p>
    </div>
  );
};
