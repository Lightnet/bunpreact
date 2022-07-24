
```js
import events from "node:events";
import { existsSync, readFileSync} from "node:fs";
import { IncomingMessage, ServerResponse, createServer } from "node:http";


```

https://nodejs.org/dist/latest-v16.x/docs/api/events.html

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

https://jenil777007.hashnode.dev/lets-bun#heading-installation
```js
import * as fs from "node:fs/promises";
import { Buffer } from "node:buffer";

```