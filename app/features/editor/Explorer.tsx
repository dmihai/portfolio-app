/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import update from 'immutability-helper';
import styles from './Explorer.css';
import Photo from './Photo';
import PhotoEdit from './PhotoEdit';
import { photoInit } from '../../constants/mocks';
import PhotoContainer from './PhotoContainer';
import { IPhoto } from '../../types/interfaces';

let lastSelectedPhoto = '';

const Explorer = () => {
  const [photos, setPhotos] = useState(photoInit);

  const findPhoto = (id: string) => {
    const index = photos.findIndex((photo) => photo.id === id);
    return {
      photo: photos[index],
      index,
    };
  };

  const movePhoto = (id: string, atIndex: number) => {
    const { photo, index } = findPhoto(id);
    if (photo) {
      setPhotos(
        update(photos, {
          $splice: [
            [index, 1],
            [atIndex, 0, photo],
          ],
        })
      );
    }
  };

  const selectPhoto = (event: React.MouseEvent, id: string) => {
    if (event.ctrlKey) {
      setPhotos(
        photos.map((photo) => ({
          ...photo,
          selected: id === photo.id ? !photo.selected : photo.selected,
        }))
      );
      lastSelectedPhoto = id;
    } else if (event.shiftKey && lastSelectedPhoto !== '') {
      const selection1 = photos.findIndex((photo) => photo.id === id);
      const selection2 = photos.findIndex(
        (photo) => photo.id === lastSelectedPhoto
      );
      if (selection1 >= 0 && selection2 >= 0) {
        const startSelection = Math.min(selection1, selection2);
        const endSelection = Math.max(selection1, selection2);
        setPhotos(
          photos.map((photo, index) => ({
            ...photo,
            selected: index >= startSelection && index <= endSelection,
          }))
        );
      }
    } else {
      setPhotos(
        photos.map((photo) => ({ ...photo, selected: id === photo.id }))
      );
      lastSelectedPhoto = id;
    }
  };

  const selectAll = (select: boolean) =>
    setPhotos(photos.map((photo) => ({ ...photo, selected: select })));

  const addPhotos = (newPhotos: IPhoto[]) => {
    setPhotos([...photos, ...newPhotos]);
  };

  const photosRender = photos.map((photo) => (
    <Photo
      key={photo.id}
      photo={photo}
      selectPhoto={selectPhoto}
      findPhoto={findPhoto}
      movePhoto={movePhoto}
    />
  ));

  const selectedPhotos = photos.filter((photo) => photo.selected);

  return (
    <div>
      <div>
        <button
          type="button"
          className={styles.link}
          onClick={() => selectAll(true)}
          role="link"
        >
          Select all
        </button>
        /
        <button
          type="button"
          className={styles.link}
          onClick={() => selectAll(false)}
          role="link"
        >
          Deselect All
        </button>
      </div>
      <div className={styles.panel}>
        <PhotoContainer addPhotos={addPhotos}>{photosRender}</PhotoContainer>
        <div className={styles.editor}>
          <PhotoEdit photos={selectedPhotos} />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
