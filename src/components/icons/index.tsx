import Dribbble from './Dribbble';
import GitHub from './GitHub';
import LinkedIn from './LinkedIn';

interface CustomIconProps extends React.HTMLAttributes<SVGElement> {
  size?: number;
}

type CustomIcon = React.FC<CustomIconProps>;

export { Dribbble, GitHub, LinkedIn };
export type { CustomIcon, CustomIconProps };
