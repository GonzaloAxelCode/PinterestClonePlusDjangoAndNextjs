import React, { useState, useRef, ChangeEvent, FocusEvent, FC } from "react";

interface TextProps {
  info?: string;
  placeholder: string;
  getText: Function;
  emojis?: boolean;
  fontSize?: number;
  limit?: number;
  max?: number;
  bold?: boolean;
}

const Textarea: FC<TextProps> = ({
  info,
  placeholder,
  getText,
  emojis = false,
  fontSize = 36,
  max = 200,
  bold = false,
}) => {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const [maxChars, setMaxChars] = useState<number>(max);
  const refSmallText = useRef(null);
  const refLine = useRef(null);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    resizeTextarea();
    const value = e.target.value;
    if (value.length <= maxChars) {
      getText(text, true);
    } else {
      getText(text, false);
    }
    setText(value);
    setCharCount(value.length);
  };

  const resizeTextarea = (): void => {
    const textarea = textareaRef.current;
    if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = "60px";

      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>): void => {
    if (refLine.current) {
      refLine.current.style.backgroundColor = "#63B3ED";
    }
    if (refSmallText.current) {
      refSmallText.current.style.display = "flex";
    }
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>): void => {
    if (refLine.current) {
      refLine.current.style.backgroundColor = "#767676";
    }
    if (refSmallText.current) {
      refSmallText.current.style.display = "none";
    }
  };

  return (
    <div className="w-400 h-full flex flex-col justify-center items-center">
      <textarea
        className=" w-400 px-4 py-2 resize-none w-full focus:outline-none"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          padding: "0 0 0 0 ",
          fontSize,
          height: "60px",
          fontWeight: bold ? "bold" : "",
          //border: "1px solid red",
          boxShadow: "none",
          outline: "none",
        }}
        ref={textareaRef}
      ></textarea>
      <style>
        {`
          ::placeholder {
            font-weight: ${bold ? "bold" : ""};
            font-size: ${fontSize};
          }
        `}
      </style>
      <div
        ref={refLine}
        className="w-full line"
        style={{ height: "1px", backgroundColor: "#767676" }}
      ></div>
      <div
        ref={refSmallText}
        className="w-full flex justify-between small-text-textarea"
        style={{ fontSize: "11px" }}
      >
        <div style={{ color: charCount >= maxChars ? "red" : "" }}>
          {charCount >= maxChars
            ? "Sobrepasastes el limite."
            : "Este es un texto pequeño."}
        </div>
        <div style={{ color: charCount >= maxChars ? "red" : "" }}>
          {charCount}/{maxChars}
        </div>
      </div>
    </div>
  );
};

export default Textarea;
