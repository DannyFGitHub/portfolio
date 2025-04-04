import { useContext, useEffect, useState } from "react";
import { AudioMixerContext } from "./AudioMixerContext";
import { LayerInterface } from "./birthdaymixer";
import { BDayCanvas } from "./BdayCanvas";
import { ShareBDay } from "./ShareBDay";
import { BdayButton } from "./BdayButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function prepareCandles(age: number) {
  let candleLife = 1;
  let candleLogic = [];
  for (let i = 0; i < age; i++) {
    candleLogic[i] = {
      numBlowsToExtinguish:
        candleLife === 1 ? 1 : Math.floor(Math.random() * candleLife) + 1,
    };
  }
  return candleLogic;
}

const Stages = [
  {
    mLayers: [],
  },
  {
    mLayers: ["drums"],
  },
  {
    mLayers: ["SynthLayer1", "plucks"],
  },
  {
    mLayers: ["bass"],
  },
  {
    mLayers: ["SynthLayer2"],
  },
];

export function CandleGame({ age }: { age?: number }) {
  const { audioMixer } = useContext(AudioMixerContext);

  if (age === undefined || age === null || age <= 0 || age > 150)
    age = new Date(Date.now()).getFullYear() - 1995;

  const [candleLogic, setCandleLogic] = useState(prepareCandles(age));
  const [currentStage, setCurrentStage] = useState(1);
  const [startGame, setStartGame] = useState(false);
  const [candleGameCompleted, setCandleGameCompleted] = useState(false);

  useEffect(() => {
    const stages = Stages.length;
    const candlesPerStage = candleLogic.length / stages;
    const stage = Math.floor(
      stages -
        candleLogic?.filter((candle) => {
          return candle.numBlowsToExtinguish > 0;
        }).length /
          candlesPerStage +
        1
    );

    // Unmute nextstage if available
    const nextStageIndex = stage;
    if (nextStageIndex < Stages.length) {
      let nextStagelayers: LayerInterface[] | undefined =
        audioMixer.mixer.filter((item) => {
          return Stages[nextStageIndex].mLayers.includes(item.name);
        });
      for (let layer of nextStagelayers) {
        if (layer.channel && layer.filter && layer.player) {
          layer.channel.set({ mute: false });
        }
      }
    }

    if (stage === Stages.length + 1) {
      let allStageLayers: string[] = [];
      Stages.forEach((s) => {
        allStageLayers.push(...s.mLayers);
      });

      let currentStageLayers: LayerInterface[] | undefined =
        audioMixer.mixer.filter((item) => {
          return allStageLayers.includes(item.name);
        });

      for (let layer of currentStageLayers) {
        if (layer.channel && layer.filter && layer.player) {
          layer.channel.set({ mute: false });
          layer.filter.disconnect();
          layer.player.connect(layer.channel);
        }
      }

      audioMixer.mixer
        .find((i: LayerInterface) => {
          return i.name === "spotlightFx";
        })
        ?.sampler?.triggerAttack("C3");

      audioMixer.mixer
        .find((i: LayerInterface) => {
          return i.name === "noisemakerFx";
        })
        ?.sampler?.triggerAttack("C3");
      setCandleGameCompleted(true);
    }

    setCurrentStage(stage);
  }, [candleLogic]);

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {startGame ? (
        <BDayCanvas
          age={age}
          candleLogic={candleLogic}
          setCandleLogic={setCandleLogic}
          audioMixer={audioMixer}
          isGameCompleted={candleGameCompleted}
        />
      ) : null}
      <Box
        maxWidth="sm"
        style={{
          bottom: "64px",
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
      >
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          borderRadius={1}
          p={2}
          style={{
            background: "white",
            opacity: "0.8",
            color: "rgb(74, 74, 74)",
          }}
        >
          {candleGameCompleted ? (
            <ShareBDay />
          ) : (
            <>
              {!startGame ? (
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1" fontFamily="start">
                    Happy Birthday!
                    <br />
                    {age
                      ? "That's " +
                        age +
                        " good year" +
                        (age === 1 ? "" : "s") +
                        "."
                      : ""}
                  </Typography>
                </div>
              ) : null}
              <Typography variant="body2" fontFamily="start" textAlign="center">
                Hover over the candle's fire to blow all the candles out. Scroll
                to rotate the cake.
              </Typography>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  pointerEvents: "auto",
                }}
              >
                {!startGame ? (
                  <BdayButton
                    onClick={(_: React.MouseEvent<HTMLButtonElement>) => {
                      audioMixer.startAudio();
                      setStartGame(true);
                    }}
                  >
                    Start
                  </BdayButton>
                ) : null}
              </div>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
