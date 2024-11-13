import * as THREE from "three"

const geometry = new THREE.PlaneGeometry(2000, 2000)
const loadTex = new THREE.TextureLoader()

// 创建贴图
const texture = loadTex.load("../public/img/瓷砖.jpg")

texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
// 允许阵列模式
texture.repeat.set(30, 30)
const material = new THREE.MeshLambertMaterial({
  // color: 0xffffff,
  map: texture // 设置图片为材质贴图
})

geometry.rotateX(-Math.PI / 2)
const mesh = new THREE.Mesh(geometry, material)

export default mesh
