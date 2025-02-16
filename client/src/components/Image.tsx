//@ts-expect-error: for test
import React, { FC } from 'react';

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
        background: 'linear-gradient(to bottom right, #e0e0e0, rgba(176, 176, 176,.02))',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
      }}
    >
      {src && <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
    </div>
  );
};
