// template = {
//   "ear": "left" | "right",
//   "conduction": "air" | "bone",
//   "masking": true | false,
//   "frequency": 1000,
//   "threshold": 40,
//   "measurementType": "AIR_MASKED_LEFT",
//   "response": "yes" | "no"
// }

// import { PureTone } from "./PureTone.js";
import { FREQUENCY_PTS, AMPLITUDE_PTS, VOLUME_PTS, EARS, RESULT, PureTones } from "./CONFIG";
import { Audio } from 'expo-av';


class Audiometry {
  constructor() {
    this.results = []

    this.freq = FREQUENCY_PTS;
    this.amp = AMPLITUDE_PTS;
    this.vol = VOLUME_PTS;
    // this.OSC = new PureTone();
    this.player = new Audio.Sound();

    this.Eptr = 0;
    this.Mptr = 0;
    this.Fptr = 0;
    this.Aptr = 0;

    this.MAX_E = 2;
    this.MAX_M = 2;
    this.MAX_F = this.freq.length;
    this.MAX_A = this.amp.length;
  }

  getResults() {
    return this.results;
  }

  getFrequencies() {
    return this.freq;
  }

  getAmplitudes() {
    return this.amp;
  }

  start() {
    this.results = [];
    this.Fptr = 0;
    this.Aptr = 0;
    this.Mptr = 0;
    // this.OSC = new PureTone();
    this.player = new Audio.Sound();
  }

  // Getters for View
  getEar() {
    return this.Eptr == 0 ? EARS.L : EARS.R;
  }

  getMask() {
    return this.Mptr == 0 ? false : true;
  }

  getConduction() {
    return "air";
  }

  getFrequency() {
    return this.freq[this.Fptr];
  }

  getThreshold() {
    return this.amp[this.Aptr];
  }

  getVol() {
    return this.vol[this.Aptr];
  }

  // DFA based on response
  updatePtrs() {
    this.Aptr += 1;
    if (this.Aptr >= this.MAX_A) {
      this.Aptr = 0;
      this.Fptr += 1;
    }

    if (this.Fptr >= this.MAX_F) {
      this.Fptr = 0;
      this.Mptr += 1;
    }

    if (this.Mptr >= this.MAX_M) {
      this.Mptr = 0;
      this.Eptr += 1;
    }

    if (this.Eptr >= this.MAX_E) {
      return false;
    }
  }

  isTestOver() {
    return (this.Eptr >= this.MAX_E);
  }

  playTone() {
    // this.player.unloadAsync();
    // wait for it to be unloaded
    // setInterval(() => {
    // console.log(this.player.getStatusAsync())
    // }, 10);

    const SoundFile = PureTones[this.getFrequency() + this.getEar()[0] + (this.getMask() == true ? 'm' : 'um')]
    this.player.loadAsync(SoundFile).then(() => {
      this.player.setVolumeAsync(Math.min(this.getVol(), 1));
      this.player.playAsync();
    });
  }

  regResponse(response, onlyYes = true) {
    //check whether player is playing
    console.log(this.player.getStatusAsync())
    if (this.player.getStatusAsync()._j.isLoaded !== false) {
      this.player.setVolumeAsync(0);
      this.player.unloadAsync();

      this.player = new Audio.Sound();
    }
    // this.player.unloadAsync();

    if (this.isTestOver()) return true;

    if (onlyYes && response) {
      this.results.push(RESULT(
        this.Eptr,
        0,
        this.getMask(),
        this.getFrequency(),
        this.getThreshold(),
        response
      ));

      console.log(this.results)
      this.Aptr = this.MAX_A;
    }
    this.updatePtrs();
  }
}

export { Audiometry };