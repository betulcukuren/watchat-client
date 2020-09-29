import React, { useEffect } from 'react';

const WindowFocusHandler = ({ setWindowState }) => {
  // User has switched back to the tab
  const onFocus = () => {
    setWindowState(false);
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setWindowState(true);
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  return <></>;
};

export default WindowFocusHandler;
