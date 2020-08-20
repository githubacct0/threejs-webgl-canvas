import Highway from '@dogstudio/highway';
import { gsap } from 'gsap';
import Menu from "js/menu/menu";
import Home from 'home/home';
import About from 'about/about';
import Work from 'work/work';

// Fade
class HomeRenderer extends Highway.Renderer {
	onEnter() {
		let home = new Home();
	}
}

export default HomeRenderer;
