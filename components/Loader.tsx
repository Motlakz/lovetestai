import { 
  GiHeartBeats, 
  GiCalculator, 
  GiSquare 
} from 'react-icons/gi';

const AnimatedLoader = () => {
  return (
    <div className="loader-container m-auto relative bg-white/10">
      {/* Heart Icon */}
      <div className="loader-item heart">
        <GiHeartBeats />
      </div>
      
      {/* Calculator Icon */}
      <div className="loader-item calculator">
        <GiCalculator />
      </div>
      
      {/* Rotating Squares */}
      <div className="loader-item squares">
        <GiSquare className="square square1" />
        <GiSquare className="square square2" />
      </div>
      
      {/* Floating Bubbles */}
      <div className="loader-item bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </div>
  );
};

export default AnimatedLoader;
