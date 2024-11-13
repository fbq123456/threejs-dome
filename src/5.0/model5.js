import * as THREE from "three"

const geometry = new THREE.PlaneGeometry(50, 50)
//创建纹理加载器
const loadTex = new THREE.TextureLoader()
const material = new THREE.MeshLambertMaterial({
  // color: 0xffffff,
  map: loadTex.load("../public/img/转弯.png"), // 设置图片为材质贴图
  transparent: true
})
console.log(material)
const mesh = new THREE.Mesh(geometry, material)
mesh.rotateX(-Math.PI / 2)
export default mesh
