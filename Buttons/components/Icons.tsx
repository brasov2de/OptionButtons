
 /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
//import * as FluentIcons from "@fluentui/react-icons";
import * as React from "react";
import { FluentIcons } from "./FluentIcons";


export interface TIconProps {
    iconName: string;
    color?: string;
}

export function DynamicIcon({iconName, color}: TIconProps ) {
    const icon = (FluentIcons as any)[iconName];
    if (icon) {
        return React.createElement(icon, {color: color}) as JSX.Element;
    } else {
        console.warn(`Icon ${iconName} not found in Fluent UI icons.`);
        return null;
    }
}
/*
export function DynamicIcon({iconName, color}: TIconProps ) {
    const [icon, setIcon] = React.useState<React.FunctionComponent | null>(null);
    React.useEffect(() => {
       
            import(`@fluentui/react-icons`)
            .then((iconModule) => {                
                setIcon((iconModule as any)[iconName]);
            }).catch((error) => {
                console.error(`Error loading icon ${iconName}:`, error);
                setIcon(null);
            });       
        
    }, [iconName]);
    
    //const icon = (FluentIcons as any)[iconName];
    if (icon) {
        return React.createElement(icon) as JSX.Element;
    } else {
        console.warn(`Icon ${iconName} not found in Fluent UI icons.`);
        return null;
    }
}*/

