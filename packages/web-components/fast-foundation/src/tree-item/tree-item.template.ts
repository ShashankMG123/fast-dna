import { html, ref, when } from "@microsoft/fast-element";
import { endTemplate, startTemplate } from "../patterns/start-end";
import { TreeItem } from "./tree-item";

export const TreeItemTemplate = html<TreeItem>`
    <template
        role="treeitem"
        tabindex="${x => (x.disabled ? null : x.focusable ? 0 : -1)}"
        class="${x => (x.expanded ? "expanded" : "")} ${x =>
            x.selected ? "selected" : ""} ${x => (x.nested ? "nested" : "")}
            ${x => (x.disabled ? "disabled" : "")}"
        aria-expanded="${x => (x.hasItems ? x.expanded : void 0)}"
        aria-selected="${x => x.selected}"
        aria-disabled="${x => x.disabled}"
        @focus=${(x, c) => x.handleFocus(c.event as FocusEvent)}
        @blur=${(x, c) => x.handleBlur(c.event as FocusEvent)}
        @keydown=${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}
        ${ref("treeItem")}
    >
        <div
            class="positioning-region"
            part="positioning-region"
            @click="${(x, c) => x.handleContainerClick(c.event as MouseEvent)}"
        >
            <div class="content-region" part="content-region">
                ${when(
                    x => !!x.hasItems,
                    html<TreeItem>`
                        <div
                            aria-hidden="true"
                            class="expand-collapse-button"
                            part="expand-collapse-button"
                            @click="${x => x.handleExpandCollapseButtonClick()}"
                            ${ref("expandCollapseButton")}
                        >
                            <slot name="expand-collapse-glyph">
                                <svg
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="expand-collapse-glyph"
                                >
                                    <path d="M4.29 12L12 4.29V12H4.29z" />
                                </svg>
                            </slot>
                        </div>
                    `
                )}
                ${startTemplate}
                <slot></slot>
                ${endTemplate}
            </div>
        </div>
        ${when(
            x => x.hasItems && (x.renderCollapsedChildren || x.expanded),
            html<TreeItem>`
                <div role="group" class="items" part="items">
                    <slot
                        name="item"
                        ${ref("items")}
                        @slotchange=${x => x.handleItemsChange()}
                    ></slot>
                </div>
            `
        )}
    </template>
`;
