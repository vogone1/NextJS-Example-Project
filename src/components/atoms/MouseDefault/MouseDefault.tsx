import React, { FC } from 'react';
import './MouseDefault.scss';

interface MouseDefaultProps { }

const MouseDefault: FC<MouseDefaultProps> = () => (
  <div className="MouseDefault" style={{
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    border: '3px solid yellow',
    position: 'relative',
    zIndex: 10000
  }}>
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold'
    }}>
      DEFAULT
    </div>
  </div>
);

export default MouseDefault;