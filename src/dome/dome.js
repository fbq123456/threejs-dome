// 引入threejs
import * as THREE from "three"

// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import gui from '../gui/index.js'

// 创建材质子菜单
const matFolder1 = gui.addFolder('外壳材质');
matFolder1.close(); //关闭菜单

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//创建场景
const three = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

// 创建灯光
const ambientLight = new THREE.AmbientLight("#ffffff", 20) // 减少环境光的强度
three.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("#ffffff", 10) // 更改方向光的颜色和强度
directionalLight.position.set(1, 1, 1).normalize()
three.add(directionalLight)

// 增加场景光照
const pointLight = new THREE.PointLight("#ffffff", 10, 10)
pointLight.position.set(100, 100, 100)
three.add(pointLight)

//添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
three.add(axesHelper)

// // 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// // 设置带阻尼的惯性
// controls.enableDamping = true
// // 设置阻尼系数
// controls.dampingFactor = 0.05
// // 设置旋转速度
// controls.autoRotate = true

camera.position.set(5, 3, 10)

controls.update()

// 添加环境贴图
const textCube = new THREE.CubeTextureLoader()
    .setPath('../public/img/环境贴图1/')
    .load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'
    ])
var loader = new GLTFLoader()
loader.load(
  "./img/maikailun/scene.gltf",
  function (object) {
    var model = object.scene
      const data = ['Object_7','Object_18',"Object_158","Object_144","Object_90",'Object_65'] //18左车门
      const list = ['Object_192','Object_181'] //轮胎
      const boli = ['Object_174','Object_171',"Object_160",'Object_151',"Object_146","Object_92"] //174玻璃 171大灯 160尾部壳子 151后窗 146车盖黑色1 92车盖黑色2
      // console.log(mesh1.material,'sss')

      console.log(model)

// 创建一个全局对象来管理控制器的状态
      let colorControl = { color: "#ffffff" };

      object.scene.traverse(function (obj) {
          if (obj.isMesh) {
              // 判断是否是网格材质
              if (data.includes(obj.name)) {
                  obj.material = new THREE.MeshPhysicalMaterial({
                      color: obj.material.color, // 默认颜色
                      metalness: 0.9, // 车外壳金属度
                      roughness: 0.5, // 车外壳粗糙度
                      clearcoat: 1, // 清漆层
                      clearcoatRoughness: 0.01, // 清漆层粗糙度
                      envMap: textCube, // 环境贴图
                      envMapIntensity: 2.5, // 环境贴图对Mesh表面影响程度
                  });

                  // 获取当前颜色的16进制字符串
                  const color = obj.material.color.getHexString();

                  // 将颜色绑定到全局的 colorControl 对象
                  colorControl.color = `#${color}`;

                  // 创建一个单独的颜色控制器
                  if (!matFolder1._controlsAdded) {
                      matFolder1.addColor(colorControl, 'color').onChange(function (value) {
                          data.forEach(item => {
                              const mesh1 = object.scene.getObjectByName(`${item}`);
                              if (mesh1 && mesh1.material) {
                                  mesh1.material.color.set(value); // 设置新的颜色
                              }
                          });
                      }).name('颜色')

                      matFolder1._controlsAdded = true; // 标记为已添加控制器
                  }
              }
          }
      });




    model.position.set(0, 0, 0) // 确保模型在中心
    model.scale.set(3, 3, 3) // 调整模型大小为原来的两倍
    three.add(model)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)


//渲染函数
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(three, camera)
}


animate()
