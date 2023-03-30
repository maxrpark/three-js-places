import EventEmitter from "./EventEmitter";
import Stats from "stats.js";

export interface TimeInt extends EventEmitter {
  start: number;
  current: number;
  delta: number;
  elapsed: number;
  stats: Stats;
  tick: () => void;
}

export class Time extends EventEmitter implements TimeInt {
  start: number;
  current: number;
  delta: number;
  elapsed: number;
  stats: Stats;

  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.delta = 16;
    this.elapsed = 0;
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    window.requestAnimationFrame(() => this.tick());
  }
  tick() {
    this.stats.begin();
    const currentTime = Date.now();
    this.delta = this.current - currentTime;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    window.requestAnimationFrame(() => this.tick());

    this.trigger("tick");
    this.stats.end();
  }
}
