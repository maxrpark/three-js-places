import GUI from "lil-gui";

export default class Debug {
  active: boolean;
  showWorlds: boolean;
  ui: GUI;
  constructor() {
    this.active = window.location.hash === "#debug";
    this.active = true;
    this.ui = new GUI();

    if (window.innerWidth < 400) this.closeControls();
  }
  closeControls() {
    this.ui.close();
  }
}
