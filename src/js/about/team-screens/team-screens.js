import { gsap } from 'gsap';
export default class TeamScreens {
    constructor() {
        this.elem = $(".teamScreensList");
        this.init();
    }

    init() {
        this.TL = gsap.timeline({ paused: true });
        this.TL.to(this.elem, {
            duration: 1,
            y: "-=200vh",
            ease: 'none',
        });
    }

    animate(percentage) {
        this.TL.progress(percentage / 40);
    }
}
