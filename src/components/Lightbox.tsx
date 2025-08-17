import { useState } from 'preact/hooks';

interface Props {
  images: { src: string; alt: string }[];
}

export default function Lightbox({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  return (
    <div>
      <div class="thumbnails">
        {images.map((img, i) => (
          <img src={img.src} alt={img.alt} onClick={() => open(i)} />
        ))}
      </div>
      {index !== null && (
        <div class="lightbox" onClick={close}>
          <img src={images[index].src} alt={images[index].alt} />
        </div>
      )}
    </div>
  );
}
