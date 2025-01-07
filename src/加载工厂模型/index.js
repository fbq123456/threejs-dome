import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
//伽马矫正处理
import { GammaCorrectionShader } from 'three/addons/shaders/GammaCorrectionShader.js'
//使用后处理shader创建后处理通道
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js'


import  model  from './model.js';//模型对象
import gui from '../gui/index.js'

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(63, 60, 0);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
gui.add(directionalLight.position,'x',-100,1000).name('x轴')
gui.add(directionalLight.position,'z',-100,1000).name('z轴')

directionalLight.castShadow = true //平行光开启阴影得计算功能

directionalLight.shadow.camera.left = -100
directionalLight.shadow.camera.right = 100
directionalLight.shadow.camera.top = 100
directionalLight.shadow.camera.bottom = -100
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 100
//阴影边缘锯齿感得时候，可以适当提升像素
directionalLight.shadow.mapSize.set(1080,1080)
//模糊弱化阴影边缘
directionalLight.shadow.radius = 3



// 可视化相机得范围
const camerHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(camerHelper)

const dirHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dirHelper)

gui.add(directionalLight.position,'y',-100,1000).name('y轴').onChange(function (value) {
  dirHelper.update();
})

const obj = {
  R:100,
  angle:0
}
gui.add(obj,'R',0,300).onChange(function (value) {
  directionalLight.position.x = value * Math.cos(obj.angle)
  directionalLight.position.z = value * Math.cos(obj.angle)
  dirHelper.update();
})

gui.add(obj,'angle',0,Math.PI * 2).onChange(function (value) {
  directionalLight.position.x = obj.R * Math.cos(value)
  directionalLight.position.z = obj.R * Math.cos(value)
  dirHelper.update();
})

const arm = gui.addFolder('平行光阴影')

const vrm = directionalLight.shadow.camera

arm.add(vrm,'left',-500,0).onChange(function (v) {
  vrm.updateProjectionMatrix() //相机更新矩阵对象
  camerHelper.update(); //相机辅助对象需要改变
})

arm.add(vrm,'far',100,1000).onChange(function (v) {
  vrm.updateProjectionMatrix() //相机更新矩阵对象
  camerHelper.update(); //相机辅助对象需要改变
})


//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 20, 3000);
// camera.position.set(292, 223, 185);
camera.position.set(200, 200, 200);//根据渲染范围尺寸数量级设置相机位置
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);


//第一步：创建后处理对象EffectComposer ，WebGl渲染器作为参数
const composer = new EffectComposer(renderer);

//第二步：创建一个渲染器通道，场景和相机作为参数
const renderPass = new RenderPass(scene, camera);
//设置renderPass通道
composer.addPass(renderPass)

//创建伽马矫正通道（解决设置后处理后的效果不一致）
const gammaPass = new ShaderPass(GammaCorrectionShader)
composer.addPass(gammaPass)

//第三步：描边发光
  const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
  const outlinePass = new OutlinePass(v2,scene, camera);
  composer.addPass(outlinePass)
  //描边颜色
  outlinePass.visibleEdgeColor.set('#ff6700')
  //描边厚度
  outlinePass.edgeThickness = 4
  //描边亮度
  outlinePass.edgeStrength = 6
  //描边闪烁
  outlinePass.pulsePeriod = 1


//解决加载gltf格式模型颜色偏差问题
renderer.outputEncoding = THREE.sRGBEncoding; //设置后处理后设置无效
renderer.shadowMap.enabled = true //接受阴影，需要设置
renderer.shadowMap.type = THREE.VSMShadowMap  //阴影清晰，没有条纹状


//抗锯齿效果
const pixelRation = renderer.getPixelRatio()
const smaaPass = new SMAAPass(width * pixelRation, height * pixelRation);
composer.addPass(smaaPass)

// 渲染循环
function render() {
  // renderer.render(scene, camera);
  composer.render()
  requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};


// 封装一个函数来处理事件绑定
function addClickListenerByName(name, callBack) {
  const buttons = document.getElementsByClassName(name);

  // 使用 for...of 循环遍历每个按钮并添加事件监听器
  for (let button of buttons) {
    button.addEventListener('click', callBack);
  }
}

// 为 left_btn 和 right_btn 按钮添加点击事件监听
addClickListenerByName('left_btn', function (e) {
  const a = model.getObjectByName('设备A')
  outlinePass.selectedObjects = [a]
});
addClickListenerByName('right_btn', function (e) {
  const b = model.getObjectByName('设备B')
  outlinePass.selectedObjects = [b]
});


