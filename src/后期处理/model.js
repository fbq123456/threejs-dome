import * as THREE from "three"

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
})
const mesh = new THREE.Mesh(geometry, material)

const mesh2 = mesh.clone()
mesh2.position.y = 100
mesh2.material = mesh.material.clone()
mesh2.material.color.set("#4be979")

const mesh3 = mesh.clone()
mesh3.position.x = 100

const model = new THREE.Group()
model.add(mesh,mesh2,mesh3)
export { model,mesh, mesh2, mesh3 }
