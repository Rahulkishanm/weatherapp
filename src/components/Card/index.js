import { Header, Footer, InnerContent } from "./CardContent";
import {
  stampFormatToDate,
  stampFormatToDayInWeek,
  stampFormatToTime,
} from "../../common/Utils";
export const Card = ({ valueTenDays, valueNow }) => {
  const name = valueNow.name;
  const { main, icon } = valueNow.weather[0];
  const temperature = valueNow.main.temp;
  const dt = valueNow.dt;
  const reportList = valueTenDays.list;
  const isNight =
    new Date(valueNow.sys.sunrise * 1000) > new Date().getTime() &&
    new Date().getTime() < new Date(valueNow.sys.sunset * 1000);

  return (
    <div className={`card ${isNight ? "backgroundNight" : "backgroundLight"} `}>
      <Header temp={temperature} main={main} area={name} />
      <InnerContent
        date={stampFormatToDate(dt)}
        day={stampFormatToDayInWeek(dt)}
        time={stampFormatToTime(dt)}
        icon={icon}
      />
      <Footer reportList={[valueNow, ...reportList]} />
    </div>
  );
};
