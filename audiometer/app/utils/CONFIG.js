// Math utils
export function roundKDigit(num, k) {
  return Math.round(num * Math.pow(10, k)) / Math.pow(10, k);
}

// Audiometry utils
export const DURATION = 10;
export const FREQUENCY = 1000;
export const SAMPLE_RATE = 44100;
export const CHANNEL = 2;
export const MASK_DEFAULT = false;

export const MAX_VOLUME = 1.0;
export const MIN_VOLUME = 0.0;
export const RANGE_VOLUME = MAX_VOLUME - MIN_VOLUME;

export const MAX_DB = 88.9; // Max dB device produces for 1000Hz pure tone [device specific]
export const MIN_DB = 0.0;



// Plotting utils
export function Vol2dB(dB) { return (20 * Math.log10(dB) + MAX_DB) }
export function dB2Vol(dB) { return Math.pow(10, (dB - MAX_DB) / 20); }

export const FREQUENCY_PTS = [125, 250, 500, 1000, 2000, 4000, 8000];
export const AMPLITUDE_PTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]
export const VOLUME_PTS = AMPLITUDE_PTS.map(dB2Vol).map((vol) => roundKDigit(vol, 5));

export function getFrequencyIndex(frequency) { return FREQUENCY_PTS.indexOf(frequency); }
export function getAmplitudeIndex(amplitude) { return AMPLITUDE_PTS.indexOf(amplitude); }
export function getVolumeIndex(volume) { return VOLUME_PTS.indexOf(volume); }




// Audiometry parameters
export const EARS = Object.freeze({ "L": "left", "R": "right" });
export const CONDUCTIONS = Object.freeze({ "A": "air", "B": "bone" });
export const MASKING = Object.freeze({ "MSK": true, "UNMSK": false });
export const RESPONSES = Object.freeze({ "YES": true, "NO": false });
export const MEASUREMENT_TYPES = Object.freeze({
  "AUL": "AIR_UNMASKED_LEFT",
  "AUR": "AIR_UNMASKED_RIGHT",
  "AML": "AIR_MASKED_LEFT",
  "AMR": "AIR_MASKED_RIGHT",
  "BUL": "BONE_UNMASKED_LEFT",
  "BUR": "BONE_UNMASKED_RIGHT",
  "BML": "BONE_MASKED_LEFT",
  "BMR": "BONE_MASKED_RIGHT"
});

export function getMeasurementType(ear = 'left' | 'right', conduction = 'air' | 'bone', masking) {
  const E = (ear == EARS.L || ear == 0) ? "L" : "R";
  const C = (conduction == CONDUCTIONS.A || conduction == 0) ? "A" : "B";
  const M = (masking == MASKING.UNMSK || masking == 0) ? "U" : "M";
  return MEASUREMENT_TYPES[C + M + E];
}

export function RESULT(
  ear = 'left' | 'right',
  conduction = 'air' | 'bone',
  masking = true | false,
  frequency,
  threshold,
  response = true | false
) {
  return {
    "ear": (ear == EARS.L || ear == 0) ? "left" : "right",
    "conduction": (conduction == CONDUCTIONS.A || conduction == 0) ? "air" : "bone",
    "masking": masking,
    "frequency": frequency,
    "threshold": threshold,
    "measurementType": getMeasurementType(ear, conduction, masking),
    "response": response ? RESPONSES.YES : RESPONSES.NO
  }
}

// Audio files
export const PureTones = {
  '125lum': require(`../assets/puretones/tone_125Hz_left_um.wav`),
  '125lm': require(`../assets/puretones/tone_125Hz_left_m.wav`),
  '125rum': require(`../assets/puretones/tone_125Hz_right_um.wav`),
  '125rm': require(`../assets/puretones/tone_125Hz_right_m.wav`),
  '250lum': require(`../assets/puretones/tone_250Hz_left_um.wav`),
  '250lm': require(`../assets/puretones/tone_250Hz_left_m.wav`),
  '250rum': require(`../assets/puretones/tone_250Hz_right_um.wav`),
  '250rm': require(`../assets/puretones/tone_250Hz_right_m.wav`),
  '500lum': require(`../assets/puretones/tone_500Hz_left_um.wav`),
  '500lm': require(`../assets/puretones/tone_500Hz_left_m.wav`),
  '500rum': require(`../assets/puretones/tone_500Hz_right_um.wav`),
  '500rm': require(`../assets/puretones/tone_500Hz_right_m.wav`),
  '1000lum': require(`../assets/puretones/tone_1000Hz_left_um.wav`),
  '1000lm': require(`../assets/puretones/tone_1000Hz_left_m.wav`),
  '1000rum': require(`../assets/puretones/tone_1000Hz_right_um.wav`),
  '1000rm': require(`../assets/puretones/tone_1000Hz_right_m.wav`),
  '2000lum': require(`../assets/puretones/tone_2000Hz_left_um.wav`),
  '2000lm': require(`../assets/puretones/tone_2000Hz_left_m.wav`),
  '2000rum': require(`../assets/puretones/tone_2000Hz_right_um.wav`),
  '2000rm': require(`../assets/puretones/tone_2000Hz_right_m.wav`),
  '4000lum': require(`../assets/puretones/tone_4000Hz_left_um.wav`),
  '4000lm': require(`../assets/puretones/tone_4000Hz_left_m.wav`),
  '4000rum': require(`../assets/puretones/tone_4000Hz_right_um.wav`),
  '4000rm': require(`../assets/puretones/tone_4000Hz_right_m.wav`),
  '8000lum': require(`../assets/puretones/tone_8000Hz_left_um.wav`),
  '8000lm': require(`../assets/puretones/tone_8000Hz_left_m.wav`),
  '8000rum': require(`../assets/puretones/tone_8000Hz_right_um.wav`),
  '8000rm': require(`../assets/puretones/tone_8000Hz_right_m.wav`),
}