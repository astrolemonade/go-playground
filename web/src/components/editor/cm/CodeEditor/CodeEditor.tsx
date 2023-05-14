import React, {useEffect, useMemo, useRef} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import {indentUnit} from "@codemirror/language";

import {connect, newFileChangeAction, StateDispatch} from "~/store";
import {MonacoSettings} from "~/services/config";

import {prepareTheme} from "../themes";
import "./CodeEditor.css";
import clsx from "clsx";

interface OwnProps {}

interface StateProps {
  code: string
  fileName: string
  loading?: boolean
  monaco: MonacoSettings

  settings: {
    darkMode?: boolean
    enableVimMode?: boolean
  }
}

interface Props extends OwnProps, StateProps {
  dispatch: StateDispatch
}

// Define the extensions outside the component for the best performance.
// If you need dynamic extensions, use React.useMemo to minimize reference changes
// which cause costly re-renders.
const extensions = [
  StreamLanguage.define(go),
  indentUnit.of('\t')
];

const defaultProps = {
  height: "100%",
  width: "100%",
  minHeight: "initial",
  minWidth: "initial",
  maxHeight: "100%",
  maxWidth: "100%",
}

const CodeEditor: React.FC<Props> = (
  {
    code,
    loading,
    monaco,
    settings: { darkMode },
    dispatch
  }
) => {
  const theme = useMemo(() => (
    prepareTheme(darkMode, monaco.fontFamily)
  ), [darkMode, monaco.fontFamily]);

  return (
    <CodeMirror
      value={code}
      readOnly={loading}
      className={
        clsx("CodeEditor", {
          "CodeEditor--Ligatures": monaco.fontLigatures
        })
      }
      extensions={extensions}
      theme={theme}
      indentWithTab={true}
      basicSetup={{
        foldGutter: true,
        allowMultipleSelections: true,
        dropCursor: false,
        autocompletion: true,
        searchKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        highlightActiveLine: false,

        // Disable basicSetup's logic to override tab indentation
        tabSize: 0,
      }}
      onChange={(newValue) => {
        dispatch(newFileChangeAction(newValue))
      }}
      {...defaultProps}
    >

    </CodeMirror>
  )
}

const ConnectedCodeEditor = connect<StateProps, OwnProps>(
  ({
     editor: { code, fileName},
      settings,
     status,
     monaco
  }) => ({
    code,
    fileName,
    monaco,
    settings,
    loading: status?.loading,
  })
)(CodeEditor);

export default ConnectedCodeEditor;
