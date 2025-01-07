import * as THREE from 'three';

// 外轮廓
const shape = new THREE.Shape();
shape.lineTo(100,0)
shape.lineTo(100,100)
shape.lineTo(0,100)

const path1 = new THREE.Path();
path1.absarc(20,20,10)

const path2 = new THREE.Path();
path2.absarc(80,20,10)

const path3 = new THREE.Path();
path3.moveTo(50,50)
path3.lineTo(80,50)
path3.lineTo(80,80)
path3.lineTo(50,80)

shape.holes.push(path1,path2,path3)

// const geometry = new THREE.BoxGeometry(50,50,50)
// const geometry = new THREE.ShapeGeometry(shape)
const  geometry =  new THREE.ExtrudeGeometry(shape,{
    steps:100,
    depth:50,
})
const material = new THREE.MeshLambertMaterial({
    color:0x004444
})

const edges = new THREE.EdgesGeometry(geometry)
const edgesMaterial = new THREE.LineBasicMaterial({
    color:0x00ffff
})

const line = new THREE.LineSegments(edges,edgesMaterial)
const mesh = new THREE.Mesh(geometry, material)

mesh.add(line)
export default mesh