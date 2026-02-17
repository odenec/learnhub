import chalk from "chalk";
import dedent from "dedent-js";
const printError = (error) => {
  console.log(chalk.bgRed("ERROR" + " " + error));
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen("SUCCESS" + " " + msg));
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan("HELP")}
    Без параметров - вывод погоды
    -s [CITY] для установки города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `,
  );
};

const printWeather = (res, icon) => {
  if (res != undefined) {
    const maxTemp = Math.round(res.main.temp_max);
    const minTemp = Math.round(res.main.temp_min);
    const tempText =
      minTemp == maxTemp
        ? `Средняя температура: ${minTemp}`
        : `Темперратура от ${minTemp} до ${maxTemp}`;
    console.log(
      dedent`
          ${chalk.bgYellow("Weather: ")}
          Сейчас в городе ${res.name}: ${icon}${res.weather[0].description};
          ${tempText};
          Ветер ${res.wind.speed} м/c
          
          
          `,
    );
  }
};
export { printError, printSuccess, printHelp, printWeather };
