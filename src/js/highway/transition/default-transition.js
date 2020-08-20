import Highway from '@dogstudio/highway';
import Menu from "js/menu/menu";

// GSAP Library
import { gsap } from 'gsap';

// Fade
class DefaultTransition extends Highway.Transition {
	//in
	in ({ from, to, done }) {
		from.remove();
		let clipPathElm = document.querySelectorAll('.preload-container');
		let tl = gsap.timeline({ delay: 0.5, onComplete: complete });

		tl.fromTo(clipPathElm, {
			css: {
				'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
			}
		}, {
			duration: 1,
			transformOrigin: "top right",
			css: {
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

	}

	// out
	out({ from, done }) {
		$('#closeNavbar').trigger('click');
		let clipPathElm = document.querySelectorAll('.preload-container');
		let tl = gsap.timeline({ onComplete: done });

		tl.fromTo(clipPathElm, {
			css: {
				'clip-path': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
			}
		}, {
			duration: 1,
			transformOrigin: "top right",
			css: {
				'clip-path': 'polygon(0% 0%, 100% 0%, 110% 100%, 0% 100%)'
			},
			stagger: 0.03,
			ease: 'power3.inOut',
		})
	}
}

export default DefaultTransition;
