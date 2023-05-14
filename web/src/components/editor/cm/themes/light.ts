import { tags as t } from '@lezer/highlight';
import { createTheme, CreateThemeOptions } from '@uiw/codemirror-themes';

export const defaultSettings: CreateThemeOptions['settings'] = {
  background: '#fff',
  foreground: '#000',
  caret: '#000',
  selection: '#b8d5fd',
  selectionMatch: '#ddbcab',

  // lineHighlight: '#e9efe6',
  gutterBorder: 'd2d2d2',
  gutterBackground: '#fff',
  gutterForeground: '#4a7791',
  gutterActiveForeground: '#1a266d',
  fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace',
};

export const vscodeLightInit = (fontFamily?: string) => {
  return createTheme({
    theme: 'light',
    settings: {
      ...defaultSettings,
      fontFamily: fontFamily
    },
    styles: [
      {
        tag: [
          t.keyword,
          t.operatorKeyword,
          t.modifier,
          t.color,
          t.constant(t.name),
          t.standard(t.name),
          t.standard(t.tagName),
          t.special(t.brace),
          t.atom,
          t.bool,
          t.special(t.variableName),
        ],
        color: '#00f',
      },
      {
        tag: [
          t.controlKeyword,
        ],
        color: '#9c002d',
      },
      {
        tag: [t.controlKeyword, t.moduleKeyword],
        color: '#c586c0',
      },
      {
        tag: t.propertyName,
        color: '#684f22',
      },
      {
        tag: [
          t.name,
          t.deleted,
          t.character,
          t.macroName,
          t.variableName,
          t.labelName,
          t.definition(t.name),
        ],
        color: '#000',
      },
      { tag: t.heading, fontWeight: 'bold', color: '#9cdcfe' },
      {
        tag: [t.typeName, t.className, t.tagName, t.changed, t.annotation, t.self, t.namespace],
        color: '#55849b',
      },
      {
        tag: [t.function(t.variableName), t.function(t.propertyName)],
        color: '#725f30',
      },
      { tag: [t.number], color: '#137646' },
      {
        tag: [t.operator, t.punctuation, t.separator, t.url, t.escape, t.regexp],
        color: '#000',
      },
      {
        tag: [t.regexp],
        color: '#d16969',
      },
      {
        tag: [t.special(t.string), t.processingInstruction, t.string, t.inserted],
        color: '#9a1d22',
      },
      { tag: [t.angleBracket], color: '#808080' },
      { tag: t.strong, fontWeight: 'bold' },
      { tag: t.emphasis, fontStyle: 'italic' },
      { tag: t.strikethrough, textDecoration: 'line-through' },
      { tag: [t.meta, t.comment], color: '#13720a' },
      { tag: t.link, color: '#6a9955', textDecoration: 'underline' },
      { tag: t.invalid, color: '#ff0000' },
    ],
  });
}
