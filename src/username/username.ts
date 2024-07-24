import {adjectives, substantives} from '../mock';
import {Config} from '../types';

export const getRandomNumber = ({
  min = 0,
  max = 4294967295,
}: {
  min: number;
  max: number;
}): number => (Math.random() * ((max | 0) - (min | 0) + 1.0) + (min | 0)) | 0;

export const randomNumber = (maxNumber: number | undefined): string => {
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = Math.floor(
        getRandomNumber({min: 1, max: 9}),
      ).toString();
      break;
    case 2:
      randomNumberString = Math.floor(
        getRandomNumber({min: 10, max: 90}),
      ).toString();
      break;
    case 3:
      randomNumberString = Math.floor(
        getRandomNumber({min: 100, max: 900}),
      ).toString();
      break;
    case 4:
      randomNumberString = Math.floor(
        getRandomNumber({min: 1000, max: 9000}),
      ).toString();
      break;
    case 5:
      randomNumberString = Math.floor(
        getRandomNumber({min: 10000, max: 90000}),
      ).toString();
      break;
    case 6:
      randomNumberString = Math.floor(
        getRandomNumber({min: 100000, max: 900000}),
      ).toString();
      break;
    default:
      randomNumberString = '';
      break;
  }
  return randomNumberString;
};

export const generate_from_email = (
  email: string,
  randomDigits?: number,
): string => {
  const parts = email.replace(/@.+/, '');
  const name = parts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, '');
  return name + randomNumber(randomDigits);
};

export const generate_from_username = (
  separator?: string,
  randomDigits?: number,
  length?: number,
  prefix?: string,
): string => {
  const substantive =
    substantives[Math.floor(Math.random() * substantives.length)];
  const adjective = prefix
    ? prefix
        .replace(/\s{2,}/g, ' ')
        .replace(/\s/g, separator ?? '')
        .toLocaleLowerCase()
    : adjectives[Math.floor(Math.random() * adjectives.length)];

  let username;
  if (separator) {
    username = adjective + separator + substantive + randomNumber(randomDigits);
  } else {
    username = adjective + substantive + randomNumber(randomDigits);
  }

  if (length) {
    return username.substring(0, length);
  }

  return username;
};

export function generate_from_username_unique(config: Config): string {
  if (!config.dictionaries) {
    throw new Error('error');
  } else {
    const fromDictRander = (i: number) =>
      config.dictionaries[i][
        getRandomNumber({min: 0, max: config.dictionaries[i].length - 1})
      ];
    const dictionariesLength = config.dictionaries.length;

    const separator = config.separator || '';
    let name = '';

    for (let i = 0; i < dictionariesLength; i++) {
      const next = fromDictRander(i);
      if (!name) {
        name = next;
      } else {
        name += separator + next;
      }
    }

    let username = name + randomNumber(config.randomDigits);

    username = username.toLowerCase();

    if (config.style === 'lowerCase') {
      username = username.toLowerCase();
    } else if (config.style === 'capital') {
      const [firstLetter, ...rest] = username.split('');
      username = firstLetter.toUpperCase() + rest.join('');
    } else if (config.style === 'upperCase') {
      username = username.toUpperCase();
    }

    if (config.length) {
      return username.substring(0, config.length);
    } else {
      return username.substring(0, 15);
    }
  }
}
