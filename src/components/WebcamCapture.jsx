import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user",
};

const WebcamCapture = ({ webcamRef }) => {
  return (
    <div>
      <Webcam
        audio={false}
        height={200}
        hidden={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export { WebcamCapture };
