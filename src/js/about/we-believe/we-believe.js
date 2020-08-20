import { gsap } from 'gsap';
export default class WeBelieve {
    constructor() {
        this.elem = [
            ...$(".we-believe .aboutCom-title"),
            ...$(".we-believe .abtintroblk_wrap"),
        ];

        this.isVisible = false;
        this.bind();
    }

    bind() {
        if (!this.isVisible) {
            gsap.fromTo(this.elem, {
                autoAlpha: 0,
                x: "-=10",
            }, {
                autoAlpha: 1,
                x: 0,
                delay: 0.5,
                stagger: .5,
                duration: 0.8,
                onComplete: () => {
                    this.isVisible = true;
                }
            });
        }
    }
}
