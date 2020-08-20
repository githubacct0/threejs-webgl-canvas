import { gsap } from 'gsap';
import Scrollbar from "smooth-scrollbar";
import HorizontalScrollPlugin from "js/scroll-plugin/HorizontalScrollPlugin";
Scrollbar.use(HorizontalScrollPlugin);

export default class scrollBar {
    constructor() {
        this.init();
        this.hovereffect;
    }
    init() {
        let _scroll = Scrollbar.init(
            document.querySelector(".scroll-area", {
                continuousScrolling: false,
                damping: 0.05,
                plugins: {
                    horizontalScroll: {
                        events: [/wheel/],
                    },
                },
            })
        );

        Scrollbar.detachStyle();



        let stContact;
        let skip_s = $(".scrollTo");
        stContact = $('#contacts, .header-quote .scrollToContact');
        if ($('.work_page')[0]) {
            stContact = $('#contacts, #q-intro-scroll .scrollToContact');
        }
        let news_link = $('#news');
        let portfolio_s = document.querySelector("#portfolio");
        let contact_S = document.querySelector("#contactUs");
        let thought_s = document.querySelector('#thoughts');
        // Move to Portfolio Section
        skip_s.click((e) => {
            e.preventDefault();
            _scroll.scrollIntoView(portfolio_s);
        });

        stContact.click((e) => {
            e.preventDefault();
            _scroll.scrollIntoView(contact_S);
        });

        news_link.click((e) => {
            e.preventDefault();
            _scroll.scrollIntoView(thought_s);
        });



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

        // scroll-bar
        let progressBar = $(".slideshow__progress");

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

        //articles section
        let ar_triggered = false;
        let articleElements = $(".ar-in-fadeIn");

        // Good Thoughts
        let goodThoughtsSelector = $(".good-thoughts-scroll");
        let currPos = 0;
        let prevPos = 0;

        let goodThoughtsTL = gsap.timeline()
            .to(goodThoughtsSelector, {
                duration: 15,
                y: `-200vh`,
                ease: 'none',
            })
            .pause();

        // Contact Heading

        let contactheading = $(".contact-heading");
        let contactheadingTL = gsap.timeline()
            .to(contactheading, {
                duration: 15,
                x: "-200vh",
                ease: 'none',
            }).pause();

        _scroll.addListener((scrollEvent) => {
            let scrollPercentage =
                (scrollEvent.offset.x * 100) / scrollEvent.limit.x;

            let counter = 0;

            // console.log(parseInt(scrollPercentage));

            if (scrollPercentage >= 10 && scrollPercentage < 50) {
                ourLatestWorkTL.progress((scrollPercentage - 10) / 60);
                gsap.to(progressBar, {
                    duration: 0.2,
                    xPercent: 2 * (scrollPercentage - 5),
                });
            }

            if (scrollPercentage >= 50) {
                if (!ar_triggered) {
                    gsap.fromTo(articleElements, { xPercent: "-8" }, { duration: 0.6, xPercent: 0, autoAlpha: 1, stagger: 0.5 });
                }
                ar_triggered = true;
            }
            if ($('.home_page')[0]) {
                if (scrollPercentage >= 0 && scrollPercentage <= 100) {
                    currPos = scrollEvent.offset.x; // direction = currPos - prevPos >= 0 ? 1 : -1;

                    var normalisedprogress = (scrollPercentage - 30) / 100;
                    goodThoughtsTL.progress(normalisedprogress);
                    contactheadingTL.progress(normalisedprogress);
                    prevPos = currPos;
                }
            }
            if ($('.work_page')[0]) {
                if (scrollPercentage >= 0 && scrollPercentage <= 100) {
                    currPos = scrollEvent.offset.x; // direction = currPos - prevPos >= 0 ? 1 : -1;

                    var normalisedprogress = (scrollPercentage - 0) / 100;
                    goodThoughtsTL.progress(normalisedprogress);
                    contactheadingTL.progress(normalisedprogress);
                    prevPos = currPos;
                }
            }

            if (scrollPercentage > 60) {
                someThingTL.progress((scrollPercentage - 60) * (2.5 / 100));
            }
        });


        var hash = location.hash;

        if (hash) {
            requestAnimationFrame(function() {
                setTimeout(() => {
                    _scroll.scrollIntoView(document.querySelector(hash), {
                        offsetTop: -_scroll.containerEl.scrollTop,
                    });
                }, 500)
            });
        }

    }
}
