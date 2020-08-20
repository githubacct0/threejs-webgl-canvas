import { gsap } from 'gsap';


export default class HamAnim {
    constructor() {
        this.init();
    }
    init() {
        let openButton = $("#openNavbar");
        let closeButton = $("#closeNavbar, #navigationWrap a");
        let navbarMenu = $("#navigationWrap");

        let leftHoverEl = $(".nav-container-left li");
        let rightHoverEl = $(".nav-container-right .wow");
        let textAnimation = $(".nav-container-left h5");

        let cross = $(".cross-in");

        let masterTimeline = gsap.timeline({ paused: true });

        masterTimeline.add(
            gsap.to(navbarMenu, {
                duration: 1,
                xPercent: 100,
                onStart: () => {
                    gsap.set(navbarMenu, { "z-index": 200 });
                },
            })
        );

        masterTimeline.add(
            gsap.from(leftHoverEl, { duration: 0.8, autoAlpha: 0, x: "-=20", stagger: 0.5 })
        );

        masterTimeline.add(
            gsap.from(rightHoverEl, { duration: 0.8, autoAlpha: 0, x: "-20", stagger: 0.5 })
        );

        masterTimeline.add(
            gsap.from(textAnimation, { duration: 0.8, autoAlpha: 0, x: "-=20" })
        );

        masterTimeline.add(gsap.from(cross, { duration: 0.4, width: 0, stagger: 0.5 }));

        openButton.click(() => {
            gsap.set(navbarMenu, {
                autoAlpha: 1,
                onComplete: function() {
                    masterTimeline.timeScale(2);
                    masterTimeline.play();
                }
            })
        });

        closeButton.click(() => {
            gsap.to(navbarMenu, {
                duration: 0.5,
                autoAlpha: 0,
                ease: 'power2.out',
                onComplete: function() {
                    masterTimeline.timeScale(50);
                    masterTimeline.reverse();
                }
            })
        });
    }
}
