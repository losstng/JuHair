import en from './en';
import vi from './vi';

export const ui = { en, vi } as const;
export type Lang = keyof typeof ui;
