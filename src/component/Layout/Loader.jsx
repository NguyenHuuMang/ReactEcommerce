import React from "react";
import animationData from "../../Assests/animations/29554-delivery-service.json";
import { Player } from "@lottiefiles/react-lottie-player";

const Loader = () => {
  <Player src={animationData} className="player" loop autoplay />;

  return (
    //<div  className="w-[90vh] h-[40vh] flex items-center justify-center">
    <div>
      <Player
        src={animationData}
        className="player"
        loop
        autoplay
        style={{ height: "300px", width: "300px" }}
      />
      ;
    </div>
  );
};

export default Loader;
