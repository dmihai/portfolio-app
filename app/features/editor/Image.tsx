/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import dragItems from '../../constants/dragItems.json';
import { IImage } from '../../types/interfaces';
import styles from './Image.css';

type ImageProps = {
  image: IImage;
  selectImage: (event: React.MouseEvent, id: string) => void;
  findImage: (id: string) => { index: number };
  moveImage: (id: string, to: number) => void;
};

interface Item {
  type: string;
  id: string;
  originalIndex: number;
}

const Image = ({ image, selectImage, findImage, moveImage }: ImageProps) => {
  const originalIndex = findImage(image.id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dragItems.IMAGE, id: image.id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_dropResult, monitor) => {
      const { id: droppedId, originalIndex: index } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveImage(droppedId, index);
      }
    },
  });

  const [, drop] = useDrop({
    accept: dragItems.IMAGE,
    canDrop: () => true,
    hover({ id: draggedId }: Item) {
      if (draggedId !== image.id) {
        const { index: overIndex } = findImage(image.id);
        moveImage(draggedId, overIndex);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  const selectedClass = image.selected ? styles['image--selected'] : '';
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      className={[styles.image, selectedClass].join(' ')}
      onClick={(event) => selectImage(event, image.id)}
    >
      <img src={`file://${image.path}`} alt={image.name} />
      <div>{image.name}</div>
    </div>
  );
};

export default Image;
