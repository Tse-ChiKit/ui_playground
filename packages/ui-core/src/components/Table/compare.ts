import { SortOrder } from "./types";
export const compareString = (a: string, b: string) => a.localeCompare(b);

export const compareNumber = (a: number, b: number) => a - b;

export const compareDate = (a: Date, b: Date) => a.getTime() - b.getTime();
