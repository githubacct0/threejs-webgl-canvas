// import PreReset from "./pre-reset";
import EntryTransition from "./entry-transition";

import { gsap } from 'gsap';
export default class PreAnime {
    constructor() {
        this.currentVal = { val: 8 };
        this.elems = {
            perText: $(".preload-container #preload-percentage"),
            perBar: $("#preload-progress-container .preload-progress"),
            fadeElems: [
                $("#preload-percentage"),
                $("#preload-progress-container"),
            ],
            showElems: $("#pre-nika-logo"),
        };
        this.called = false;
        this.TL = gsap.timeline();
        this.entry_transition = new EntryTransition();
        this.init();
    }

    init() {
        gsap.fromTo(this.elems.fadeElems, {
            y: "+=10",
            autoAlpha: 0
        }, {
            duration: 0.6,
            y: "-=10",
            autoAlpha: 1,
        })
    }

    animate(perc) {
        gsap.to(this.currentVal, {
            duration: 2,
            val: perc,
            roundProps: "val",
            onUpdate: () => {
                this.elems.perText.text(`${this.currentVal.val} %`);
                gsap.set(this.elems.perBar, {
                    xPercent: `${this.currentVal.val}`,
                });
            },
            onComplete: () => {
                gsap.delayedCall(0.3, () => {
                    this.timelineStart();
                });
            },
        });
    }

    timelineStart() {
        if (!this.called) {
            this.called = true;
            this.TL.to(this.elems.fadeElems, {
                    duration: 0.5,
                    y: "-=10",
                    autoAlpha: 0,
                })
                .to(this.elems.showElems, 0.5, { y: "-=50", autoAlpha: 1 })
                .add(this.entry_transition.animate())
        }
    }
}
