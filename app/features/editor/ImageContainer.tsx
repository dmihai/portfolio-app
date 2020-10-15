import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import styles from './ImageContainer.css';
import { IImage } from '../../types/interfaces';

export interface ImageContainerProps {
  addImages: (newImages: IImage[]) => void;
  children: JSX.Element[];
}

const ImageContainer = ({ addImages, children }: ImageContainerProps) => {
  const handleFileDrop = (monitor: DropTargetMonitor) => {
    if (monitor) {
      const { files } = monitor.getItem();
      const newImages: IImage[] = files.map((file: any) => ({
        id: file.size,
        path: file.path,
        name: file.name,
        selected: false,
      }));
      addImages(newImages);
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
    <div ref={drop} className={styles.images}>
      {children}
    </div>
  );
};

export default ImageContainer;
