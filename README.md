A simple package to log your i/o.
One of the main features of this package is leveling

**Install:**

```bash
npm i logger-Browser
```

or

```bash
yarn add logger-Browser
```

### How it works:

I suggest you attach logger instance to the global object.

#### A few examples of leveling:

1. Import:

```js
const { LoggerBrowser } = require("logger-browser");
```

2. Create an instance and pass the global level to it.
   The levels you can use are (the order is important- lower to higher):

```js
error, warning, info, debug;
```

Im using lowest level in this example:

```js
const logger = new LoggerBrowser("error");
```

You can also set global level with `logger` instance. For example:

```js
logger.setLevel(logger.levels.info);
```

**Some examples:**

**When global level is `error`:**

```js
logger.error("logging some errors"); // printed
logger.warn("logging some warnings"); // not printed
logger.info("logging some informations"); // not printed
logger.debug("logging some debugging data"); // not printed
```

**When global level is `warning`:**

```js
logger.error("logging some errors"); // printed
logger.warn("logging some warnings"); // printed
logger.info("logging some informations"); // not printed
logger.debug("logging some debugging data"); // not printed
```

**When global level is `info`:**

```js
logger.error("logging some errors"); // printed
logger.warn("logging some warnings"); // printed
logger.info("logging some informations"); // printed
logger.debug("logging some debugging data"); // not printed
```

**When global level is `debug`:**

```js
logger.error("logging some errors"); // printed
logger.warn("logging some warnings"); // printed
logger.info("logging some informations"); // printed
logger.debug("logging some debugging data"); // printed
```

**Set level manually:**

You can also set level manually.
The `logger.log` method takes 2 or more arguments.
The first one is your log level.
The second one is for printing. example:

```js
logger.log("info", "Hello World!"); // Hello World!
```

**Disable all logs:**

Simply set the level to a level that is not in levels (empty string should be enough):

```js
logger.setLevel("");
```

or

```js
logger.removeLevel();
```
