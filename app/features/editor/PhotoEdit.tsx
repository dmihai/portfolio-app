import React from 'react';
import './PhotoEdit.css';

type PhotoEditProps = {
  photos: { id: string; path: string; name: string; selected: boolean }[];
};

const PhotoEdit = ({ photos }: PhotoEditProps) => {
  const photosRender = photos.map((photo) => (
    <div key={photo.id}>{photo.name}</div>
  ));
  return <div>{photosRender}</div>;
};

export default PhotoEdit;
