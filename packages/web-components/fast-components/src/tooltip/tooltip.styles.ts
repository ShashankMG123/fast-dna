import { css } from "@microsoft/fast-element";

export const TooltipStyles = css`
    :host {
        contain: layout;
        overflow: visible;
        height: 0;
        width: 0;
    }

    .tooltip {
        background-color: grey;
        padding: 10px;
        display: inline-block;
        height: fit-content;
        width: fit-content;
    }
    
    :host(.top) .tooltip {
        background-color: red;
        margin: 20px;
    }
    
`;
