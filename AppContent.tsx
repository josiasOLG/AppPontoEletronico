import React from "react";
import Routes from "./src/routes/Routes";
import SplashScreen from "./src/atoms/SplashScreen/SplashScreen";
import LoadingPageAtom from "./src/atoms/LoadingPageAtom/LoadingPageAtom";
import { useSelector } from "react-redux";

const AppContent = ({ animationDone, onAnimationFinish }) => {
  const isLoading = useSelector((state: any) => state?.loading?.isLoading);

  return animationDone ? (
    <>
      <Routes />
      {isLoading && <LoadingPageAtom />}
    </>
  ) : (
    <SplashScreen onAnimationFinish={() => onAnimationFinish()} />
  );
};

export default AppContent;
