/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ButtonsApp } from "./components/ButtonsApp";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

export class OptionButtons implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private context: ComponentFramework.Context<IInputs> | undefined;
    private value: number | undefined ;    
    private eventValue : {value: number | undefined, text: string|undefined, color: string |undefined,extended: string} ;
    private isCanvas  = false;
    private events : string[] = [];

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    private onClicked(value: number | undefined, text: string |undefined, color: string |undefined) {
        
        this.value = value;     
        this.eventValue = {value: value, text: text, color: color, extended: ""};
        if(this.isCanvas===true) {            
            this.events.push("onClicked" );  
            this.value = value;   
            this.notifyOutputChanged();       
        }
        else {
            this.context?.events.onClicked(this.eventValue);
        }
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        this.context = context;        
        this.isCanvas = context.parameters.isCanvas?.raw ?? false;  
       if(this.isCanvas===true && this.events.length>0) {
            this.events = [];
            this.context?.events.onClicked();
       }
        return React.createElement(
            ButtonsApp, {
                options: context.parameters.option?.attributes?.Options ?? [],
                visibleButtons: context.parameters.visibleButtons?.raw ?? "",
                disabledButtons: context.parameters.disabledButtons.raw,            
                icons: context.parameters.icons.raw,
                align: context.parameters.align.raw,
                //useOptionsColor: context.parameters.useOptionsColor.raw,
                size: context.parameters.size.raw,
                appearance: context.parameters.appearance.raw,
                iconPosition: context.parameters.iconPosition.raw,
                shape: context.parameters.shape.raw,
                theme: (context as any).fluentDesignLanguage?.tokenTheme,
                type: context.parameters.type.raw ?? "button",                
                onClicked: this.onClicked.bind(this),
                webAPI: context.webAPI, 
                value : this.value ??  context.parameters.option?.raw,
            }
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            option: this.value
            // Add other outputs if needed
         };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
