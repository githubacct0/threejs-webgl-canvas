import { gsap } from 'gsap';
import RevolveEfect from './revolve-effect'
export default class firstSection {
    constructor() {
        this.revolveEffect = new RevolveEfect();
        this.init();
    }
    init() {
        // Brand Hover Effect

        let brand_s = $(".brand-head");
        let website_s = $(".website-head");

        let intervalHolder_b = undefined;
        let intervalHolder_w = undefined;

        let count = 0;
        let currImg = undefined;
        let prevImg = undefined;

        let assign = {
            b: $(".brand-head-image"),
            w: $(".website-head-image"),
        };

        this.revolveEffect.animation();

        $("body").on('mouseenter', '.brand-head', function() {
            clearInterval(intervalHolder_b);
            clearImages();
            hoverInitiate(assign.b, "brand");
        }).on('mouseout', '.brand-head', function() {
            setTimeout(function() {
                clearInterval(intervalHolder_b);
                clearImages();
            }, 300)
        });

        function hoverInitiate(imgSet, type) {
            count = 0;
            currImg = imgSet[count];

            if (currImg) {
                gsap.fromTo(currImg, {
                    scale: 1.5,
                    autoAlpha: 0
                }, {
                    duration: 0.2,
                    scale: 1,
                    autoAlpha: 0.2,
                    onComplete: () => {
                        prevImg = currImg;
                        if (type === "website") {
                            intervalHolder_w = setInterval(() => {
                                displayImages(imgSet);
                            }, 150);
                        } else {
                            intervalHolder_b = setInterval(() => {
                                displayImages(imgSet);
                            }, 150);
                        }
                    },
                });
            }
        }

        function displayImages(imgsArray) {
            count++;
            count = count < imgsArray.length ? count : 0;
            currImg = imgsArray[count];
            if (currImg) {
                gsap.set(currImg, { autoAlpha: 0.2, "z-index": 1 });
            }
            if (prevImg !== undefined) {
                gsap.set(prevImg, {
                    autoAlpha: 0,
                    scale: 1
                });
            }
            prevImg = currImg;
        }

        function clearImages() {
            if (prevImg) {
                gsap.to(prevImg, {
                    duration: 0.2,
                    scale: 1.5,
                    autoAlpha: 0,
                    "z-index": "unset",
                    onComplete: () => {
                        count = 0;
                        if (prevImg) {
                            gsap.set(prevImg, { scale: 1, autoAlpha: 0 });
                        }
                    },
                });
            }
        }

        // Line Animation

        let y = $(".st0");

        var tl = gsap.timeline();
        tl.fromTo(y, { "stroke-dashoffset": 430 }, { duration: 0.65, "stroke-dashoffset": 0 })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);

        var tl2 = gsap.timeline();
        tl2.fromTo(y, { autoAlpha: 1, x: "-=20" }, { duration: 0.65, autoAlpha: 1, x: 0 })
            .yoyo(true)
            .repeatDelay(1)
            .repeat(-1);

    }
}
