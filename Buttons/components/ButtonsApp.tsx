/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {Button, FluentProvider, Theme, webLightTheme} from "@fluentui/react-components";

export interface IButtonsAppProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: string |null;
    disabledButtons:string | null;    
    icons : any;
    align: "RIGHT" | "CENTER" | "LEFT";
   // useOptionsColor: "YES" | "NO";
    setValue: (value : number |undefined) => void;    
    webAPI : ComponentFramework.WebApi ;
    size: "small" | "medium" | "large";
    appearance: "subtle" | "primary" | "outline" | "secondary" | "transparent";
    iconPosition: "before" | "after";
    shape: "circular" | "square" | "rounded";
    theme?: Theme;
}


export const ButtonsApp = ({options, visibleButtons, disabledButtons,  icons, align, setValue, webAPI, size, appearance, iconPosition, shape, theme}: IButtonsAppProps ) : JSX.Element =>{

    const parseButtonsInput = (input : string | null) : (number | undefined) [] |undefined => {
        if(input == null) {
            return undefined;
        }
        const values = input.split(";").map((val) => {
            const value = parseInt(val, 10);
            return (options.find((option) => option.Value===value)) ? value : undefined;
        }).filter(Boolean);
        return values.length===0 ? undefined : values;
    }
    const disabledBtns = parseButtonsInput(disabledButtons);
    const visibleBtns = parseButtonsInput(visibleButtons);
  //  const whiteBtns = parseButtonsInput(whiteButtons)

   
    return (
        <FluentProvider theme={theme ?? webLightTheme}>
    <div  style={{width: "100%", display: "flex", justifyContent: align?.toLowerCase(), gap: "5px", flexWrap: "wrap"}}>
        {options.map((option) => {
           
            if( visibleBtns === undefined || visibleBtns.includes(option.Value)) {
                /*let primary = true;
                let color : string | undefined = useOptionsColor==="YES" ?  option.Color : undefined;
                if(whiteBtns?.includes(option.Value) || useOptionsColor==="YES" && option.Color?.toLowerCase()==="#ffffff" || option.Color?.toLowerCase()==="white"){
                    primary=false;
                  //  color = mainColor;
                }*/
               return <Button key={option.Value} appearance={appearance} iconPosition={iconPosition} shape={shape} size={size}>{option.Label}</Button>
            }
            return undefined;
        })
    }
    </div>
    </FluentProvider>
    )
}
