import Scene from './Scene'

export default class Stage {
    constructor() {
        this.$els = {
            scene: document.getElementById("scene"),
        };

        this.init();
    }

    init() {
        this.scene = new Scene(this.$els.scene);
    }
}
