import { BirthdayMixer } from "./birthdaymixer";
import { createContext } from "react";

const AudioMixer = new BirthdayMixer();
export const AudioMixerContext = createContext({ audioMixer: AudioMixer });
