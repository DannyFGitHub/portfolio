import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const icons = [<KeyboardArrowDownIcon />, <KeyboardDoubleArrowDownIcon />];

export function ScrollIndicatorAnimated() {
  const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);

  useEffect(() => {
    const iconSwitchInterval = setInterval(
      () =>
        setCurrentIconIndex((prevState: number) => {
          return (prevState + 1) % icons.length;
        }),
      600
    );

    return () => clearInterval(iconSwitchInterval);
  }, []);

  return <>{icons[currentIconIndex]}</>;
}
