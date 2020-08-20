import { gsap } from 'gsap';


export default class lastSection {
    constructor() {
        this.init();
    }
    init() {
        if ($("#verticalSlider")[0]) {
            let items = $(".item");
            let scrollContent = document.querySelector("#verticalSlider").scrollHeight;

            let x = gsap.timeline();
            x.to(items, {
                duration: 10,
                y: -2 * window.innerHeight,
                ease: 'none'
            }).repeat(-1);

            $(items).hover(
                () => {
                    x.pause();
                },
                () => {
                    x.resume();
                }
            );
        }
    }
}
