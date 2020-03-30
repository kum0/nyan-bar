## nyan-bar

> Emacs's nyan-mode for Web. 🌈

_Usage_

```shell
# yarn
yarn add nyan-bar
# npm
npm install nyan-bar
```

```typescript
import { NyanBar } from 'nyan-bar';

window.onload = () => {
  const e = document.getElementById('div');
  const scrollTarget = document.getElementById('box');
  NyanBar.New({
    width: 1000,
    height: 64
  }).create(e!, scrollTarget!);
};
```
