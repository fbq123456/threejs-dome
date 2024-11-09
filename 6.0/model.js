import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"

//
// 创建一个新的GLTFLoader实例，用于加载和解析gITF格式的3D模型
const loader = new GLTFLoader()

const mesh = new THREE.Group()

loader.load("../public/工厂.gltf", glt => {
  console.log(glt)

  const nameNode = glt.scene.getObjectByName("草地")
  nameNode.material.color.set("#e8c56b")
  mesh.add(glt.scene)
})

export default mesh
