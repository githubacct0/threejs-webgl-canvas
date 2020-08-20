import { gsap } from 'gsap';
import * as THREE from "three";
import vertexShader from "../glsl/vertexShader.glsl";
import { getRatio } from "./utils/utils";

export default class Tile {
	constructor($el, scene, duration, fragmentShader) {
		this.scene = scene;

		this.$els = {
			el: $el,
			link: $el.querySelector("a"), // Important thing
		};

		this.duration = duration;

		this.mainImage = this.$els.el.querySelector("img");

		this.images = [];
		this.lightImages = [];

		this.sizes = new THREE.Vector2(0, 0);
		this.offset = new THREE.Vector2(0, 0);

		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;

		this.clock = new THREE.Clock();

		this.mouse = new THREE.Vector2(0, 0);

		this.scroll = 0;
		this.prevScroll = 0;
		this.delta = 0;

		this.loader = new THREE.TextureLoader();

		this.onChangeImage();
		this.bindEvent();

		$('.theme-switch').click(() => {
			this.onChangeImage();
		});
	}
	
	bindEvent() {
		window.addEventListener("mousemove", (e) => {
			this.onMouseMove(e);
		});

		this.$els.link.addEventListener("mouseenter", () => {
			this.onPointerEnter();
		});

		this.$els.link.addEventListener("mouseleave", () => {
			this.onPointerLeave();
		});
	}

	onPointerEnter() {
		this.isHovering = true;

		if (!this.mesh) return;

		gsap.to(this.uniforms.u_progressHover, {
			duration: this.duration,
			value: 1,
			ease: 'power2.inOut',
		});
	}

	onPointerLeave() {
		if (!this.mesh) return;

		gsap.to(this.uniforms.u_progressHover, {
			duration: this.duration,
			value: 0,
			ease: 'power2.inOut',
			onComplete: () => {
				this.isHovering = false;
			},
		});
	}

	onMouseMove(event) {
		gsap.to(this.mouse, {
			duration: 0.5,
			x: event.clientX,
			y: event.clientY,
		});
	}

	onChangeImage() {
		this.images = [];
		this.lightImages = [];
		this.scene.mainScene.remove(this.mesh);

		if ($('.theme-switch').attr('data-mode') === 'dark' || window.localStorage.getItem('theme') === 'dark') {
			this.preload(
				[
					this.mainImage.src,
					this.mainImage.dataset.hover,
					"./dist/img/shape.jpg",
				],
				this.images,
				() => {
					this.initTile(this.images);
				}
			);
		}
		if ($('.theme-switch').attr('data-mode') === 'light' || window.localStorage.getItem('theme') === 'light') {
			this.preload(
				[
					this.mainImage.src.replace('img', 'lightImg'),
					this.mainImage.dataset.hover.replace('img', 'lightImg'),
					"./dist/img/shape.jpg",
				],
				this.lightImages,
				() => {
					this.initTile(this.lightImages);
				}
			);
		}
	}

	/* Actions
	--------------------------------------------------------- */

	initTile(img) {
		const texture = img[0];
		const hoverTexture = img[1];

		this.getBounds();

		this.uniforms = {
			u_alpha: { value: 1 },
			u_map: { type: "t", value: texture },
			u_ratio: { value: getRatio(this.sizes, texture.image) },
			u_hovermap: { type: "t", value: hoverTexture },
			u_hoverratio: { value: getRatio(this.sizes, hoverTexture.image) },
			u_shape: { value: img[2] },
			u_mouse: { value: this.mouse },
			u_progressHover: { value: 0 },
			u_time: { value: this.clock.getElapsedTime() },
			u_res: {
				value: new THREE.Vector2(window.innerWidth, window.innerHeight),
			},
		};

		this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);

		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: this.vertexShader,
			fragmentShader: this.fragmentShader,
			transparent: true,
			defines: {
				PI: Math.PI,
				PR: window.devicePixelRatio.toFixed(1),
			},
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material); // this.mesh very important

		this.mesh.position.x = this.offset.x;
		this.mesh.position.y = this.offset.y;
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1);
		this.scene.mainScene.add(this.mesh);
		this.mainImage.classList.add("is-loaded");
	}

	move() {
		if (!this.mesh) return;
		this.getBounds();

		gsap.set(this.mesh.position, {
			x: this.offset.x,
			y: this.offset.y,
		});
	}

	update() {
		if (!this.mesh) return;
		this.move();
		if (!this.isHovering) return;
		this.uniforms.u_time.value += this.clock.getDelta();
	}

	/* Values
	--------------------------------------------------------- */

	getBounds() {
		const {
			width,
			height,
			left,
			top,
		} = this.mainImage.getBoundingClientRect();

		if (!this.sizes.equals(new THREE.Vector2(width, height))) {
			this.sizes.set(width, height);
		}

		if (
			!this.offset.equals(
				new THREE.Vector2(
					left - window.innerWidth / 2 + width / 2,
					-top + window.innerHeight / 2 - height / 2
				)
			)
		) {
			this.offset.set(
				left - window.innerWidth / 2 + width / 2,
				-top + window.innerHeight / 2 - height / 2
			);
		}
	}

	preload($els, img, allImagesLoadedCallback) {
		let loadedCounter = 0;
		const toBeLoadedNumber = $els.length;
		const preloadImage = ($el, anImageLoadedCallback) => {
			const image = this.loader.load($el, anImageLoadedCallback);
			image.center.set(0.5, 0.5);
			img.push(image);
		};

		$els.forEach(($el) => {
			preloadImage($el, () => {
				loadedCounter += 1;
				if (loadedCounter === toBeLoadedNumber) {
					allImagesLoadedCallback();
				}
			});
		});
	}
}
