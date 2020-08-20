import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';
import WorkDetail from 'work/work-detail';
import Menu from "js/menu/menu";
// const imagesLoaded = require('imagesloaded');


let workDetail = null;
// Fade
class WorkDetailTransition extends Highway.Transition {
	//in
	in ({ from, to, done }) {
		console.log(to);
		from.remove();
		setTimeout(() => {
			workDetail = new WorkDetail();
			// imagesLoaded( document.querySelector('.work_detail_page'), function( instance ) {
			// });
		}, 300)
		setTimeout(() => {
			let clipPathElm = document.querySelectorAll('.preload-container');
			let tl = gsap.timeline({ delay: 0.5, onComplete: complete });
			tl.fromTo(clipPathElm, {
				css: {
					'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
				}
			}, {
				duration: 1,
				css: {
					'transform-origin': "top right",
					'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
				},
				stagger: -0.03,
				ease: 'power3.inOut',
			})

			function complete() {
				if ($('.home_page')[0]) {
					$('#news, #contacts, .scrollToContact').attr('href', 'javascript:void(0);');
				} else {
					$('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
					$('#q-intro-scroll .scrollToContact').attr('href', 'javascript:void(0);');
					$('#news').attr('href', 'index.html#thoughts');
				}
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
			duration: 1,
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
