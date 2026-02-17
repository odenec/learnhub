import axios from "axios";
import { getKeyValue, TOKEN_DICTIONARY } from "./storege.service.js";
import { printError } from "./log.service.js";

const getWether = async (city) => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
  if (!token) {
    throw new Error("Не задан ключ API, задайте его через -t [API_KEY]");
  }
  const { data: dataGeo } = await axios.get(
    "http://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        appid: token,
        limit: 5,
      },
    },
  );
  if (!dataGeo.length) {
    printError("неверно указан ГОРОД");
    return undefined;
  }
  const { lat, lon } = dataGeo[0];
  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat: lat,
        lon: lon,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    },
  );
  return data;
};
export { getWether };
