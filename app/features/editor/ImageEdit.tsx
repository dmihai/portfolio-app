import React from 'react';
import './ImageEdit.css';

type ImageEditProps = {
  images: { id: string; path: string; name: string; selected: boolean }[];
};

const ImageEdit = ({ images }: ImageEditProps) => {
  const imagesRender = images.map((image) => (
    <div key={image.id}>{image.name}</div>
  ));
  return <div>{imagesRender}</div>;
};

export default ImageEdit;
