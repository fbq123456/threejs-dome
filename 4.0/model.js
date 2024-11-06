import * as THREE from "three"

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff
})
const mesh = new THREE.Mesh(geometry, material)
// const mesh2 = new THREE.Mesh(geometry, material)

// mesh2.translateX(150)

const group = new THREE.Group()
mesh.position.x = 50

group.position.x = 50

group.add(mesh)
// group.add(mesh2)
// group.add(mesh, mesh2)

const h = new THREE.Vector3()
mesh.getWorldPosition(h)

console.log(h)

// 局部坐标系
const meshAxesHelper = new THREE.AxesHelper(50)
mesh.add(meshAxesHelper)
export default group
