import * as THREE from "three"

const geometry = new THREE.BoxGeometry(100, 100, 100)

//创建纹理加载器
const loadTex = new THREE.TextureLoader()
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
})
const mesh = new THREE.Mesh(geometry, material)

export default mesh

//两个模型重合，会出现深度冲突问题：
// 解决方式一：可以适当调整位置
//解决方式二：设置深度缓冲区，在webGl渲染器设置logarithmicDepthBuffer 为true