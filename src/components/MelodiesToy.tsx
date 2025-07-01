import type { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AirplaneTakeoff,
  ArrowsCounterClockwise,
  ArrowsDownUp,
  ArrowsLeftRight,
  CarProfile,
  MagicWand,
  Metronome,
  MusicNote,
  PersonSimpleBike,
  PersonSimpleRun,
  PianoKeys,
  Play,
  Question,
  RocketLaunch,
  Scooter,
  Stop,
  Trash,
  WaveSawtooth,
  WaveSine,
  WaveSquare,
  WaveTriangle,
  X,
} from '@phosphor-icons/react/dist/ssr';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { twJoin } from 'tailwind-merge';
import * as Tone from 'tone';

import NumberField from '@/components/NumberField';
import Popover from '@/components/Popover';
import SelectField from '@/components/SelectField';
import SliderField from '@/components/SliderField';
import Switch from '@/components/Switch';
import Tooltip from '@/components/Tooltip';
import t from '@/utils/i18n';

const SCALE_ROOT_OPTIONS = [
  { value: 'C4', label: 'C' },
  { value: 'C#4', label: 'C#/Db' },
  { value: 'D4', label: 'D' },
  { value: 'D#4', label: 'D#/Eb' },
  { value: 'E4', label: 'E' },
  { value: 'F4', label: 'F' },
  { value: 'F#3', label: 'F#/Gb' },
  { value: 'G3', label: 'G' },
  { value: 'G#3', label: 'G#/Ab' },
  { value: 'A3', label: 'A' },
  { value: 'A#3', label: 'A#/Bb' },
  { value: 'B3', label: 'B' },
];

const SCALE_TYPE_OPTIONS = [
  {
    value: 'major',
    label: t('melodiesToy.scale.major'),
    shortLabel: 'maj',
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],
  },
  {
    value: 'naturalMinor',
    label: t('melodiesToy.scale.naturalMinor'),
    shortLabel: 'min',
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],
  },
  {
    value: 'majorPentatonic',
    label: t('melodiesToy.scale.majorPentatonic'),
    shortLabel: 'maj pent',
    intervals: [0, 2, 4, 7, 9, 12],
  },
  {
    value: 'minorPentatonic',
    label: t('melodiesToy.scale.minorPentatonic'),
    shortLabel: 'min pent',
    intervals: [0, 3, 5, 7, 10, 12],
  },
  {
    value: 'blues',
    label: t('melodiesToy.scale.blues'),
    shortLabel: 'blues',
    intervals: [0, 3, 5, 6, 7, 10, 12],
  },
];

const DRUM_SAMPLES = [
  {
    tone: 'C1',
    name: t('melodiesToy.drumSample.kick'),
    url: 'assets/audio/kick.mp3',
  },
  {
    tone: 'D1',
    name: t('melodiesToy.drumSample.snare'),
    url: 'assets/audio/snare.mp3',
  },
  {
    tone: 'D#1',
    name: t('melodiesToy.drumSample.clap'),
    url: 'assets/audio/clap.mp3',
  },
  {
    tone: 'F#1',
    name: t('melodiesToy.drumSample.hatClosed'),
    url: 'assets/audio/hat-closed.mp3',
  },
  {
    tone: 'A#1',
    name: t('melodiesToy.drumSample.hatOpen'),
    url: 'assets/audio/hat-open.mp3',
  },
  {
    tone: 'C#2',
    name: t('melodiesToy.drumSample.crash'),
    url: 'assets/audio/crash.mp3',
  },
];

type Note = {
  time: Tone.Unit.Time;
  toneIndex: number;
  instrument: 'melody' | 'drums';
};

