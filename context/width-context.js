import react, { useEffect, useRef, useState } from "react";

const WidthContext = react.createContext({
  docWidth: 0,
});

export const WidthContextProvider = (props) => {
  const [docWidth, setDocWidth] = useState(300);

  useEffect(() => {
    setDocWidth(document.documentElement.clientWidth);

    const resetWidthFunction = () => {
      setDocWidth(document.documentElement.clientWidth);
    };

    window.addEventListener("resize", resetWidthFunction);

    return () => {
      window.removeEventListener("resize", resetWidthFunction);
    };
  }, []);

  return (
    <WidthContext.Provider
      value={{
        docWidth,
      }}
    >
      {props.children}
    </WidthContext.Provider>
  );
};

export default WidthContext;
