import { getPlaiceholder } from "plaiceholder";

export async function getBlurDataURL(imageUrl) {
    try {
        const response = await fetch(imageUrl)
        const buffer = await response.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        return base64;
    } catch (err) {
        return null;
    }
}
