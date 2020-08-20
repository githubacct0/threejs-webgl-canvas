import { gsap } from 'gsap';

export default class StoryDetailsWrap {
    constructor() {
        this.el = $(".storyDetails_wrap *");
        this.isVisible = false;
        this.TL = gsap.timeline({ paused: true });
        this.init();
    }

    init() {
        gsap.set(this.el, { autoAlpha: 0, x: "-=5" });
        this.TL.to(this.el, {
            duration: 0.6,
            autoAlpha: 1,
            x: 0,
            stagger: 0.4,
        }).eventCallback("onComplete", () => {
            this.isVisible = true;
        });
    }
}