export default function MelodiesToy() {
  const polySynth = useRef<Tone.PolySynth>();
  const drumSampler = useRef<Tone.Sampler>();
  const metronomeSampler = useRef<Tone.Sampler>();
  const melodyPart = useRef<Tone.Part>();
  const drumPart = useRef<Tone.Part>();
  const metronomeSequence = useRef<Tone.Sequence>();

  const compressor = useRef<Tone.Compressor>();
  const distortion = useRef<Tone.Distortion>();
  const reverb = useRef<Tone.Reverb>();
  const delay = useRef<Tone.PingPongDelay>();
  const widener = useRef<Tone.StereoWidener>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [playheadProgress, setPlayheadProgress] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [isMetronomeEnabled, setIsMetronomeEnabled] = useState(false);
  const [stepCount, _setStepCount] = useState(16);
  const [scaleRoot, setScaleRoot] = useState(SCALE_ROOT_OPTIONS[0]);
  const [scaleType, setScaleType] = useState(SCALE_TYPE_OPTIONS[0]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [playingNotes, setPlayingNotes] = useState<Note[]>([]);
  const [shapeAmount, setShapeAmount] = useState(0);
  const [effectAmount, setEffectAmount] = useState(0.33);

  const boundaryRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'melody' | 'drums'>('melody');

  function areNotesEqual(note1: Note, note2: Note) {
    return (
      note1.time === note2.time &&
      note1.toneIndex === note2.toneIndex &&
      note1.instrument === note2.instrument
    );
  }

  function findNote(note: Note) {
    return notes.find((n) => areNotesEqual(n, note));
  }

  function addNotes(...notes: Note[]) {
    setNotes((prevNotes) => {
      return [...prevNotes, ...notes];
    });
  }

  function removeNote(note: Note) {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => !areNotesEqual(n, note));
    });
  }

  function toggleNote(note: Note): boolean {
    if (findNote(note)) {
      removeNote(note);
      return false;
    } else {
      addNotes(note);
      return true;
    }
  }

  function scrambleMelody(
    strategy: 'pitch' | 'rhythm' | 'pitchAndRhythm' = 'pitchAndRhythm',
  ) {
    setNotes((prevNotes) => {
      const newNotes: Note[] = [];

      for (const prevNote of prevNotes) {
        if (prevNote.instrument !== 'melody') {
          newNotes.push(prevNote);
          continue;
        }

        const newNote = { ...prevNote };

        do {
          if (strategy === 'pitch' || strategy === 'pitchAndRhythm') {
            newNote.toneIndex = Math.floor(Math.random() * scaleTones.length);
          }
          if (strategy === 'rhythm' || strategy === 'pitchAndRhythm') {
            // Weighted random step index, favoring even steps
            let stepIndex = Math.floor(Math.random() * stepCount);
            if (stepIndex % 2 !== 0 && Math.random() < 0.5) stepIndex--;
            newNote.time = `0:0:${stepIndex}`;
          }
        } while (newNotes.some((n) => areNotesEqual(n, newNote)));

        newNotes.push(newNote);
      }

      return newNotes;
    });
  }

  function generateMelody() {
    const MIN_NOTE_COUNT = 4;
    const MAX_NOTE_COUNT = stepCount / 2;
    const noteCount = Math.floor(
      Math.random() * (MAX_NOTE_COUNT - MIN_NOTE_COUNT) + MIN_NOTE_COUNT,
    );

    const generatedNotes: Note[] = [];
    while (generatedNotes.length < noteCount) {
      generatedNotes.push({
        time: '0:0:0',
        toneIndex: 0,
        instrument: 'melody',
      });
    }

    clearMelody();
    addNotes(...generatedNotes);
    scrambleMelody();
  }

  function generateDrums() {
    const STYLES = ['HOUSE', 'HIPHOP'];
    const style = STYLES[Math.floor(Math.random() * STYLES.length)];
    const energy = Math.random();
    const generatedNotes: Note[] = [];

    function addStep(stepIndex: number, toneIndex: number) {
      generatedNotes.push({
        time: `0:0:${stepIndex}`,
        toneIndex: toneIndex,
        instrument: 'drums',
      });
    }

    for (let i = 0; i < stepCount; i++) {
      if (style === 'HOUSE') {
        const kick = i % 4 === 0 ? true : Math.random() < 0.05;
        if (kick) addStep(i, 0);

        if (energy > 0.25) {
          const clap = i % 8 === 4 ? true : Math.random() < 0.05;
          if (clap) addStep(i, 2);
        }

        const closedHat = Math.random() < 0.5 * energy;
        if (closedHat) addStep(i, 3);

        if (energy > 0.5) {
          const openHat = i % 4 === 2;
          if (openHat) addStep(i, 4);
        }
      } else if (style === 'HIPHOP') {
        const kick = i === 0 ? true : Math.random() < 0.2 * energy;
        if (kick) addStep(i, 0);

        const snare = i % 8 === 4 ? true : Math.random() < 0.05 * energy;
        if (snare) addStep(i, 1);

        const closedHat =
          i % 2 === 0 ? Math.random() < energy : Math.random() < 0.2 * energy;
        if (closedHat) addStep(i, 3);

        const openHat = Math.random() < 0.1 * energy;
        if (openHat) addStep(i, 4);
      }
    }

    clearDrums();
    addNotes(...generatedNotes);
  }

  function clearMelody() {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => n.instrument !== 'melody');
    });
  }

  function clearDrums() {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => n.instrument !== 'drums');
    });
  }

  function playNote(time: number, note: Note) {
    if (note.instrument === 'melody') {
      polySynth.current?.triggerAttackRelease(
        scaleTones[note.toneIndex].toFrequency(),
        '16n',
        time,
      );
    } else if (note.instrument === 'drums') {
      const sample = DRUM_SAMPLES[note.toneIndex];
      drumSampler.current?.triggerAttack(sample.tone, time);
    }

    // Add note to playing notes temporarily
    setPlayingNotes((prevNotes) => {
      return [...prevNotes, note];
    });
    setTimeout(() => {
      setPlayingNotes((prevNotes) => {
        return prevNotes.filter((n) => !areNotesEqual(n, note));
      });
    }, 500);
  }

  // Initialize effects, instruments, and parts
  useEffect(() => {
    // Effect chain: Compressor -> Distortion -> Reverb -> Delay -> Stereo Widener
    widener.current = new Tone.StereoWidener().toDestination();
    delay.current = new Tone.PingPongDelay({
      delayTime: '8n',
    }).connect(widener.current);
    reverb.current = new Tone.Reverb({
      decay: 2,
      preDelay: 0.01,
    }).connect(delay.current);
    distortion.current = new Tone.Distortion().connect(reverb.current);
    compressor.current = new Tone.Compressor({
      threshold: -32,
      ratio: 20,
      attack: 0.003,
      release: 0.25,
    }).connect(distortion.current);

    polySynth.current = new Tone.PolySynth({
      voice: Tone.Synth,
      options: {
        envelope: {
          attack: 0,
          decay: 0.25,
          sustain: 1.0,
          release: 0.4,
        },
        volume: -12,
      },
    }).connect(compressor.current);

    drumSampler.current = new Tone.Sampler(
      Object.fromEntries(
        DRUM_SAMPLES.map((sample) => [sample.tone, sample.url]),
      ),
    ).toDestination();

    metronomeSampler.current = new Tone.Sampler({
      urls: {
        D4: 'assets/audio/metronome.mp3',
      },
      volume: -12,
    });

    melodyPart.current = new Tone.Part<Note>(playNote).start(0);
    drumPart.current = new Tone.Part<Note>(playNote).start(0);

    setNotes([
      { time: '0:0:0', toneIndex: 0, instrument: 'drums' },
      { time: '0:0:4', toneIndex: 0, instrument: 'drums' },
      { time: '0:0:8', toneIndex: 0, instrument: 'drums' },
      { time: '0:0:12', toneIndex: 0, instrument: 'drums' },
    ]);
    generateMelody();

    metronomeSequence.current = new Tone.Sequence(
      (time, note) => {
        metronomeSampler.current?.triggerAttackRelease(note, '16n', time);
      },
      ['G4', 'C4', 'C4', 'C4'],
      '4n',
    ).start(0);
  }, []);

  // Play/stop and playhead position
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      Tone.getTransport().start();
      interval = setInterval(() => {
        setPlayheadProgress(Tone.getTransport().progress);
      }, 100);
    } else {
      Tone.getTransport().stop();
      setPlayheadProgress(0);
      if (interval) clearInterval(interval);
      setPlayingNotes([]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Tempo
  useEffect(() => {
    Tone.getTransport().bpm.value = tempo;
  }, [tempo]);

  const tempoIcon = useMemo(() => {
    if (tempo < 80) return PersonSimpleRun;
    if (tempo < 100) return PersonSimpleBike;
    if (tempo < 120) return Scooter;
    if (tempo < 140) return CarProfile;
    if (tempo < 160) return AirplaneTakeoff;
    return RocketLaunch;
  }, [tempo]);

  // Metronome on/off
  useEffect(() => {
    if (isMetronomeEnabled) {
      metronomeSampler.current?.connect(Tone.getDestination());
    } else {
      metronomeSampler.current?.disconnect();
    }
  }, [isMetronomeEnabled]);

  // Timestamp for each step: ["0:0:0", "0:0:1", "0:0:2", ...]
  const stepTimes = useMemo<Tone.Unit.TransportTime[]>(() => {
    const stepTimes: Tone.Unit.TransportTime[] = [];
    for (let step = 0; step < stepCount; step++) {
      stepTimes.push(`0:0:${step}`);
    }
    return stepTimes;
  }, [stepCount]);

  // Loop length
  useEffect(() => {
    Tone.getTransport().loop = true;
    Tone.getTransport().loopEnd = `0:0:${stepCount}`;
  }, [stepCount]);

  // Update parts when notes change
  useEffect(() => {
    melodyPart.current?.clear();
    drumPart.current?.clear();
    notes.forEach((note) => {
      if (note.instrument === 'melody') melodyPart.current?.add(note);
      if (note.instrument === 'drums') drumPart.current?.add(note);
    });

    setPlayingNotes([]);
  }, [notes]);

  // Available tones in the current scale
  const scaleTones = useMemo(() => {
    return Tone.Frequency(scaleRoot.value).harmonize(scaleType.intervals);
  }, [scaleRoot, scaleType]);

  // Update melody notes when scale changes
  useEffect(() => {
    // Remove notes that are out of bounds in the new scale
    notes.forEach((note) => {
      if (note.toneIndex >= scaleTones.length) {
        removeNote(note);
      }
    });

    // Update callback to play notes in the new scale
    melodyPart.current?.set({ callback: playNote });
  }, [scaleTones]);

  // Update effect parameters
  useEffect(() => {
    delay.current?.set({ wet: effectAmount * 0.3 });
    reverb.current?.set({ wet: effectAmount });
    distortion.current?.set({ wet: effectAmount * 0.1 });
    widener.current?.set({ width: effectAmount * 0.2 + 0.5 });
  }, [effectAmount]);

  // Update synth shape
  useEffect(() => {
    // @ts-expect-error Can't find a type for `waveform` that satisfies `oscillator`
    polySynth.current?.set({ oscillator: { type: waveform } });
  }, [shapeAmount]);

  const waveform = useMemo(() => {
    const OSCILLATOR_TYPES: OmniOscillatorType[] = [
      'sine',
      'amsine',
      'triangle',
      'fattriangle',
      'fmsine',
      'fmtriangle',
      'sawtooth',
      'fatsawtooth',
      'amsquare',
      'fmsquare',
      'fatsquare',
    ];
    const index = Math.floor(shapeAmount * (OSCILLATOR_TYPES.length - 1));
    return OSCILLATOR_TYPES[index];
  }, [shapeAmount]);

  const waveformIcon = useMemo(() => {
    switch (waveform) {
      case 'sine':
      case 'amsine':
        return WaveSine;
      case 'triangle':
      case 'fattriangle':
      case 'fmsine':
      case 'fmtriangle':
        return WaveTriangle;
      case 'sawtooth':
      case 'fatsawtooth':
        return WaveSawtooth;
      default:
        return WaveSquare;
    }
  }, [waveform]);

  return (
    <div
      ref={boundaryRef}
      className="flex h-full w-full flex-col overflow-hidden bg-primary text-left text-white sm:text-xl"
    >
      <TooltipProvider delayDuration={200}>
        {/* Top bar */}
        <div className="flex items-center justify-between gap-8 p-6">
          <Popover
            trigger={
              <button
                aria-label="About"
                className="rounded-full bg-white/20 p-2"
              >
                <Question size={24} />
              </button>
            }
            collisionBoundary={boundaryRef}
          >
            <h2 className="font-serif font-medium italic">
              {t('melodiesToy.about.title')}
            </h2>
            <p className="text-subtle">{t('melodiesToy.about.subtitle')}</p>
            <p className="mt-4">{t('melodiesToy.about.paragraph1')}</p>
            <p className="mt-4">{t('melodiesToy.about.paragraph2')}</p>
            <p className="mt-4">{t('melodiesToy.about.paragraph3')}</p>
            <a
              href="https://www.flaticon.com/free-icon/drum_16905582"
              target="_blank"
              title="cultures icons"
              className="mt-4 block text-sm text-subtle underline"
            >
              Drum icon created by Royyan Wijaya on Flaticon
            </a>
          </Popover>
          <div className="flex gap-4 md:gap-6">
            <button
              className={twJoin(
                'flex items-center gap-1 md:gap-2',
                activeTab === 'melody' ? 'opacity-100' : 'opacity-50',
              )}
              onClick={() => setActiveTab('melody')}
            >
              <PianoKeys size={24} />
              {t('melodiesToy.tab.melody')}
            </button>
            <button
              className={twJoin(
                'flex items-center gap-1 md:gap-2',
                activeTab === 'drums' ? 'opacity-100' : 'opacity-50',
              )}
              onClick={() => setActiveTab('drums')}
            >
              <img
                alt=""
                width={24}
                height={24}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAWlBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////9f0VzKAAAAHXRSTlMA72JwfZQCgA39rvicOUSJCOfHIxi+pdYuTlbbVCbtO9UAAAG3SURBVEjH3ZTdkoMgDIUFLSCC+IO2tsv7v+YGFxQR6s5e7TQXzjiTL4FwcoriI4JhzH6RNbaly8N1fWNXuWLoG1NjB5gsseWu4QB2SxLHXNP0g/BHt4Q5EgxHuWU7BgnnHnDMTG6GACCXmyYYzudm73H1MH8gzA+hn7isIEr8bB+6e9/D3kNzN05TN+g1iVIm+3ZsI8bJhFGjQcm4EWk5H9dTrQRVlCol+HR3r4d4Sw7lK2TMtBO+TKdBH/PdQqgKmhAKE+rnR1pXRC+ih0J07yGRqbkkflZnJRLJa4Pk9l8aw1kwXSfjwwhhdOX2RwPAnioD0BDwR8qsrD3SEYBLi0WT1Au5S58AEP99Bo3qjqTGGgN8Rm5j7tMs4N3g5cS8P9wc36EiUg3IJMNKg1QRYH+YxAP0aOpdfFB/wKv4aAKAgDpCfnl5f0kBveOcww/dErYC9AqgIUA/F9jlnQWO8t4XKAPEC+RWdNFFdQaqQi9ztKJkNQGrVjAYFapVgTckTGC1Ga+8fuJCeZvpvf4im7FO816tCcckhZalmF4oVKu3SpI3WP1orRlTGpgxuXRysn1J8f/jG2lJO0WW+l8zAAAAAElFTkSuQmCC"
              />
              {t('melodiesToy.tab.drums')}
            </button>
          </div>
          <a
            href="/"
            aria-label={t('common.close')}
            className="hidden rounded-full bg-white/20 p-2 sm:block"
          >
            <X size={24} />
          </a>
        </div>

        {/* Sequencer section */}
        <div className="relative flex-grow px-6">
          {/* Melody sequencer */}
          {activeTab === 'melody' && (
            <div className="relative flex h-full flex-col-reverse gap-1 lg:gap-2">
              {scaleTones.map((_, toneIndex) => (
                <div
                  key={toneIndex}
                  className="flex flex-grow items-center justify-stretch"
                >
                  <p className="mr-6 hidden w-16 flex-shrink-0 opacity-50 md:block">
                    {scaleTones[toneIndex].toNote().slice(0, -1)}
                  </p>
                  {stepTimes.map((_, stepIndex) => {
                    const note: Note = {
                      toneIndex: toneIndex,
                      time: stepTimes[stepIndex],
                      instrument: 'melody',
                    };
                    const isNoteEnabled = findNote(note);
                    const isNotePlaying = playingNotes.some((n) =>
                      areNotesEqual(n, note),
                    );
                    return (
                      <button
                        key={stepIndex}
                        onClick={() => {
                          if (toggleNote(note) && !isPlaying) {
                            playNote(Tone.now(), note);
                          }
                        }}
                        className={twJoin(
                          'h-full w-full rounded-md bg-default transition-opacity first-of-type:ml-0',
                          stepIndex % 4 === 0 ? 'ml-3 lg:ml-6' : 'ml-1 lg:ml-2',
                          isNoteEnabled ? 'opacity-100' : 'opacity-20',
                          isNotePlaying ? 'animate-step-play' : '',
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          {/* Drums sequencer */}
          {activeTab === 'drums' && (
            <div className="relative flex h-full flex-col-reverse gap-1 lg:gap-2">
              {DRUM_SAMPLES.map((sample, toneIndex) => (
                <div
                  key={sample.tone}
                  className="flex flex-grow items-center justify-stretch"
                >
                  <p className="mr-6 hidden w-16 flex-shrink-0 opacity-50 md:block">
                    {sample.name}
                  </p>
                  {stepTimes.map((_, stepIndex) => {
                    const note: Note = {
                      toneIndex: toneIndex,
                      time: stepTimes[stepIndex],
                      instrument: 'drums',
                    };
                    const isNoteEnabled = findNote(note);
                    const isNotePlaying = playingNotes.some((n) =>
                      areNotesEqual(n, note),
                    );
                    return (
                      <button
                        key={stepIndex}
                        onClick={() => {
                          if (toggleNote(note) && !isPlaying) {
                            playNote(Tone.now(), note);
                          }
                        }}
                        className={twJoin(
                          'h-full w-full rounded-md bg-default transition-opacity first-of-type:ml-0',
                          stepIndex % 4 === 0 ? 'ml-3 lg:ml-6' : 'ml-1 lg:ml-2',
                          isNoteEnabled ? 'opacity-100' : 'opacity-20',
                          isNotePlaying ? 'animate-step-play' : '',
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          {/* Playhead */}
          <div className="pointer-events-none absolute inset-0 md:left-28">
            <div
              className="absolute bottom-0 left-0 top-0 w-0.5 bg-white transition-all duration-75"
              style={{
                left: `${playheadProgress * 100}%`,
                opacity: isPlaying ? 0.5 : 0,
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex gap-6 p-6">
          <div className="hidden flex-[1] gap-4 md:flex">
            {/* Tempo popover */}
            <Popover
              collisionBoundary={boundaryRef}
              trigger={
                <button className="flex flex-shrink-0 items-center gap-1 rounded-full bg-white/20 p-4">
                  <Metronome
                    size={24}
                    className={
                      isMetronomeEnabled ? 'opacity-100' : 'opacity-50'
                    }
                  />
                  <div className="hidden items-baseline gap-1 xl:flex">
                    <span className="font-serif italic">{tempo}</span>
                    <span className="text-base opacity-50">BPM</span>
                  </div>
                </button>
              }
            >
              <label htmlFor="tempoInput">{t('melodiesToy.tempo.title')}</label>
              <div className="flex items-center gap-4">
                <SliderField
                  name="tempoRange"
                  min={60}
                  max={180}
                  step={5}
                  value={tempo}
                  onChange={(value) => setTempo(value)}
                  icon={tempoIcon}
                  aria-hidden
                />
                <NumberField
                  name="tempoInput"
                  value={tempo}
                  onChange={(event) => setTempo(parseInt(event.target.value))}
                  min={60}
                  max={180}
                  step={5}
                  className="w-32"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <label htmlFor="metronomeSwitch">
                  {t('melodiesToy.tempo.metronome')}
                </label>
                <Switch
                  id="metronomeSwitch"
                  checked={isMetronomeEnabled}
                  onChange={(isChecked) =>
                    setIsMetronomeEnabled(isChecked || false)
                  }
                />
              </div>
            </Popover>
            {/* Scale popover */}
            {activeTab === 'melody' && (
              <Popover
                collisionBoundary={boundaryRef}
                trigger={
                  <button className="flex flex-shrink-0 items-center gap-1 rounded-full bg-white/20 p-4">
                    <MusicNote size={24} className="opacity-50" />
                    <span className="hidden font-serif italic xl:block">{`${scaleRoot.label} ${scaleType.shortLabel}`}</span>
                  </button>
                }
              >
                <div className="flex gap-4">
                  <SelectField
                    name="scaleRoot"
                    value={scaleRoot.value}
                    onChange={(event) =>
                      setScaleRoot(
                        SCALE_ROOT_OPTIONS[event.target.selectedIndex],
                      )
                    }
                    aria-label={t('melodiesToy.scale.scaleRoot')}
                  >
                    {SCALE_ROOT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    name="scaleType"
                    value={scaleType.value}
                    onChange={(event) =>
                      setScaleType(
                        SCALE_TYPE_OPTIONS[event.target.selectedIndex],
                      )
                    }
                    aria-label={t('melodiesToy.scale.scaleType')}
                  >
                    {SCALE_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </Popover>
            )}
          </div>
          <div className="flex flex-[2] items-center gap-6 md:justify-center">
            {/* Shape slider */}
            {activeTab === 'melody' && (
              <Tooltip text={t('melodiesToy.toolbar.shape')}>
                <div className="hidden w-full md:block">
                  <SliderField
                    name="shape"
                    min={0}
                    max={1}
                    step={0.01}
                    value={shapeAmount}
                    icon={waveformIcon}
                    onChange={(value) => setShapeAmount(value)}
                    aria-label={t('melodiesToy.toolbar.shape')}
                  />
                </div>
              </Tooltip>
            )}
            {/* Play/stop button */}
            <button
              className="rounded-2xl bg-default px-4 py-4 text-default sm:rounded-full sm:px-16"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={
                isPlaying
                  ? t('melodiesToy.toolbar.stop')
                  : t('melodiesToy.toolbar.play')
              }
            >
              {isPlaying ? <Stop size={24} /> : <Play size={24} />}
            </button>
            {/* Effect slider */}
            {activeTab === 'melody' && (
              <Tooltip text={t('melodiesToy.toolbar.effect')}>
                <div className="hidden w-full md:block">
                  <SliderField
                    name="effect"
                    min={0}
                    max={1}
                    step={0.01}
                    value={effectAmount}
                    icon={MagicWand}
                    onChange={(value) => setEffectAmount(value)}
                    aria-label={t('melodiesToy.toolbar.effect')}
                  />
                </div>
              </Tooltip>
            )}
          </div>
          <div className="flex flex-[1] justify-end gap-4">
            {activeTab === 'melody' && (
              <Tooltip text={t('melodiesToy.toolbar.scramblePitch')}>
                <button
                  className="hidden flex-shrink-0 rounded-2xl bg-white/20 p-4 xl:block"
                  onClick={() => scrambleMelody('pitch')}
                  aria-label={t('melodiesToy.toolbar.scramblePitch')}
                >
                  <ArrowsDownUp size={24} />
                </button>
              </Tooltip>
            )}
            {activeTab === 'melody' && (
              <Tooltip text={t('melodiesToy.toolbar.scrambleRhythm')}>
                <button
                  className="hidden flex-shrink-0 rounded-2xl bg-white/20 p-4 xl:block"
                  onClick={() => scrambleMelody('rhythm')}
                  aria-label={t('melodiesToy.toolbar.scrambleRhythm')}
                >
                  <ArrowsLeftRight size={24} />
                </button>
              </Tooltip>
            )}
            <Tooltip text={t('melodiesToy.toolbar.generate')}>
              <button
                className="flex-shrink-0 rounded-2xl bg-white/20 p-4"
                onClick={
                  activeTab === 'melody' ? generateMelody : generateDrums
                }
                aria-label={t('melodiesToy.toolbar.generate')}
              >
                <ArrowsCounterClockwise size={24} />
              </button>
            </Tooltip>
            <Tooltip text={t('melodiesToy.toolbar.clear')}>
              <button
                className="flex-shrink-0 rounded-2xl bg-white/20 p-4"
                onClick={activeTab === 'melody' ? clearMelody : clearDrums}
                aria-label={t('melodiesToy.toolbar.clear')}
              >
                <Trash size={24} />
              </button>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
