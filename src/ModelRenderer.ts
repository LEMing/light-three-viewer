import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ModelRenderer {
  private readonly container: HTMLElement | null;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(elementId: string, modelUrl: string) {
    this.container = document.getElementById(elementId);

    if (!this.container) {
      throw new Error(`No element found with ID ${elementId}`);
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild(this.renderer.domElement);

    this.loadModel(modelUrl);
  }

  private loadModel(modelUrl: string): void {
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        this.scene.add(gltf.scene);
        this.camera.position.z = 5;
        this.animate();
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
