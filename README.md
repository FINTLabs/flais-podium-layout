# FLAIS Podium Layout

![npm (scoped)](https://img.shields.io/npm/v/@fintlabs/flais-podium-layout)
[![TypeDocs](https://img.shields.io/badge/Typedocs-documentation-brightgreen.svg?)](https://fintlabs.github.io/flais-podium-layout/)

This is a small helper library to help create a layout to run in the FINTLabs/FLAIS environment.

Checkout the awesome [Podium project](https://podium-lib.io/docs/podium/conceptual_overview) to learn more
about `Layouts` and `podium-lib`.

# Usage

**Javascript**

```javascript

```

**Typescript**

```ts
import {startLayout} from "../src";

startLayout(new DefaultOptions("example", "../../pods.json"));
```

In addition, you need to:

* Create a deployment for the layout server, e.g. Docker.

# Properties

| Property         | Default       | Description                                                                                                                                                                                                                        |
|------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PODS_FILE        | `./pods.json` | List of pods for the layout. It contains the AppBar, Menu and Main pods. See [AppBarMenuMainLayout](https://fintlabs.github.io/flais-podium-layout/interfaces/AppBarMenuMainLayout.html) for more information about the structure. |
| IS_DEVELOPMENT   | `false`       | This is set with the following expression `process.env.NODE_ENV === 'development'`                                                                                                                                                 |
| LAYOUT_PATH_NAME | `/`           |                                                                                                                                                                                                                                    |
| LAYOUT_PORT      | `3000`        |                                                                                                                                                                                                                                    |  
| LOGGING_LEVEL    | `info`        |                                                                                                                                                                                                                                    |  
| LAYOUT_DEBUG     | `false`       |                                                                                                                                                                                                                                    |  
