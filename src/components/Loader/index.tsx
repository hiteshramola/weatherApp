import '../../styles/Loader.scss';

import { useContext, useEffect } from 'react';

import { VariablesContext } from '../../context/Variables';

function Loader() {
  useEffect(() => { });
  const { loader } = useContext(VariablesContext);

  return (
    <div className={"loader_cont" + " " + (loader ? "show" : "")} id="loader_cont">
      <div className="loader">
        <div className="loaderIn">
          <div className="loaderDiv1"></div>
          <div className="loaderDiv2"></div>
        </div>
        <p className="text">
          Lo<span className="textClr">a</span>din<span className="textClr">g</span></p>
      </div>
    </div>
  );
}

export default Loader;
