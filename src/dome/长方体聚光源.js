import * as THREE from "three"

// 创建场景
const scene = new THREE.Scene();

// 创建相机 (视野角度, 宽高比, 最近裁剪面, 最远裁剪面)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const ju = new THREE.SpotLight('red',1.0)
scene.add(ju)
ju.angle = Math.PI / 2
ju.position.set(0, 0, 0)
scene.add(ju.target)

const juConfig = new THREE.SpotLightHelper(ju,0xffffff)
scene.add(juConfig)

// 创建渲染器并设置尺寸
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个平面长方形几何体 (宽度和高度)
const geometry = new THREE.PlaneGeometry(5, 3); // 这里宽度是5，高度是3
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }); // 设置为绿色，双面可见
// 创建网格对象
const rectangle = new THREE.Mesh(geometry, material);
// 将长方形添加到场景中
scene.add(rectangle);

// 设置相机的位置
camera.position.z = 10;

// 创建一个动画循环
function animate() {
    requestAnimationFrame(animate);

    // 可选: 可以旋转长方形，或者添加其他效果
    // rectangle.rotation.z += 0.01;

    // 渲染场景
    renderer.render(scene, camera);
}

// 开始动画
animate();

// 调整窗口大小时，更新相机和渲染器的尺寸
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});