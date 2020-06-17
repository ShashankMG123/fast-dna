import { attr, DOM, FASTElement, observable } from "@microsoft/fast-element";
import {AnchoredRegion} from "../anchored-region"

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export class Tooltip extends FASTElement {
    @attr({ mode: "boolean" })
    public hidden: boolean = false;
    private hiddenChanged(): void {

    }

    @attr       
    public anchor: string = "";
    private anchorChanged(): void {
        if (this.isConnected){
            this.updateLayout();
        }
    }

    @attr
    public delay: number = 300;

    @attr
    public position: TooltipPosition | null = null;
    private positionChanged(): void {
        if (this.isConnected){
            this.updateLayout();
        }
    }

    @observable
    public anchorElement: HTMLElement | null = null;
    private anchorElementChanged(): void {
        if (this.isConnected){
            this.updateLayout();
        }
    }

    @observable
    public verticalPositioningMode: string = "dynamic";

    @observable
    public horizontalPositioningMode: string = "dynamic";

    @observable
    public horizontalInset: string = "false";

    @observable
    public verticalInset: string = "false";

    @observable
    public verticalDefaultPosition: string | undefined = undefined;

    @observable
    public horizontalDefaultPosition: string | undefined = undefined;

    /**
     * reference to the component root
     */
    public tooltipRoot: HTMLDivElement;

    /**
     * reference to the anchored region
     */
    public region: AnchoredRegion;

    public viewport: HTMLElement | null = null;

    constructor() {
        super();
        this.classList.toggle("testclass", true);
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.region.region.addEventListener("change", this.handlePositionChange);
        this.region.viewportElement = this.tooltipRoot.parentElement;
        this.updateLayout();
        this.updatePositioningStyles((this.region as any).$fastController.element as AnchoredRegion);
    }

    public disconnectedCallback(): void {
        this.region.region.removeEventListener("change", this.handlePositionChange);
        super.disconnectedCallback();
    }

    public handlePositionChange(ev: Event): void {
        const anchoredRegion: AnchoredRegion = (ev.target as any).$fastController.element as AnchoredRegion;
        this.classList.toggle("top", anchoredRegion.verticalPosition === "top");
        this.classList.toggle("bottom", anchoredRegion.verticalPosition === "bottom");
        this.classList.toggle("inset-top", anchoredRegion.verticalPosition === "insetTop");
        this.classList.toggle("inset-bottom", anchoredRegion.verticalPosition === "insetBottom");

        this.classList.toggle("left", anchoredRegion.horizontalPosition === "left");
        this.classList.toggle("right", anchoredRegion.horizontalPosition === "right");
        this.classList.toggle("inset-left", anchoredRegion.horizontalPosition === "insetLeft");
        this.classList.toggle("inset-right", anchoredRegion.horizontalPosition === "insetRight");
    }

    private updatePositioningStyles = (anchoredRegion: AnchoredRegion): void => {
        
    }

    private updateLayout(): void {
        switch (this.position) {
            case "top":
                this.verticalPositioningMode = "locktodefault";
                this.horizontalPositioningMode = "dynamic";
                this.verticalDefaultPosition = "top";
                this.horizontalDefaultPosition = undefined;
                this.horizontalInset = "true";
                this.verticalInset = "false";
                break;

            case "bottom":
                this.verticalPositioningMode = "locktodefault";
                this.horizontalPositioningMode = "dynamic";
                this.verticalDefaultPosition = "bottom";
                this.horizontalDefaultPosition = undefined;
                this.horizontalInset = "true";
                this.verticalInset = "false";
                break;

            case "right":
                this.verticalPositioningMode = "dynamic";
                this.horizontalPositioningMode = "locktodefault";
                this.verticalDefaultPosition = undefined;
                this.horizontalDefaultPosition = "right";
                this.horizontalInset = "false";
                this.verticalInset = "true";
                break;

            case "left":
                this.verticalPositioningMode = "dynamic";
                this.horizontalPositioningMode = "locktodefault";
                this.verticalDefaultPosition = undefined;
                this.horizontalDefaultPosition = "left";
                this.horizontalInset = "false";
                this.verticalInset = "true";
                break;

            case null:
                this.verticalPositioningMode = "dynamic";
                this.horizontalPositioningMode = "dynamic";
                this.verticalDefaultPosition = undefined;
                this.horizontalDefaultPosition = undefined;
                this.horizontalInset = "false";
                this.verticalInset = "false";
                break;   
        }
    }

    /**
     * TODO: Issue #2742 - https://github.com/microsoft/fast-dna/issues/2742
     * This is a placeholder function to check if the hidden attribute is present
     * Currently there is not support for boolean attributes.
     * Once support is added, we will simply use this.hidden.
     */
    private isTooltipHidden(): boolean {
        return typeof this.hidden !== "boolean";
    }

}
