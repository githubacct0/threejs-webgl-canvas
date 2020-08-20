import { gsap } from 'gsap';
export default class RevolveEffect {
    constructor() {
        this._interval;
        this._animate;
        this._incAndReset;
        this._delayedCall;
        this._kill;
        this.t;

        this.index = null;
        this.displacement = null;
        this.fullAnimationTime = null;
        this.textStayTime = null;
        this.wordInTime = null;
        this.wordOutTime = null;

        this.reset();
        this.init();
    }


    reset() {
        this.index = 0;
        this.displacement = 20;
        this.fullAnimationTime = 2;
        this.textStayTime = 1;
        this.wordInTime = 0.4;
        this.wordOutTime = 0.25;
    }

    init() {
        this._interval = (k) => {
            this._animate();
            this._delayedCall = gsap.delayedCall(this.fullAnimationTime, this._interval);
        }

        this._animate = () => {
            let phrase = $(".revolve-container .revolve-phrase")[this.index];
            let words = $(phrase).find(".revolve-word");
            gsap.fromTo(words, {
                autoAlpha: 0,
                y: `+=${this.displacement}`
            }, {
                duration: this.wordInTime,
                autoAlpha: 1,
                y: `-=${this.displacement}`,
                stagger: this.wordInTime / 2,
                onComplete: () => {
                    gsap.delayedCall(this.textStayTime, () => {
                        gsap.to(words, {
                            duration: this.wordInTime,
                            autoAlpha: 0,
                            y: `-=${this.displacement}`,
                            stagger: this.wordOutTime / 2,
                            onComplete: () => {
                                gsap.set(words, { y: `+=${this.displacement}` });
                            }
                        });
                    });
                }
            });
            this._incAndReset();
        }

        this._incAndReset = () => {
            this.index++;
            if (this.index >= $(".revolve-container .revolve-phrase").length) {
                this.index = 0;
            }
        }
    }

    animation(s) {
        this.t = setTimeout(() => {
            this._interval(s);
        }, 500)
    }
}
