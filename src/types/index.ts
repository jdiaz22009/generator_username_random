export type Style = "lowerCase" | "upperCase" | "capital";

export interface Config {
  dictionaries: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: Style;
}