import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import styles from './PhotoContainer.css';
import { IPhoto } from '../../types/interfaces';

export interface PhotoContainerProps {
  addPhotos: (newPhotos: IPhoto[]) => void;
  children: JSX.Element[];
}

const PhotoContainer = ({ addPhotos, children }: PhotoContainerProps) => {
  const handleFileDrop = (monitor: DropTargetMonitor) => {
    if (monitor) {
      const { files } = monitor.getItem();
      const newPhotos: IPhoto[] = files.map((file: any) => ({
        id: file.size,
        path: file.path,
        name: file.name,
        selected: false,
      }));
      addPhotos(newPhotos);
    }
  };

  const [, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(_item, monitor) {
      handleFileDrop(monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className={styles.photos}>
      {children}
    </div>
  );
};

export default PhotoContainer;
