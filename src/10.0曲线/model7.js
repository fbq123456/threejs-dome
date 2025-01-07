import * as THREE from 'three';


const pointsArr = [
    // new THREE.Vector2(-50,-50),
    // new THREE.Vector2(-60,0),
    // new THREE.Vector2(0,50),
    // new THREE.Vector2(60,0),
    // new THREE.Vector2(50,-50),
    new THREE.Vector2(-50,-50),
    new THREE.Vector2(-50,0),
    new THREE.Vector2(50,0),
    new THREE.Vector2(50,-50),
]
// const shape = new THREE.Shape(pointsArr)

const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10,-50,-50),
    new THREE.Vector3(10,0,0),
    new THREE.Vector3(8,50,50),
    new THREE.Vector3(-5,0,100),
])

const shape = new THREE.Shape()
shape.moveTo(10,0)
shape.lineTo(100,0)
shape.lineTo(100,100)
shape.lineTo(10,100)
//拉伸造型
const  geometry =  new THREE.ExtrudeGeometry(shape,{
    // extrudePath:curve, //路径拉伸
    // curveSegments:30,
    steps:100,
    depth:50,
    // bevelEnabled:false,
    // bevelThickness: 10,
    // bevelSize:5,
    // bevelSegments:1
})
// const geometry = new THREE.ShapeGeometry(shape)
// //创建网格材质
const material = new THREE.MeshLambertMaterial({
    color: '#ff8800',
    // wireframe: true,
})



const mesh = new THREE.Mesh(geometry,material)

export default mesh