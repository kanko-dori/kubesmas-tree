import React, { useEffect, useState } from 'react';
import { zeroPadding } from '../utils';
import './Calendar.css';

export const Calendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    setTimeout(() => setDate(new Date()), 3600);
  });

  return (
    <div className="Calendar">
      <p className="Calendar-months-wrapper">
        <span className="Calendar-months">{zeroPadding(date.getMonth() + 1)}</span>
      </p>
      <p className="Calendar-days-wrapper">
        <span className="Calendar-days">{zeroPadding(date.getDate())}</span>
      </p>
    </div>
  );
}