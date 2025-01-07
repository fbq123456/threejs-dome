import * as THREE from "three"

// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 20, 100)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true

// 使用GLTFLoader加载真实的圣诞树模型
const loader = new GLTFLoader()
loader.load(
  "path/to/realistic_christmas_tree_model.glb",
  function (gltf) {
    const tree = gltf.scene
    tree.scale.set(10, 10, 10) // 调整树的大小
    scene.add(tree)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

// 添加彩灯
const lightGeometry = new THREE.SphereGeometry(0.2, 8, 8)
const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 })
for (let i = 0; i < 10; i++) {
  const light = new THREE.Mesh(lightGeometry, lightMaterial)
  light.position.set(Math.random() * 10 - 5, Math.random() * 20, Math.random() * 10 - 5)
  scene.add(light)
}

// 动画循环
function animate() {
  requestAnimationFrame(animate)

  controls.update()
  renderer.render(scene, camera)
}

animate()

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})
