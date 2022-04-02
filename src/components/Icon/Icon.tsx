import React from 'react';
import * as icons from '@heroicons/react/solid';

type IconName = keyof typeof icons;

type IconProps = React.SVGAttributes<SVGSVGElement> & {
    name: IconName;
};

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(externalProps, ref) {
    let { name, ...props } = externalProps;
    let Element = icons[name];
    return <Element {...props} className="h-5 w-5 fill-gray-500" ref={ref} />;
});

export { Icon, IconProps, IconName };
