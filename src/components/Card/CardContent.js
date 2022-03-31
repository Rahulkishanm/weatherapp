import IconWeatherComponent from "./IconWeatherComponent";
import { stampFormatToTime } from "../../common/Utils";
import "./card.css";
export const Header = ({ temp = 0, main = "empty", area = "empty" }) => {
  return (
    <div className="cardheader">
      <div style={{ alignSelf: "center" }}>{`${parseInt(temp)}°C`}</div>
      <div style={{ borderLeft: "1px solid white" }} />
      <div>
        <div>{main}</div>
        <div>{area}</div>
      </div>
    </div>
  );
};
export const InnerContent = ({
  icon = "01d",
  day = "Mon",
  date = "21 Jan 2021",
  time = "08:43",
}) => {
  return (
    <div className="innerContent">
      <IconWeatherComponent icon={icon} height={"100px"} width="100px" />
      <div>{day}</div>
      <div>{date}</div>
      <div>{time}</div>
    </div>
  );
};

export const FooterContentItem = ({ content, idx }) => {
  const { icon } = content.weather[0];
  const time = stampFormatToTime(content.dt);
  const temp = content.main.temp;
  return (
    <div
      key={content.name}
      style={{ display: "flex", flexDirection: "column", marginRight: "5px" }}
    >
      <div>{idx === 0 ? "Now" : time}</div>
      <IconWeatherComponent icon={icon} height="35px" width="35px" />
      <div>{`${parseInt(temp)}°C`}</div>
    </div>
  );
};
export const Footer = ({ reportList = [] }) => {
  const reportListComponents = reportList.map((i, idx) => (
    <FooterContentItem content={i} idx={idx} key={i.dt} />
  ));
  return <div className="footer">{reportListComponents}</div>;
};
