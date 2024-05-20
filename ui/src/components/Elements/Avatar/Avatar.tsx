import React from "react";
import { Avatar } from "@primer/react";

type AvatarProps = {
  src: string;
  size: {
    narrow: number;
    regular: number;
    wide: number;
  };
  alt: string;
  square?: boolean;
};

const AvatarImage = ({ src, size, alt, square = false }: AvatarProps) => {
  return <Avatar size={size} alt={alt} src={src} square={square} />;
};

export default AvatarImage;
