import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';
import WorkDetail from 'work/work-detail';
import Menu from "js/menu/menu";

let workDetail = null;
// Fade
class WorkDetailTransition extends Highway.Transition {
	//in
	in ({ from, to, done }) {
		from.remove();
		setTimeout(() => {
			workDetail = new WorkDetail();
		}, 300)
		setTimeout(() => {
			let clipPathElm = document.querySelectorAll('.preload-container');
			let tl = gsap.timeline({ delay: 0.5, onComplete: complete });
			tl.fromTo(clipPathElm, {
				css: {
					'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
				}
			}, {
				duration: 1.5,
				css: {
					'transform-origin': "top right",
					'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
				},
				stagger: -0.03,
				ease: 'power3.inOut',
			})

			function complete() {
				done();
			}
		}, 500)

	}

	// out
	out({ from, done }) {
		$('#closeNavbar, .kill_delayedCall').trigger('click');
		let clipPathElm = document.querySelectorAll('.preload-container');
		let tl = gsap.timeline({ onComplete: complete });

        tl.fromTo(clipPathElm, {
			css: {
				'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
			}
		}, {
			duration: 1.5,
			css: {
				'transform-origin': "top right",
				'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
			},
			stagger: 0.03,
			ease: 'power3.inOut',
		})

		function complete() {
			gsap.globalTimeline.clear();
			done();
		}
	}
}

export default WorkDetailTransition;
