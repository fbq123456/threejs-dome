import * as THREE from 'three';

import { OrbitControls } from "three/addons/controls/OrbitControls.js"
//后期处理扩展库
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'

//渲染器通道
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'

//效果通道
// 描边效果
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js'
// 发光效果
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
//闪屏效果
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js'



import { model, mesh } from "./model.js" //模型对象

//场景
const scene = new THREE.Scene()
scene.add(model) //模型对象添加到场景中



//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(100, 60, 50)
scene.add(directionalLight)
const ambient = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

//渲染器和相机
const width = window.innerWidth
const height = window.innerHeight
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(292, 223, 185)
camera.lookAt(0, 0, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)


//第一步：创建后处理对象EffectComposer ，WebGl渲染器作为参数
const composer = new EffectComposer(renderer);

//第二步：创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
//设置renderPass通道
composer.addPass(renderPass)



//第三步：
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight))
composer.addPass(bloomPass)
//发光强度
bloomPass.strength = 0.7


//第三步：描边发光
// const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
// const outlinePass = new OutlinePass(v2,scene, camera);
// outlinePass.selectedObjects = [mesh]
// composer.addPass(outlinePass)
// //描边颜色
// outlinePass.visibleEdgeColor.set('#ff6700')
// //描边厚度
// outlinePass.edgeThickness = 4
// //描边亮度
// outlinePass.edgeStrength = 6
// //描边闪烁
// outlinePass.pulsePeriod = 1

//第三步:
const glitchPass = new GlitchPass()
composer.addPass(glitchPass)

// 渲染循环
function render() {
    composer.render()
    // renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()

const controls = new OrbitControls(camera, renderer.domElement)

// 画布跟随窗口变化
window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}




