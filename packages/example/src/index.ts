import { NyanBar } from 'nyan-bar';

window.onload = () => {
  const e = document.getElementById('div');
  const t = document.getElementById('box');
  NyanBar.New({
    width: 1000,
    height: 64
  }).create(e!, t!);
};
