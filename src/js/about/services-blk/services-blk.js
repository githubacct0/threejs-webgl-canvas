import { gsap } from 'gsap';
export default class ServicesBlk {
    constructor() {
        this.elem = [
            $(".services_blk_wrap h4"),
            ...$(".servicesList_wrap .servicesList"),
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
                duration: 0.8,
                autoAlpha: 1,
                x: 0,
                stagger: 0.6,
                onComplete: () => {
                    this.isVisible = true;
                }
            });
        }
    }
}
