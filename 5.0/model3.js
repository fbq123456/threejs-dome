import * as THREE from "three"

// const geometry = new THREE.PlaneGeometry(100, 100)
const geometry = new THREE.CircleGeometry()

//创建纹理加载器
const loadTex = new THREE.TextureLoader()
const texture = loadTex.load("../public/img/dome5.png")
const material = new THREE.MeshLambertMaterial({
  // color: 0xffffff,
  map: texture // 设置图片为材质贴图
})
const mesh = new THREE.Mesh(geometry, material)

export default mesh
