import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"


// 加载glt模型对象
const loader = new GLTFLoader()

const mesh = new THREE.Group()

// 加载手机颜色贴图
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('../public/img/黑色.png')
texture.encoding = THREE.sRGBEncoding //和模型保持一致
texture.flipY = false //贴图翻转属性和模型保持一致

// 加载模型
loader.load("../public/img/手机模型.glb",glt => {
    const a = glt.scene.children[0]


    a.material.map = texture
    mesh.add(glt.scene)
    // mesh.material.map = texture.map
})

export default mesh