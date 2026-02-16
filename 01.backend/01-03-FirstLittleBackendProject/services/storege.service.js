import { homedir } from "os";
import { dirname, join, relative } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};
const CITY = "Moscow,RU";

//записывает значпения ключа в файл
//добавляя к уже имеющимся
const saveKeyValue = async (key, value) => {
  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

//тянем конкретный ключ
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
};

//stat возращает статистику по файлу или падает в ошибку
// существует ли путь
const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
};
export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
