import React from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";

export const Image: React.FC<FastImageProps> = ({ ...props }) => {
    let { source } = props;

    // @ts-ignore
    source["priority"] = FastImage.priority.high;

    return <FastImage {...props} source={source} resizeMode={props.resizeMode || "contain"} />;
};
