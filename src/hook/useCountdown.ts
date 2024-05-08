import React, { useState } from "react";

export function useCountdown(seconds: number, onEnd?: () => any) {
  let [remaining, setRemaining] = React.useState(seconds);
  const [runCountDown, setRunCountDown] = useState<boolean>(false);
  React.useEffect(() => {
    function tick() {
      if (remaining === 0) {
        clearInterval(countdown);

        onEnd && onEnd();
        setRunCountDown(false);
        return;
      }
      setRemaining(remaining - 1);
    }
    let countdown: NodeJS.Timeout | undefined;
    if (runCountDown) {
      countdown = setInterval(tick, 1000);
    }

    return () => clearInterval(countdown);
  }, [runCountDown, remaining]);

  const handleRunCountDown = () => {
    setRemaining(seconds);
    setRunCountDown(true);
  };

  return { remaining, handleRunCountDown };
}
