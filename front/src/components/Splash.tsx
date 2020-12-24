import { useEffect, useState } from 'react';
import './Splash.css';

export const Splash: React.FC = () => {
  const [enable, setEnable] = useState(true);

  useEffect(() => {
    setTimeout(() => setEnable(false), 5000);
  }, []);

  return (
    <div
      className="Splash"
      style={{
        display: enable ? 'block' : 'none',
      }}
    >
      <div className="Splash-upper-door">
        <div className="Splash-merry">
          <span>m</span>
          <span>e</span>
          <span>r</span>
          <span>r</span>
          <span>y</span>
        </div>
        <div className="Splash-kubesmas">
          <span>k</span>
          <span>u</span>
          <span>b</span>
          <span>e</span>
          <span>s</span>
          <span>m</span>
          <span>a</span>
          <span>s</span>
        </div>
      </div>
      <div className="Splash-lower-door" />
      <div className="Splash-left-top-bar" />
      <div className="Splash-right-top-bar" />
      <div className="Splash-left-bottom-bar" />
      <div className="Splash-right-bottom-bar" />
      <div className="Splash-slider" />
    </div>
  );
}