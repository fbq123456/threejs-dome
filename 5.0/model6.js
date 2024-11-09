import * as THREE from "three"

const geometry = new THREE.PlaneGeometry(200, 20)

//创建纹理加载器
const loadTex = new THREE.TextureLoader()
const texture = loadTex.load("../public/img/纹理2.jpg")
const material = new THREE.MeshLambertMaterial({
  // color: 0xffffff,
  map: texture // 设置图片为材质贴图
})

texture.wrapS = THREE.RepeatWrapping //映射模式
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateX(-Math.PI / 2)
export { mesh, texture }
