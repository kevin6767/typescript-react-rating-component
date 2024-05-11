import { ReactNode } from "react";

async function fetchSVG(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        const svgContent = await response.text();
        return svgContent;
    } catch (error) {
        console.error('Error fetching SVG:', error);
        return null;
    }
}

export async function sliceIconFromURL(url: string, noUrlSvgElement?: string, useStroke?: boolean, strokeOrFillColor?: string): Promise<{ defaultLeft: string; defaultRight: string; hoverLeft: string; hoverRight: string } | null> {
    const svgContent = (url && await fetchSVG(url)) || noUrlSvgElement;
    if (!svgContent) return null;

    // Parse the SVG string into a DOM object
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;

    // Get the original viewBox dimensions
    const originalViewBox = svgElement.getAttribute('viewBox')!.split(' ').map(parseFloat);
    const originalWidth = originalViewBox[2];
    const originalHeight = originalViewBox[3];

    // Slice the SVG in half horizontally for default state
    const defaultLeft = svgElement.cloneNode(true) as SVGElement;
    defaultLeft.setAttribute('viewBox', `0 0 ${originalWidth / 2} ${originalHeight}`);
    defaultLeft.setAttribute('width', `${originalWidth / 2}`);

    const defaultRight = svgElement.cloneNode(true) as SVGElement;
    defaultRight.setAttribute('viewBox', `${originalWidth / 2} 0 ${originalWidth / 2} ${originalHeight}`);
    defaultRight.setAttribute('width', `${originalWidth / 2}`);

    // Slice the SVG in half horizontally for hover state
    const hoverLeft = svgElement.cloneNode(true) as SVGElement;
    hoverLeft.setAttribute('viewBox', `0 0 ${originalWidth / 2} ${originalHeight}`);
    hoverLeft.setAttribute('width', `${originalWidth / 2}`);
    hoverLeft.setAttribute('class', 'hoverIcon');
    hoverLeft.querySelectorAll('*').forEach(element => {
        // Apply styles to all SVG elements within the left half for hover state
        element.setAttribute(useStroke ? 'stroke' : 'fill', strokeOrFillColor || 'gold'); // Example stroke color
    });

    const hoverRight = svgElement.cloneNode(true) as SVGElement;
    hoverRight.setAttribute('viewBox', `${originalWidth / 2} 0 ${originalWidth / 2} ${originalHeight}`);
    hoverRight.setAttribute('width', `${originalWidth / 2}`);
    hoverRight.setAttribute('class', 'hoverIcon');
    hoverRight.querySelectorAll('*').forEach(element => {
        // Apply styles to all SVG elements within the right half for hover state
        element.setAttribute(useStroke ? 'stroke' : 'fill', strokeOrFillColor || 'gold'); // Example fill color
    });

    // Convert the SVG halves back to strings
    const defaultLeftString = new XMLSerializer().serializeToString(defaultLeft);
    const defaultRightString = new XMLSerializer().serializeToString(defaultRight);
    const hoverLeftString = new XMLSerializer().serializeToString(hoverLeft);
    const hoverRightString = new XMLSerializer().serializeToString(hoverRight);

    return { defaultLeft: defaultLeftString, defaultRight: defaultRightString, hoverLeft: hoverLeftString, hoverRight: hoverRightString };
}

// Example usage:
export const svgURL = '/static/media/star.8c08c804182323c192ed2f268866cc35.svg'; // Replace this with your SVG file URL
