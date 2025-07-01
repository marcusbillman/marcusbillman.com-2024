import AudioFileIllustration from './AudioFileIllustration';
import BezierCurveIllustration from './BezierCurveIllustration';
import BrowserIllustration from './BrowserIllustration';
import ButtonClickIllustration from './ButtonClickIllustration';
import CableIllustration from './CableIllustration';
import ChatIllustration from './ChatIllustration';
import CodeBlockIllustration from './CodeBlockIllustration';
import DawIllustration from './DawIllustration';
import DropdownIllustration from './DropdownIllustration';
import KnobIllustration from './KnobIllustration';
import MetronomeIllustration from './MetronomeIllustration';
import PhoneIllustration from './PhoneIllustration';
import PianoIllustration from './PianoIllustration';
import SwitchIllustration from './SwitchIllustration';

interface IllustrationProps extends React.HTMLAttributes<SVGElement> {
  transparent?: boolean;
}

type Illustration = React.FC<IllustrationProps>;

export {
  AudioFileIllustration,
  BezierCurveIllustration,
  BrowserIllustration,
  ButtonClickIllustration,
  CableIllustration,
  ChatIllustration,
  CodeBlockIllustration,
  DawIllustration,
  DropdownIllustration,
  KnobIllustration,
  MetronomeIllustration,
  PhoneIllustration,
  PianoIllustration,
  SwitchIllustration,
};

export type { Illustration, IllustrationProps };
