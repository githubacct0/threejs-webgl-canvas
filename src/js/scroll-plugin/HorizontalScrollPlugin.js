import Scrollbar from "smooth-scrollbar";

export default class HorizontalScrollPlugin extends Scrollbar.ScrollbarPlugin {
	transformDelta(delta, fromEvent) {
		this.getSpeed(delta);
		return delta.x == 0 ?
			{ x: delta.y, y: delta.y } :
			{ x: delta.x, y: delta.x };
	}

	getSpeed(delta) {
		speed = delta.x == 0 ? delta.y : delta.x;
	}
}

export let speed = 0;

HorizontalScrollPlugin.pluginName = "horizontalScroll";
HorizontalScrollPlugin.defaultOptions = { events: [] };
