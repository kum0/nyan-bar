import { NyanMode } from 'nyan-mode';

window.onload = () => {
  const e = document.getElementById('div');
  const t = document.getElementById('box');

  NyanMode.New({
    width: 1000,
    height: 32,
    wavy: false
  }).create(e!, t!);
};
