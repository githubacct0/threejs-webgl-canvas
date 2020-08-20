import Scrollbar from "smooth-scrollbar";
import HorizontalScrollPlugin from "js/scroll-plugin/HorizontalScrollPlugin";
import WhoWeAre from "./who-we-are/who-we-are";
import WeBelieve from "./we-believe/we-believe";
import TeamScreens from "./team-screens/team-screens";
import OurStrenghts from "./our-strength/our-strength";
import ServicesBlk from "./services-blk/services-blk";
import BehindNika from "./behind-nika/behind-nika";
import SVGAnimation from "./line-svg-animation/line-svg-animation";
import ToBeGood from "./to-be-good/to-be-good";
import ContactForm from "./contact-form/contact-form";
Scrollbar.use(HorizontalScrollPlugin);

export default class About {
    constructor() {
        this.init();

        this._init;
        this._bind;

        this.sections = {
            behind_nika: new BehindNika(),
            contact_us: new ContactForm(),
            svg_animation: new SVGAnimation(),
            ourStrengths: new OurStrenghts(),
            services_blk: new ServicesBlk(),
            teamScreens: new TeamScreens(),
            to_be_good: new ToBeGood(),
            weBelieve: new WeBelieve(),
            whoWeAre: new WhoWeAre(),
        };

        this.bind();

        $('.kill_delayedCall').click(function(event) {
            this._init = null;
            this._bind = null;
        });
    }

    init() {
        $('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
        $('#news').attr('href', 'index.html#thoughts');
        this._init = () => {
            this._scroll = Scrollbar.init(
                document.querySelector(".scroll-area", {
                    continuousScrolling: false,
                    damping: 0.2,
                    plugins: {
                        horizontalScroll: {
                            events: [/wheel/],
                        },
                    },
                })
            );

            Scrollbar.detachStyle();

            window.location.hash = "";

            var hash = location.hash;

            if (hash) {
                requestAnimationFrame(function() {
                    setTimeout(() => {
                        this._scroll.scrollIntoView(document.querySelector(hash), {
                            offsetTop: -this._scroll.containerEl.scrollTop,
                        });
                    }, 500)
                });
            }
        }
        this._init();
    }

    bind() {
        this._bind = () => {
            this._scroll.addListener((scrollEvent) => {
                let scrollPercentage =
                    (scrollEvent.offset.x * 100) / scrollEvent.limit.x;


                if (scrollPercentage <= 30) {
                    this.sections.whoWeAre.animate(scrollEvent);
                }

                if (scrollPercentage >= 10 && scrollPercentage <= 100) {
                    this.sections.to_be_good.animate(scrollPercentage, 10, 100);
                }

                if (scrollPercentage <= 40) {
                    this.sections.teamScreens.animate(scrollPercentage);
                }

                if (scrollPercentage >= 23) {
                    this.sections.ourStrengths.animate();
                }

                if (scrollPercentage >= 40) {
                    this.sections.services_blk.animate();
                }

                if (scrollPercentage >= 60) {
                    this.sections.behind_nika.animate();
                }

                if (scrollPercentage >= 90) {
                    this.sections.contact_us.animate();
                }
            });

            this.sections.svg_animation.elem.anchor.click((event) => {
                event.preventDefault();
                window.location.hash = "services";
                this._scroll.scrollIntoView(
                    document.querySelector(".services_panel")
                );
            });
        }
        this._bind();
    }
}
