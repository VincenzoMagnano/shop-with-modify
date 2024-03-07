import React, { FC } from "react";
import "./Button.css";

interface ButtonProps {
  //onClick: () => void;
  children: string
  backColor?: string
  padding?: string
}

const Button: FC<ButtonProps> = ({ children, backColor="primary", padding="8" }) => {
  return (
    <button className={`btn btn-${backColor}`} style={{ padding: `${padding}px`}} >
      {children}
    </button>
  );
};

export default Button;
