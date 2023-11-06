export const TodayCard = (props) => {
  return (
    <div className="Todaycard">
      <p>{props.header}</p>
      <div>{props.icon}</div>
      <p>{props.values}</p>
    </div>
  );
};
