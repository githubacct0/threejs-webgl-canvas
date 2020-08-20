import { _scroll } from "js/scroll-bar/scroll-bar";

import { gsap } from 'gsap';
$(document).ready(() => {
    // our Latest Work Slide
    let sectionTitle = $("#ourLatest");
    // Our Latest Work Timeline
    let ourLatestWorkTL = gsap.timeline({ paused: true })
        .fromTo(sectionTitle, {
            x: "-=20%",
        }, {
            duration: 1,
            x: "+=50%",
        });

    // someThing Text
    let contentWrapSomeThingSelector = $("#contact-wrap-something-text");
    // someThing Time Line
    let someThingTL = gsap.timeline({ paused: true })
        .fromTo(contentWrapSomeThingSelector, {
            x: "-=15%",
        }, {
            duration: 1,
            x: "+=45%",
        });

    // Good Thoughts
    let goodThoughtsSelector = $(".good-thoughts-scroll");
    let timer = null;
    let currPos = 0;
    let prevPos = 0;
    let direction = 1;

    let goodThoughtsTL = gsap.timeline()
        .to(goodThoughtsSelector, 15, {
            y: `-200vh`,
            ease: 'none',
        })
        .pause();

    _scroll.addListener((scrollEvent) => {
        let scrollPercentage =
            (scrollEvent.offset.x * 100) / scrollEvent.limit.x;

        if (scrollPercentage >= 10 && scrollPercentage < 50) {
            ourLatestWorkTL.progress((scrollPercentage - 10) / 60);
        }

        if (scrollPercentage >= 30 && scrollPercentage <= 75) {
            // if(!goodThoughtsTL.paused()){
            //     goodThoughtsTL.pause();
            // }

            // if (timer !== null) {
            //     clearTimeout(timer);
            // }

            // timer = setTimeout(resume, 150);

            currPos = scrollEvent.offset.x;
            // direction = currPos - prevPos >= 0 ? 1 : -1;

            let normalisedprogress = (scrollPercentage - 30) / 45;
            goodThoughtsTL.progress(normalisedprogress);

            prevPos = currPos;
        }

        if (scrollPercentage > 60) {
            someThingTL.progress((scrollPercentage - 60) * (2.5 / 100));
        }
    });
});
