/**
 * Birthday App that features:
 * - Tone.js for music mixer with 4 stems
 * - Candle Sound Notes going up the scale
 * - Sound Effect on Play
 * - ThreeJS candles on fire, pixelated voxel style
 * - Gradient Background, toon effect with balloons, stars and confetti
 * - Music starts on Play, adding one layer at a time, Grab the age an divide it by 4, where each time a candle is tapped, the stem gets to its full loudness, and filter comes cut off gets removed slowly towards 0 filter.
 * Use threefibre
 */

import { useEffect, useState } from "react";

import { BirthdayMixer } from "./components/birthdaymixer";
import { CandleGame } from "./components/CandleGame";
import { AudioMixerContext } from "./components/AudioMixerContext";
import { useParams, useSearchParams } from "react-router";

export function BirthdayContainer({ ageProp }: { ageProp?: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const age = searchParams.get("age");
  if (age !== null && parseInt(age) > 0) ageProp = parseInt(age);

  const [audioMixer, _] = useState<BirthdayMixer>(new BirthdayMixer());
  const [soundLayersLoaded, setSoundLayersLoaded] = useState<boolean>(false);

  useEffect(() => {
    audioMixer.loadAudios((progress, total, allLoaded) => {
      if (allLoaded) setSoundLayersLoaded(allLoaded);
    });

    return () => {
      audioMixer.stopAndReset();
    };
  }, []);

  return (
    <>
      <AudioMixerContext.Provider
        value={{
          audioMixer: audioMixer,
        }}
      >
        {soundLayersLoaded ? <CandleGame age={ageProp} /> : null}
      </AudioMixerContext.Provider>
    </>
  );
}
