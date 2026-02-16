#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storege.service.js";
import { getWether } from "./services/api.service.js";

const saveCity = async (city) => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("город сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const cityData = await getKeyValue(TOKEN_DICTIONARY.city);
    const dataWeather = await getWether(cityData);
    //очень логичная передача данных через аргумент функции
    //иконок не будет
    printWeather(dataWeather);
  } catch (e) {
    if (e?.response?.status == 401) {
      printError("Неверно указан ТОКЕН");
    }
    if (e?.response?.status == 400) {
      printError("Не указан ГОРОД");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForcast();
};

initCLI();
