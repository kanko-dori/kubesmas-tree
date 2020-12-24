import React, { ReactNode } from 'react';
import './Hexagon.css';

const unit = 'vmin';
const sqrt3 = Math.sqrt(3);

type Props = {
  top: number;
  left: number;
  size: number;
  children: ReactNode;
}

export const Hexagon: React.FC<Props> = ({ top, left, size, children }) => (
  <div
    className="Hexagon"
    style={{
      width: `${2 * size}${unit}`,
      height: `${sqrt3 * size}${unit}`,
      top: `${top}${unit}`,
      left: `${left}${unit}`,
    }}
  >
    <div className="Hexagon-inner1">
      <div className="Hexagon-inner2">
        { children }
      </div>
    </div>
  </div>
);