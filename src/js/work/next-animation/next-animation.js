import { gsap } from 'gsap';

export default class LineAnimation {
    constructor() {
        this.elem = $("#q-intro-scroll .st0");
        this.TL = gsap.timeline();
        this.initAnimation();
    }

    initAnimation() {
        let tl1 = gsap.timeline();
        tl1.fromTo(this.elem, {
                "stroke-dashoffset": 430
            }, {
                duration: 0.65,
                "stroke-dashoffset": 0
            })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);

        let tl2 = gsap.timeline();
        tl2.fromTo(this.elem, {
                autoAlpha: 1,
                x: "-=20"
            }, {
                duration: 0.65,
                autoAlpha: 1,
                x: 0
            })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);

        this.TL.add(tl1, 0).add(tl2, 0).pause();
    }
}
