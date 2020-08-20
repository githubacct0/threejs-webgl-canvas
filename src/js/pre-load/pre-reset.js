import { gsap } from 'gsap';
export default class PreReset {
    constructor() {
        this.elems = [
            ...$(".header-section"),
            $(".introContentWrap"),
            $("#q-intro-scroll"),
        ];
    }

    hide() {
        gsap.set(this.elems, { autoAlpha: 0, y: "+=5" });
    }

    show() {
        return gsap.to(this.elems, { duration: 0.5, autoAlpha: 1, y: "-=5" });
    }
}
