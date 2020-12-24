//import { dummyIcon } from '../constants';
import { useLiffInfo } from '../LiffProvider';
import './LiffUser.css';

export const LiffUser = () => {
  const { loggedIn, name, image } = useLiffInfo();
  return (
    <div className="LiffUser">
      {loggedIn && (
        <>
          <img src={image} alt="user icon" className="LiffUser-icon" />
          <p className="LiffUser-name">{ name }</p>
        </>
      )}
    </div>
  );
};