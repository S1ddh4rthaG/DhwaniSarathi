import { DURATION, FREQUENCY, SAMPLE_RATE, CHANNEL, MAX_VOLUME, MASK_DEFAULT } from './CONFIG.js';
import { Vol2dB } from './CONFIG.js';

class PureTone {
  constructor() {
    this.audioCtx = this.getNewContext();

    this.startTime = 0;
    this.endTime = 0;
    this.duration = 0;

    this.playerProps = {
      frequency: FREQUENCY,
      duration: DURATION,
      sampleRate: SAMPLE_RATE,
      channel: CHANNEL,
      volume: MAX_VOLUME,
      mask: MASK_DEFAULT
    };
    this.playState = 1;
  }

  getNewContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }

  getPlayerProps() {
    return this.playerProps;
  }

  setPlayerProps(frequency, duration, sampleRate, channel, volume, mask) {
    this.playerProps = {
      frequency: frequency || this.playerProps.frequency,
      duration: duration || this.playerProps.duration,
      mask: mask || this.playerProps.mask,
      sampleRate: sampleRate || this.playerProps.sampleRate,
      channel: channel || this.playerProps.channel,
      volume: volume || this.playerProps.volume
    }
  }

  // Getters
  getFrequency() {
    return this.playerProps.frequency;
  }

  getDuration() {
    return this.playerProps.duration;
  }

  getSampleRate() {
    return this.playerProps.sampleRate;
  }

  getChannel() {
    switch (this.playerProps.channel) {
      case 0: return "left";
      case 1: return "right";
      case 2: return "stereo";
    }
  }

  getMask() {
    return this.playerProps.mask;
  }

  getVolume(raw = false) {
    if (raw) return this.playerProps.volume;
    return Vol2dB(this.playerProps.volume);
  }


  toneTimer(duration) {
    let seconds = duration;
    const timer = setInterval(() => {
      if (this.playState === 1) {
        seconds -= 1;
      }

      if (seconds <= 0 || this.playState === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  playTone(
    frequency = FREQUENCY,
    duration = DURATION,
    sampleRate = SAMPLE_RATE,
    channel = CHANNEL,
    volume = 1,
    mask = false) {
    if (this.playState == 1 || this.playState == 2) this.stopTone();
    this.setPlayerProps(frequency, duration, sampleRate, channel, volume, mask);

    const inc = (2 * Math.PI * frequency) / sampleRate;
    const numSamples = duration * sampleRate;

    let audioBuffer = this.audioCtx.createBuffer(2, numSamples, sampleRate);
    let audioChannel = []
    let noiseChannel = []

    for (let i = 0; i < numSamples; i++) {
      audioChannel[i] = volume * Math.sin(inc * i);
      noiseChannel[i] = (Math.random() * 2 - 1) * 0.0005;
    }

    if (channel == 0) audioBuffer.getChannelData(0).set(audioChannel);
    else if (channel == 1) audioBuffer.getChannelData(1).set(audioChannel);
    else if (channel == 2) {
      audioBuffer.getChannelData(0).set(audioChannel);
      audioBuffer.getChannelData(1).set(audioChannel);
    }

    if (mask) {
      if (channel == 0) audioBuffer.getChannelData(1).set(noiseChannel);
      else if (channel == 1) audioBuffer.getChannelData(0).set(noiseChannel);
    }

    let source = this.audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioCtx.destination);
    source.start();

    this.playState = 1;
    this.toneTimer(duration);
  }

  pauseTone() {
    this.playState = 2;
    this.audioCtx.suspend();
  }

  resumeTone() {
    this.playState = 1;
    this.audioCtx.resume();
  }

  stopTone() {
    this.playState = 0;
    this.audioCtx.close();
    this.audioCtx = this.getNewContext();
  }
}

export { PureTone };