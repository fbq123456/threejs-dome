import * as THREE from "three"

const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  // transparent: true,
  // opacity: 0.5
})
const mesh = new THREE.Mesh(geometry, material)

const v3 = new THREE.Vector3(100, 100, 100)

// mesh.position.x = 100

// mesh.scale.set(2, 2, 2)

// const v = new THREE.Vector3(100, 100, 100)

// v.normalize()
// mesh.translateOnAxis(v, 100)
// console.log(v3)

// const eu =  new THREE.Euler()

// mesh.rotateX(Math.PI / 4)

material.color.set("#ffdb00")

const mesh2 = mesh.clone()

mesh2.material = mesh.material.clone()

mesh2.position.y = 100

mesh2.material.color.set("#4be979")
export { mesh, mesh2 }
