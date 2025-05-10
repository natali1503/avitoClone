//@ts-expect-error: for test
import React, { FC } from 'react';

import { getIdByText } from '../utils/getIdByText';
import { Categories, CategoriesValues } from '../general/FormField/Categories';

interface IImage {
  type: string;
  src?: string;
  alt?: string;
}
const imgs = {
  realEstate: '/realEstate.png',
  auto: '/auto.png',
  services: '/services.png',
};

export const ImageWithPlaceholder: FC<IImage> = ({ src, alt, type }) => {
  const imageSrc = src || imgs[getIdByText(Categories, type) as CategoriesValues];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '4px',
      }}
    >
      {<img src={imageSrc} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
    </div>
  );
};
