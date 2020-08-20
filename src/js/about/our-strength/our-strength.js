import { gsap } from 'gsap';
export default class OurStrenghts {
    constructor() {
        this.elems = [
            $(".ourStrength_wrap h4"),
            $(".ourStrength h3"),
            ...$(".ourStrength p"),
        ];
        this.isVisible = false;
        this.init();
    }

    init() {
        gsap.set(this.elems, { autoAlpha: 0, x: "-=8" });
    }

    animate() {
        if (!this.isVisible) {
            gsap.to(this.elems, {
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
