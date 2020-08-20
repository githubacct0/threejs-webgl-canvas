import { gsap } from 'gsap';
export default class ContactForm {
    constructor() {
        this.elems = [
            $("#contactUs .contactFormWrap"),
            $("#contactUs .socialLinks"),
        ];
        this.isVisible = false;
        this.init();
    }

    init() {
        gsap.set(this.elems, { autoAlpha: 0, x: "-=5" });
    }

    animate() {
        if (!this.isVisible) {
            gsap.to(this.elems, {
                duration: 0.9,
                stagger: 0.1,
                autoAlpha: 1,
                x: 0,
                onComplete: () => {
                    this.isVisible = true;
                }
            });
        }
    }
}
