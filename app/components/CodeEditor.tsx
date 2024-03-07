"use client";
import React, { useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import { minify } from "next/dist/build/swc";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-typescript";
import Padding from "./Padding";

interface CodeProps {
  onCodeChnage: (code: string) => void;
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

function CodeEditor({
  onCodeChnage,
  language,
  theme,
  icon,
  background,
  currentPadding,
}: CodeProps) {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(550);

  // @ts-ignore
  const handleResize = (e, direction, ref, pos) => {
    const newHeight = ref.style.height;
    setHeight(parseInt(newHeight, 10));
  };
  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  const [title, setTitle] = useState("Untitled");

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <Resizable
      minHeight={550}
      minWidth={500}
      maxWidth={1000}
      defaultSize={{
        width: width,
        height: height || 300,
      }}
      onResize={handleResize}
      className="resizeable-container relative"
      style={{ background: background }}
    >
      <div className="code-block" style={{ padding: currentPadding }}>
        <div className="code-title h-[52px] px-4 flex items-center justify-between bg-black bg-opacity-80">
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772]"></div>
          </div>
          <div className="input-control w-full ">
            <input
              type="text"
              name=""
              id=""
              className="w-full text-[hsla(0,0%,100%,.6)] outline-none font-medium text-center bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="icon flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm ">
            <img src={icon} alt="" className="h-6 w-6" />
          </div>
        </div>
        <AceEditor
          value=" function() { return 'Hello World' } "
          name="id_of_div"
          fontSize={16}
          theme={theme}
          mode={language}
          wrapEnabled={true}
          showPrintMargin={false}
          highlightActiveLine={false}
          height={`calc(${height}px - ${currentPadding} - ${currentPadding} - 52px)`}
          showGutter={false}
          editorProps={{ $blockScrolling: true }}
          className="ace-editor-container"
        />
      </div>
    </Resizable>
  );
}

export default CodeEditor;
