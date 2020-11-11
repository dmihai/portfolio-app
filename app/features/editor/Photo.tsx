/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import dragItems from '../../constants/dragItems.json';
import { IPhoto } from '../../types/interfaces';
import styles from './Photo.css';

type PhotoProps = {
  photo: IPhoto;
  selectPhoto: (event: React.MouseEvent, id: string) => void;
  findPhoto: (id: string) => { index: number };
  movePhoto: (id: string, to: number) => void;
};

interface Item {
  type: string;
  id: string;
  originalIndex: number;
}

const Photo = ({ photo, selectPhoto, findPhoto, movePhoto }: PhotoProps) => {
  const originalIndex = findPhoto(photo.id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dragItems.PHOTO, id: photo.id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_dropResult, monitor) => {
      const { id: droppedId, originalIndex: index } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        movePhoto(droppedId, index);
      }
    },
  });

  const [, drop] = useDrop({
    accept: dragItems.PHOTO,
    canDrop: () => true,
    hover({ id: draggedId }: Item) {
      if (draggedId !== photo.id) {
        const { index: overIndex } = findPhoto(photo.id);
        movePhoto(draggedId, overIndex);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  const selectedClass = photo.selected ? styles['photo--selected'] : '';
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      className={[styles.photo, selectedClass].join(' ')}
      onClick={(event) => selectPhoto(event, photo.id)}
    >
      <img src={`file://${photo.path}`} alt={photo.name} />
      <div>{photo.name}</div>
    </div>
  );
};

export default Photo;
