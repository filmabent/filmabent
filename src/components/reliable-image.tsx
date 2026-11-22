import { useEffect, useRef, type ImgHTMLAttributes } from "react";
import { restoreImage } from "@/lib/media";

export function ReliableImage({ fallback, ...props }: ImgHTMLAttributes<HTMLImageElement> & { fallback: string | null }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const image = ref.current;
    // SSR images may fail before React has attached the error listener.
    if (image?.complete && image.naturalWidth === 0) restoreImage(image, fallback);
  }, [props.src, fallback]);
  return <img {...props} ref={ref} onError={event => restoreImage(event.currentTarget, fallback)} />;
}