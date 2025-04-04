import * as Tone from "tone";

import drumsFileName from "../audio/HBD_128BPM_38B_Drums.mp3";
import bassFileName from "../audio/HBD_128BPM_38B_Bass.mp3";
import plucksPercussionFileName from "../audio/HBD_128BPM_38B_PlucksPerc.mp3";
import layer1FileName from "../audio/HBD_128BPM_38B_SLayer1.mp3";
import layer2FileName from "../audio/HBD_128BPM_38B_SLayer2.mp3";
import sfxFileName from "../audio/HappyBirthdaySFX.mp3";
import shortSfxFileName from "../audio/HappyBirthdaySFXShorter.mp3";
import noisemakerSfxFileName from "../audio/noisemakers.mp3";
import spotlightSfxFileName from "../audio/spotlight.mp3";

export interface LayerInterface {
  loaded: boolean;
  name: string;
  fileName: string;
  pan: number;
  volume: number;
  mute: boolean;
  loop: boolean;
  filter: null | Tone.Filter;
  channel: null | Tone.Channel;
  player: null | Tone.Player;
  sampler: null | Tone.Sampler;
  type: "sfx" | "music";
}

export class BirthdayMixer {
  isMusicStarted = false;
  allLoaded = false;
  mixer: LayerInterface[] = [
    {
      loaded: false,
      name: "drums",
      fileName: drumsFileName,
      pan: 0,
      volume: 0,
      mute: true,
      loop: true,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "music",
    },
    {
      loaded: false,
      name: "bass",
      fileName: bassFileName,
      pan: 0,
      volume: 0,
      mute: true,
      loop: true,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "music",
    },
    {
      loaded: false,
      name: "plucks",
      fileName: plucksPercussionFileName,
      pan: 0.05,
      volume: 0,
      mute: true,
      loop: true,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "music",
    },
    {
      loaded: false,
      name: "SynthLayer1",
      fileName: layer1FileName,
      pan: -0.05,
      volume: 0,
      mute: true,
      loop: true,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "music",
    },
    {
      loaded: false,
      name: "SynthLayer2",
      fileName: layer2FileName,
      pan: 0.1,
      volume: 0,
      mute: true,
      loop: true,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "music",
    },
    {
      loaded: false,
      name: "ShortFx",
      fileName: shortSfxFileName,
      pan: 0,
      volume: -12,
      mute: false,
      loop: false,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "sfx",
    },
    {
      loaded: false,
      name: "LongFx",
      fileName: sfxFileName,
      pan: 0,
      volume: 0,
      mute: false,
      loop: false,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "sfx",
    },
    {
      loaded: false,
      name: "spotlightFx",
      fileName: spotlightSfxFileName,
      pan: 0,
      volume: 5,
      mute: false,
      loop: false,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "sfx",
    },
    {
      loaded: false,
      name: "noisemakerFx",
      fileName: noisemakerSfxFileName,
      pan: 0,
      volume: -6,
      mute: false,
      loop: false,
      filter: null,
      channel: null,
      player: null,
      sampler: null,
      type: "sfx",
    },
  ];

  constructor() {}

  loadAudios(
    onLoadProgress: (
      progress: number,
      total: number,
      allLoaded: boolean
    ) => void
  ) {
    for (let k in this.mixer) {
      if (this.mixer[k].type === "music") {
        const channel = new Tone.Channel({
          pan: this.mixer[k].pan,
          volume: this.mixer[k].volume,
          mute: this.mixer[k].mute,
        }).toDestination();
        const player = new Tone.Player(this.mixer[k].fileName, () => {
          this.mixer[k].loaded = true;
          this.updateLoaded(onLoadProgress);
        })
          .sync()
          .start(1);
        player.set({ loop: this.mixer[k].loop });

        const filter = new Tone.Filter(900, "bandpass");
        filter.connect(channel);
        player.connect(filter);
        filter.set({});
        this.mixer[k] = {
          ...this.mixer[k],
          player,
          filter,
          channel,
        };
      } else if (this.mixer[k].type === "sfx") {
        const sampler = new Tone.Sampler(
          {
            C3: this.mixer[k].fileName,
          },
          {
            volume: this.mixer[k].volume,
            onload: () => {
              this.mixer[k].loaded = true;
              this.updateLoaded(onLoadProgress);
            },
          }
        );
        sampler.toDestination();
        this.mixer[k].sampler = sampler;
      }
    }
  }

  updateLoaded(
    onLoadProgress: (
      progress: number,
      total: number,
      allLoaded: boolean
    ) => void
  ) {
    let allLoaded = true;
    let itemsLoadedCount = 0;
    this.mixer.forEach((item) => {
      item.loaded ? itemsLoadedCount++ : 0;
      allLoaded &&= item.loaded;
    });
    if (onLoadProgress) {
      onLoadProgress(itemsLoadedCount, this.mixer.length, allLoaded);
    }
  }

  startAudio() {
    if (!this.isMusicStarted) {
      Tone.start().then(() => {
        Tone.getTransport().start();
      });
      this.isMusicStarted = true;
    }
  }

  stopAndReset() {
    Tone.getTransport().stop();
    Tone.getTransport().position = 0;
    Tone.getTransport().cancel();
  }

  makeChannel(
    name: string,
    url: string,
    pan: number,
    volume: number,
    mute: boolean,
    onloadCallback: () => void
  ) {}
}
