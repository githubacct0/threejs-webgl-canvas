import PreAnime from "./pre-animation";

export default class Preload {
    constructor() {
        this.init();
    }

    init() {
        this.pre_animate = new PreAnime();
        this.progress = 0;
        const allElements = $("*");
        const length = allElements.length;
        for (let i = 0; i < length; i++) {
            this.set_element(allElements[i], length);
        }
    }

    set_element(element, totalLength) {
        let k = 100 / totalLength;
        if ($(element).length == 1) {
            this.pre_animate.animate(this.progress);
        }
        this.progress = this.progress + k;
    }
}
