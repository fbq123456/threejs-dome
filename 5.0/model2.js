import * as THREE from "three"

const geometry = new THREE.BufferGeometry() //创建一个几何体对象
//类型数组创建顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, //顶点1坐标
  160,
  0,
  0, //顶点2坐标
  160,
  80,
  0, //顶点3坐标
  0,
  80,
  0 //顶点4坐标
])
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3) //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue

// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([0, 1, 2, 0, 2, 3])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1) //1个为一组

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader()
const texture = texLoader.load("../public/img/earth.jpg")
const material = new THREE.MeshBasicMaterial({
  map: texture //map表示材质的颜色贴图属性
})
const mesh = new THREE.Mesh(geometry, material)

export default mesh
