// shared/LoadingIndicator.tsx
import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingIndicator: React.FC = () => {
  return (
    <div>
      <Oval
        height={40}
        width={40}
        color="#f2f2f2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#6565a6"
        strokeWidth={8}
        strokeWidthSecondary={6}
      />
    </div>
  );
};

export default LoadingIndicator;
