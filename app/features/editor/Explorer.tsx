/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import update from 'immutability-helper';
import styles from './Explorer.css';
import Image from './Image';
import ImageEdit from './ImageEdit';
import { imageInit } from '../../constants/mocks';
import ImageContainer from './ImageContainer';
import { IImage } from '../../types/interfaces';

let lastSelectedImage = '';

const Explorer = () => {
  const [images, setImages] = useState(imageInit);

  const findImage = (id: string) => {
    const index = images.findIndex((image) => image.id === id);
    return {
      image: images[index],
      index,
    };
  };

  const moveImage = (id: string, atIndex: number) => {
    const { image, index } = findImage(id);
    if (image) {
      setImages(
        update(images, {
          $splice: [
            [index, 1],
            [atIndex, 0, image],
          ],
        })
      );
    }
  };

  const selectImage = (event: React.MouseEvent, id: string) => {
    if (event.ctrlKey) {
      setImages(
        images.map((image) => ({
          ...image,
          selected: id === image.id ? !image.selected : image.selected,
        }))
      );
      lastSelectedImage = id;
    } else if (event.shiftKey && lastSelectedImage !== '') {
      const selection1 = images.findIndex((image) => image.id === id);
      const selection2 = images.findIndex(
        (image) => image.id === lastSelectedImage
      );
      if (selection1 >= 0 && selection2 >= 0) {
        const startSelection = Math.min(selection1, selection2);
        const endSelection = Math.max(selection1, selection2);
        setImages(
          images.map((image, index) => ({
            ...image,
            selected: index >= startSelection && index <= endSelection,
          }))
        );
      }
    } else {
      setImages(
        images.map((image) => ({ ...image, selected: id === image.id }))
      );
      lastSelectedImage = id;
    }
  };

  const selectAll = (select: boolean) =>
    setImages(images.map((image) => ({ ...image, selected: select })));

  const addImages = (newImages: IImage[]) => {
    setImages([...images, ...newImages]);
  };

  const imagesRender = images.map((image) => (
    <Image
      key={image.id}
      image={image}
      selectImage={selectImage}
      findImage={findImage}
      moveImage={moveImage}
    />
  ));

  const selectedImages = images.filter((image) => image.selected);

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
        <ImageContainer addImages={addImages}>{imagesRender}</ImageContainer>
        <div className={styles.editor}>
          <ImageEdit images={selectedImages} />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
