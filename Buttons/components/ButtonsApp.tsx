/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {Button, FluentProvider, Tab, Theme, webLightTheme} from "@fluentui/react-components";
import { DynamicIcon  } from './DynamicIcon';
import ButtonList from './ButtonList';
import TabsList from './TabsList';



export interface IButtonsAppProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: string |null;
    disabledButtons:string | null;    
    icons : string | null;
    align: "RIGHT" | "CENTER" | "LEFT";
   // useOptionsColor: "YES" | "NO";   
    webAPI : ComponentFramework.WebApi ;
    size: "small" | "medium" | "large";
    appearance: "subtle" | "primary" | "outline" | "secondary" | "transparent";
    iconPosition: "before" | "after";
    shape: "circular" | "square" | "rounded";
    type: "button" | "tabs";
    onClicked: (value: number | undefined, text: string |undefined, color: string |undefined) => void;
    theme?: Theme;
    value: number | null;
}


export const ButtonsApp = ({options, visibleButtons, disabledButtons,  icons, align, webAPI, size, appearance, iconPosition, shape, type, theme, onClicked, value}: IButtonsAppProps ) : JSX.Element =>{
    const [thisValue, setThisValue] = React.useState<number | null>(value);

    const [allIcons, setAllIcons] = React.useState<Record<string, string>>({});
    React.useEffect(() => {
        try{
            if(icons == null || icons === "") {
                setAllIcons({});
                return;
            }
            const parsed = JSON.parse(icons ?? "{}") as Record<string, string>;
            setAllIcons(parsed);
        }
        catch(e){
            console.error("Error parsing icons JSON:", e);
        }
    }, [icons]);

    const parseButtonsInput = (input : string | null) : number[] |undefined => {
        if(input == null) {
            return undefined;
        }
        const values = input.split(";").map((val) => {
            const value = parseInt(val, 10);
            return (options.find((option) => option.Value===value)) ? value : undefined;
        }).filter(val => val != null) as number[];
        return values.length===0 ? undefined : values;
    }
    const disabledBtns = parseButtonsInput(disabledButtons);
    const visibleBtns = parseButtonsInput(visibleButtons);
  

    const onClick : React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement>) => {
        const val = event.currentTarget.value;
        const text = event.currentTarget.innerText;
        const color = options.find((option) => option.Value === parseInt(val))?.Color;
        if(val != null ){
            setThisValue(parseInt(val));
            onClicked?.(parseInt(val), text, color);
        }
    }
   
    return (
        <FluentProvider theme={theme ?? webLightTheme}>
            {type=="button"
            ? <ButtonList 
                align={align}
                options={options}
                size={size}
                appearance={appearance}
                iconPosition={iconPosition}
                shape={shape}
                disabledButtons={disabledBtns}
                visibleButtons={visibleBtns}
                allIcons={allIcons}
                onClick={onClick}
            />
            : <TabsList
            align={align}
                options={options}
                size={size}
                appearance={appearance}
                iconPosition={iconPosition}
                shape={shape}
                disabledButtons={disabledBtns}
                visibleButtons={visibleBtns}
                allIcons={allIcons}
                onClick={onClick}
                value={thisValue}
                />
            }
    </FluentProvider>
    )
}
