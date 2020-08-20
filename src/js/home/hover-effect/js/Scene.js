import * as THREE from "three";
import Tile from "./Tile";
import shapeShader from "../glsl/shapeShader.glsl";




const perspective = 800;

const shaders = shapeShader;

export default class Scene {
    constructor($scene) {
        this.container = $scene;
        this.$tiles = document.querySelectorAll(".slideshow-list__el");
        this.W = window.innerWidth;
        this.H = window.innerHeight;

        this.mouse = new THREE.Vector2(0, 0);
        this.activeTile = null;

        this.start();
    }

    start() {
        this.mainScene = new THREE.Scene();
        this.initCamera();
        this.initLights();

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container,
            alpha: true,
        });

        this.renderer.setSize(this.W, this.H);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.tiles = Array.from(this.$tiles).map(
            ($el) => new Tile($el, this, 0.5, shaders)
        );

        this.update();
    }

    initCamera() {
        const fov = (180 * (2 * Math.atan(this.H / 2 / perspective))) / Math.PI;

        this.camera = new THREE.PerspectiveCamera(
            fov,
            this.W / this.H,
            1,
            10000
        );
        this.camera.position.set(0, 0, perspective);
    }

    initLights() {
        const ambientlight = new THREE.AmbientLight(0xffffff, 2);
        this.mainScene.add(ambientlight);
    }

    /* Actions
    --------------------------------------------------------- */

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.tiles.forEach((tile) => {
            tile.update();
        });
        this.renderer.render(this.mainScene, this.camera);
    }
}
