import {vscodeDarkInit} from "@uiw/codemirror-theme-vscode";

import {getDefaultFontFamily, getFontFamily} from "~/services/fonts";
import { vscodeLightInit } from './light';

export const prepareTheme = (darkMode?: boolean, fontName?: string) => {
  const fontFamily = fontName ? getFontFamily(fontName) : getDefaultFontFamily();

  if (!darkMode) {
    return vscodeLightInit(fontFamily);
  }

  return vscodeDarkInit({
    settings: {
      fontFamily,
      background: '#1f1f1f',
      gutterBackground: '#1f1f1f'
    }
  });
}

