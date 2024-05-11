import React, { useEffect, useState } from "react";
import { sliceIconFromURL, svgURL } from "./utils/svg-helper";

const SVG_DATA_TYPING = `data:image/svg+xml;utf8,`;
const DEFAULT_CLASS_NAME = "half-svg";

type RatingContainerProps = {
    ratingCount?: number;
    className?: string;
};

const RatingContainer = ({ ratingCount = 1, className }: RatingContainerProps) => {
    const [leftHalfSvg, setLeftHalfSvg] = useState<string | number | boolean>('');
    const [rightHalfSvg, setRightHalfSvg] = useState<string | number | boolean>('');
    const [leftHalfSvgHovered, setLeftHalfHoveredSvg] = useState<string | number | boolean>('');
    const [rightHalfSvgHovered, setRightHalfHoveredSvg] = useState<string | number | boolean>('');
    const [hoveredSvg, setHoveredSvg] = useState<number | null>(null);

    useEffect(() => {
        sliceIconFromURL(svgURL).then((slicedIcon) => {
            if (slicedIcon) {
                setLeftHalfSvg(slicedIcon.defaultLeft.toString());
                setRightHalfSvg(slicedIcon.defaultRight.toString());
                setLeftHalfHoveredSvg(slicedIcon.hoverLeft.toString());
                setRightHalfHoveredSvg(slicedIcon.hoverRight.toString());
            }
        });
    }, []);

    const handleHalfHover = (index: number) => {
        setHoveredSvg(index);
    };

    return (
        <div className="ratingContainer">
            {[...Array(ratingCount)].map((_, index) => {
                const number = index + 1;
                const svgSrc = index === hoveredSvg ? (number % 2 === 1 ? leftHalfSvgHovered : rightHalfSvgHovered) : (number % 2 === 1 ? leftHalfSvg : rightHalfSvg);
                if (!svgSrc) return null; // Return null if SVG is not fetched yet
                return (
                    <div
                        key={number}
                        onMouseOver={() => handleHalfHover(index)}
                        onMouseOut={() => setHoveredSvg(null)}
                    >
                        <img
                            src={`${SVG_DATA_TYPING}${encodeURIComponent(svgSrc)}`}
                            className={className || DEFAULT_CLASS_NAME}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default RatingContainer;
