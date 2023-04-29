# FLAIS Podium Layout

![npm (scoped)](https://img.shields.io/npm/v/@fintlabs/flais-podium-layout)
[![TypeDocs](https://img.shields.io/badge/Typedocs-documentation-brightgreen.svg?)](https://fintlabs.github.io/flais-podium-layout/)

This is a small helper library to help create a layout to run in the FINTLabs/FLAIS environment.

Checkout the awesome [Podium project](https://podium-lib.io/docs/podium/conceptual_overview) to learn more
about `Layouts` and `podium-lib`.

# Usage

**Javascript**

```javascript
TODO
```

**Typescript**

```ts
import {DefaultOptions, startLayout} from "@fintlabs/flais-podium-layout";

const podsFile = process.env.PODS_FILE || `${process.cwd()}/pods-local.json`;

startLayout(new DefaultOptions("example",  podsFile));
```

In addition, you need to:

* Create a deployment for the layout server, e.g. Docker.

# DefaultOptions

See [Options](https://fintlabs.github.io/flais-podium-layout/interfaces/Options.html) for for details
and [DefaultOptions](https://fintlabs.github.io/flais-podium-layout/classes/DefaultOptions.html) for default values.