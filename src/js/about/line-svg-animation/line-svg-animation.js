import { gsap } from 'gsap';
export default class SVGAnimation {
    constructor() {
        this.elem = {
            svg: $("#q-intro-scroll .st0"),
            anchor: $("#q-intro-scroll a"),
        };
        this.init();
    }

    init() {
        let tl = gsap.timeline();
        tl.fromTo(this.elem.svg, {
                "stroke-dashoffset": 430
            }, {
                "stroke-dashoffset": 0,
                duration: 0.65,
            })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);

        let tl2 = gsap.timeline();
        tl2.fromTo(this.elem.svg, {
                autoAlpha: 1,
                x: "-=20"
            }, {
                autoAlpha: 1,
                x: 0,
                duration: 0.65,
            })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);
    }
}
