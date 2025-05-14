/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import {Button, FluentProvider, Theme, webLightTheme} from "@fluentui/react-components";
import { DynamicIcon  } from './DynamicIcon';


export interface IButtonsAppProps{
    options: ComponentFramework.PropertyHelper.OptionMetadata[];
    visibleButtons: string |null;
    disabledButtons:string | null;    
    icons : string | null;
    align: "RIGHT" | "CENTER" | "LEFT";
   // useOptionsColor: "YES" | "NO";
    setValue: (value : number |undefined) => void;    
    webAPI : ComponentFramework.WebApi ;
    size: "small" | "medium" | "large";
    appearance: "subtle" | "primary" | "outline" | "secondary" | "transparent";
    iconPosition: "before" | "after";
    shape: "circular" | "square" | "rounded";
    onClicked: (value: number |undefined) => void;
    theme?: Theme;
}


export const ButtonsApp = ({options, visibleButtons, disabledButtons,  icons, align, setValue, webAPI, size, appearance, iconPosition, shape, theme, onClicked}: IButtonsAppProps ) : JSX.Element =>{

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

  const onClick : React.MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement>) => {
    const val = event.currentTarget.value;
    if(val != null ){
        onClicked?.(parseInt(val));
    }
  }
   
    return (
        <FluentProvider theme={theme ?? webLightTheme}>
    <div  style={{width: "100%", display: "flex", justifyContent: align?.toLowerCase(), gap: "5px", flexWrap: "wrap"}}>
        {options.map((option) => {
           
            if( visibleBtns === undefined || visibleBtns.includes(option.Value)) {
                const icon = allIcons[option.Value] || undefined;
                const color = option.Color ?? undefined;
                /*let primary = true;
                let color : string | undefined = useOptionsColor==="YES" ?  option.Color : undefined;
                if(whiteBtns?.includes(option.Value) || useOptionsColor==="YES" && option.Color?.toLowerCase()==="#ffffff" || option.Color?.toLowerCase()==="white"){
                    primary=false;
                  //  color = mainColor;
                }*/
               return <Button key={option.Value} appearance={appearance} 
                iconPosition={iconPosition} shape={shape} size={size} 
                onClick={onClick} 
                value={option.Value} 
                icon={ icon ? <DynamicIcon iconName={icon} color={color}/> : null}
                //icon={<DismissFilled/>}
                >{option.Label}</Button>
            }
            return undefined;
        })
    }
    </div>
    </FluentProvider>
    )
}
