import { Button, Tab, TabList } from '@fluentui/react-components';
import * as React from 'react';
import { DynamicIcon } from './DynamicIcon';

interface TabListProps {
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
    value: number |null;
}

const TabsList: React.FC<TabListProps> = ({ options , align, size, appearance, iconPosition, shape, disabledButtons, visibleButtons, allIcons, onClick, value}) => {
    return (
         <TabList  
         selectedValue={value}
         > 
                {options.map((option) => {
                   
                    if( visibleButtons == null || visibleButtons.includes(option.Value)) {
                        const icon = allIcons[option.Value] || undefined;
                        const color = option.Color ?? undefined;                     
                       return <Tab key={option.Value} //appearance={appearance} 
                        //iconPosition={iconPosition} 
                        //shape={shape} 
                        //size={size} 
                        onClick={onClick} 
                        value={option.Value}                         
                        icon={ icon ? <DynamicIcon iconName={icon} color={color}/> : null}                        
                        >{option.Label}</Tab>
                    }
                    return undefined;
                })
            }
            </TabList>
    );
};

export default TabsList;