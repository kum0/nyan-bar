## nyan-mode

> Emacs's nyan-mode for Web. 🌈

_Usage_

```shell
# yarn
yarn add nyan-mode
# npm
npm install nyan-mode
```

```typescript
import { NyanMode } from 'nyan-mode;

window.onload = () => {
  const e = document.getElementById('div');
  const scrollTarget = document.getElementById('box');
  NyanMode.New({
    width: 1000,
    height: 64
  }).create(e!, scrollTarget!);
};
```
