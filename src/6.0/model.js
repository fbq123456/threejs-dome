import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import {log} from "three/nodes";

//
// 创建一个新的GLTFLoader实例，用于加载和解析gITF格式的3D模型
const loader = new GLTFLoader()

const mesh = new THREE.Group()

loader.load("../public/工厂.gltf", glt => {
  console.log(glt)
  //批量修改模式材质
  glt.scene.traverse((obj) => {
    if(obj.isMesh) {

      // 批量修改材质
      // obj.material = new THREE.MeshLambertMaterial({
      //   color: 0xffffff,
      // })
      // console.log('obj',obj)
    }
  })
  // const nameNode = glt.scene.getObjectByName("草地")
  // nameNode.material.color.set("#e8c56b")
  mesh.add(glt.scene)
})

export default mesh
