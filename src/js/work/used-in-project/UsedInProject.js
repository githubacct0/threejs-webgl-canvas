import { gsap } from 'gsap';

export default class UsedInProject {
    constructor() {
        this.TL = gsap.timeline({ paused: true });
        this.isVisible = false;
        this.fisrt = [
            $(".useIn_wrap h3"),
            $(".useIn_wrap .useIn_adv_list")[0],
            $(".useIn_wrap .useIn_adv_list")[1],
            $(".useIn_wrap p"),
            $(".authorImg"),
        ];
        this.last = $(".useInRight_wrap");

        this.init();
    }

    init() {
        // Hide Elements
        this.hideUsedInProject();
        this.initTL();
    }

    hideUsedInProject() {
        gsap.set([...this.fisrt, this.last], { autoAlpha: 0, x: "-=10" });
    }

    initTL() {
        this.TL
            .to(this.fisrt, {
                duration: 0.8,
                autoAlpha: 1,
                x: 0,
                stagger: 0.6
            })
            .to(this.last, {
                duration: 0.8,
                autoAlpha: 1,
                x: 0
            }, "-=0.2")
            .eventCallback("onComplete", () => {
                this.isVisible = true;
            })
    }
}
