export const TodayCard = (props) => {
  return (
    <div className="Todaycard">
      <h2>{props.header}</h2>
      <br></br>
      <div>{props.icon}</div>
      <p>{props.values}</p>
    </div>
  );
};
