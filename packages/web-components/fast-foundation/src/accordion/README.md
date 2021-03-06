---
id: fast-accordion
title: fast-accordion
sidebar_label: fast-accordion
custom_edit_url: https://github.com/microsoft/fast-dna/edit/master/packages/web-components/fast-foundation/src/accordion/README.md
---

## Applying Custom Styles

```ts
import { customElement } from "@microsoft/fast-element";
import { Accordion, AccordionTemplate as template } from "@microsoft/fast-foundation";
import { MyAccordionStyles as styles } from "./accordion.styles";

@customElement({
    name: "fast-accordion",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
})
export class FASTAccordion extends Accordion {}
```

## Usage
```html live
<fast-design-system-provider use-defaults>
    <fast-accordion>
        <fast-accordion-item expanded>
            <span slot="heading">Panel one</span>
            Panel one content
        </fast-accordion-item>
        <fast-accordion-item>
            <span slot="heading">Panel two</span>
            Panel two content
        </fast-accordion-item>
        <fast-accordion-item expanded>
            <span slot="heading">Panel three</span>
            Panel three content
        </fast-accordion-item>
    </fast-accordion>
</fast-design-system-provider>
```