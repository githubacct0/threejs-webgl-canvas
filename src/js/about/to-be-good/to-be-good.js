import { gsap } from 'gsap';

export default class ToBeGood {
    constructor() {
        this.elem = $(".to-be-good, #contactUs .projectTitle");
        this.singleHeight =
            document.querySelector(".to-be-good .projectTitle_wrap")
            .scrollWidth / $(".to-be-good h2").length;

        this.position = {
            previous: 0,
            current: 0,
        };

        this.init();
    }

    init() {
        // set container to 0
        gsap.set(this.elem, { y: this.singleHeight });
        // Initalise TL
        this.TL = gsap.timeline()
            .to(this.elem, {
                duration: 15,
                y: `${2 * this.singleHeight}`,
                ease: 'none',
            })
            .pause();
    }

    animate(scrollPercentage, min, max) {
        let normalisedProg = (scrollPercentage - min) / (max - min);
        this.TL.progress(normalisedProg);
    }
}
