import { gsap } from 'gsap';
export default class EntryTransition {
    constructor() {
        this.elems = {
            clipPathElm: $(".preload-container"),
        };
        this.TL = gsap.timeline();
    }

    animate() {

        this.TL.fromTo(this.elems.clipPathElm, {
            css: {
                'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
            }
        }, {
            duration: 1,
            css: {
                'transform-origin': "top right",
                'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            },
            stagger: -0.03,
            ease: 'power3.inOut',
        })

        return this.TL;
    }
}
