import { FC } from 'react';
interface IImage {
  src?: string;
  alt?: string;
}
export const ImageWithPlaceholder: FC<IImage> = ({ src, alt }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(to bottom right, #e0e0e0, rgba(176, 176, 176,.02))',
        borderRadius: '10px',
      }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </div>
  );
};
