import Dribbble from './Dribbble';
import GitHub from './GitHub';
import LinkedIn from './LinkedIn';
import SoundCloud from './SoundCloud';

interface CustomIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
}

type CustomIcon = React.FC<CustomIconProps>;

export { Dribbble, GitHub, LinkedIn, SoundCloud };
export type { CustomIcon, CustomIconProps };
