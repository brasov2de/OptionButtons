import { Button } from '@fluentui/react-components';
import * as React from 'react';
import { DynamicIcon } from './DynamicIcon';

interface ButtonListProps {
     options: ComponentFramework.PropertyHelper.OptionMetadata[];
      align: "RIGHT" | "CENTER" | "LEFT";
     size: "small" | "medium" | "large";
    appearance: "subtle" | "primary" | "outline" | "secondary" | "transparent";
    iconPosition: "before" | "after";
    shape: "circular" | "square" | "rounded";
    disabledButtons:number[] | undefined;
    visibleButtons: number[] | undefined;
    allIcons: Record<string, string>;
    onClick:  React.MouseEventHandler<HTMLButtonElement>;    
}

const ButtonList: React.FC<ButtonListProps> = ({ options , align, size, appearance, iconPosition, shape, disabledButtons, visibleButtons, allIcons, onClick}) => {
    return (
         <div  style={{width: "100%", display: "flex", justifyContent: align?.toLowerCase(), gap: "5px", flexWrap: "wrap"}}>
                {options.map((option) => {
                   
                    if( visibleButtons == null || visibleButtons.includes(option.Value)) {
                        const icon = allIcons[option.Value] || undefined;
                        const color = option.Color ?? undefined;                     
                       return <Button key={option.Value} appearance={appearance} 
                        iconPosition={iconPosition} shape={shape} size={size} 
                        onClick={onClick} 
                        value={option.Value} 
                        icon={ icon ? <DynamicIcon iconName={icon} color={color}/> : null}                        
                        >{option.Label}</Button>
                    }
                    return undefined;
                })
            }
            </div>
    );
};

export default ButtonList;