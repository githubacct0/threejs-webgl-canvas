import { gsap } from 'gsap';
export default class BehindNika {
    constructor() {
        this.elem = [
            ...$(".behindNika h2"),
            ...$(".behindNikaPro .profileList"),
            $(".abtbehindNikaPro_wrap"),
        ];

        this.init();
        this.isVisible = false;
    }

    init() {
        gsap.set(this.elem, { autoAlpha: 0, x: "-=10" });
    }

    animate() {
        if (!this.isVisible) {
            gsap.to(this.elem, {
                autoAlpha: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.6,
                onComplete: () => {
                    this.isVisible = true;
                }
            });
        }
    }
}
