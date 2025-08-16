// components/molecules/CursorFactory/CursorFactory.tsx
import React from 'react';
import MouseDefault from '../../atoms/MouseDefault/MouseDefault';
import MouseLoading from '../../atoms/MouseLoading/MouseLoading';
//import MouseText from '../../atoms/MouseText/MouseText';
//import MouseButton from '../../atoms/MouseButton/MouseButton';
// ... import other cursor types

import { CursorType } from '../../../contexts/MouseCursorContext/MouseCursorContext';

interface CursorFactoryProps {
  type: CursorType;
}

const CursorFactory: React.FC<CursorFactoryProps> = ({ type }) => {
  switch (type) {
    case 'loading':
      return <MouseLoading />;
    case 'text':
      return //<MouseText />;
    case 'button':
      return //<MouseButton />;
    case 'link':
      return //<MouseLink />;
    case 'disabled':
      return //<MouseDisabled />;
    case 'drag':
      return //<MouseDrag />;
    case 'default':
    default:
      return <MouseDefault />;
  }
};

export default CursorFactory;