import { ChangeEvent, useState } from "react";
import { BdayButton } from "./BdayButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function ShareBDay() {
  const [showShare, setShowShare] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>(window.location.href);
  const [age, setAge] = useState<number>(1);

  function onHandleInput(num: number) {
    setAge(num);
    setShareLink(
      location.protocol +
        "//" +
        location.host +
        location.pathname +
        "?age=" +
        num
    );
  }

  return (
    <Box
      style={{
        pointerEvents: "auto",
      }}
    >
      {showShare ? (
        <Box>
          <Typography variant="body2" fontFamily="start" textAlign="center">
            Send this to someone on their birthday.
          </Typography>
          <br />
          <Typography variant="body2" fontFamily="start" textAlign="center">
            What's their age?
            <input
              style={{
                fontSize: "2rem",
                margin: "1rem",
              }}
              type="number"
              name="Age"
              pattern="[0-9]*"
              max={150}
              min={0}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onHandleInput(parseInt(event.target.value));
              }}
              value={age}
            />
          </Typography>
          <br />
          <Typography variant="body2" textAlign="center">
            {shareLink + ""}
          </Typography>
          <br />
          <Box display="flex" justifyContent="center">
            <BdayButton
              onClick={() => {
                navigator.clipboard.writeText(shareLink).then(
                  () => {
                    console.log("clipboard successfully set");
                  },
                  () => {
                    console.error("clipboard write failed");
                  }
                );
              }}
            >
              Copy to Clipboard
            </BdayButton>
          </Box>
        </Box>
      ) : (
        <BdayButton
          onClick={() => {
            setShowShare(true);
          }}
        >
          Share
        </BdayButton>
      )}
    </Box>
  );
}
