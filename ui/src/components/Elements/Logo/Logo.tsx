import React from "react";
import LogoSvg from "../../../assets/flowscale.svg";

interface LogoProps {
  width?: string;
  height?: string;
}

const Logo: React.FC<LogoProps> = ({ width = "30px", height = "30px" }) => {
  return <img src={LogoSvg} alt={"logo"} width={width} height={height} />;
};

export default Logo;
