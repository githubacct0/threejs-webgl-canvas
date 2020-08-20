import { gsap } from 'gsap';
gsap.config({
	nullTargetWarn: false,
});
import Highway from '@dogstudio/highway';
// import { listen, prefetch } from "quicklink";
// import Quicklink from 'quicklink/dist/quicklink.mjs';
import 'intersection-observer';
import DefaultTransition from 'js/highway/transition/default-transition.js';
import HomeTransition from 'js/highway/transition/home-transition.js';
import AboutTransition from 'js/highway/transition/about-transition.js';
import WorkDetailTransition from 'js/highway/transition/work-transition.js';

// CSS Imports
import "./css/app.scss";
import Menu from "js/menu/menu";
import Cursor from "js/custom-cursor/custom-cursor";
import Theme from "js/theme/theme";
import Preload from 'js/pre-load/pre-load';
import Home from 'home/home';
import About from 'about/about';
import WorkDetail from 'work/work-detail';

const APP = window.APP || {};

/*-----------------------------------------------------------------------------------*/
/*  01. INIT
/*-----------------------------------------------------------------------------------*/

const initApp = () => {
	window.APP = APP;

	APP.cursor = new Cursor();
	APP.theme = new Theme();
	APP.menu = new Menu();
	if ($('.home_page,.work_page')[0]) {
		setTimeout(() => {
			APP.home = new Home();
		}, 200)
	}
	if ($('.about_page')[0]) {
		setTimeout(() => {
			APP.about = new About();
		}, 200)
	}
	if ($('.work_detail_page')[0]) {
		setTimeout(() => {
			APP.workDetail = new WorkDetail();
		}, 200)
	}
};

const preLoadApp = () => {
	window.APP = APP;
	APP.preload = new Preload();
};

$(document).ready(() => {
	initApp();
})

document.onreadystatechange = function() {
	if (document.readyState == "interactive") {
		if ($('.home_page')[0]) {
			$('#news, #contacts, .scrollToContact').attr('href', 'javascript:void(0);');
		} else {
			$('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
			$('#q-intro-scroll .scrollToContact').attr('href', 'javascript:void(0);');
			$('#news').attr('href', 'index.html#thoughts');
		}
		preLoadApp();
	}
};



const H = new Highway.Core({
	transitions: {
		default: DefaultTransition,
		home: HomeTransition,
		about: AboutTransition,
		work: HomeTransition,
		workDetail: WorkDetailTransition,
	}
});

H.on('NAVIGATE_END', ({ to }) => {
	if ($('.home_page')[0]) {
		$('#news, #contacts, .scrollToContact').attr('href', 'javascript:void(0);');
	} else {
		$('#contacts, .scrollToContact').attr('href', 'index.html#contactUs');
		$('#q-intro-scroll .scrollToContact').attr('href', 'javascript:void(0);');
		$('#news').attr('href', 'index.html#thoughts');
	}
});
