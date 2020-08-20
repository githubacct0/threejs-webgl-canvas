import { gsap } from 'gsap';
import LineAnimation from "../next-animation/next-animation";

export default class FixedLinks {
    constructor() {
        this.elems = {
            fixedElems: [
                $(".projectsActions .back-top-list"),
                $(".projectsActions .website-link"),
            ],
            arrow: $(".projectActions_wrap .nextSection"),
        };

        this.lineAnimation = new LineAnimation();
        this.init();
        this.showfixed = false;
    }

    init() {
        gsap.set(this.elems.fixedElems, { autoAlpha: 0 });
        this.lineAnimation.TL.play();
        this.showfixed = false;
    }

    displayElems(scrollPercentage) {
        if (scrollPercentage < 0.3) {
            if (this.lineAnimation.TL.paused) {
                this.lineAnimation.TL.seek(0).play();
            }

            gsap.to(this.elems.fixedElems, {
                duraion: 0.5,
                autoAlpha: 0
            });
            gsap.to(this.elems.arrow, {
                duraion: 0.5,
                autoAlpha: 1
            });

            this.showfixed = false;
        }

        if (scrollPercentage >= 0.3 && scrollPercentage < 96) {
            // if loop to improve performance
            if (!this.showfixed) {
                gsap.to(this.elems.fixedElems, 0.5, {
                    duraion: 0.5,
                    autoAlpha: 1,
                    onComplete: function() {
                        this.showfixed = true;
                    }
                });
                gsap.to(this.elems.arrow, {
                    duration: 0.5,
                    autoAlpha: 0
                });
                this.lineAnimation.TL.pause();
            }
        }

        if (scrollPercentage >= 97) {
            gsap.to(this.elems.fixedElems, {
                duration: 0.5,
                autoAlpha: 0
            });

            this.showfixed = false;
        }
    }
}
