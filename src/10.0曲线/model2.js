import * as THREE from 'three';



// const arc = new THREE.EllipseCurve(0,0,120,50)// 椭圆
// const arc = new THREE.ArcCurve(0,0,50,0, (1 * Math.PI) / 2,false) //圆曲线
const arc = new THREE.ArcCurve(0,0,50,0) //圆曲线
const pointsArr = arc.getPoints(50) //返回51个点

const geometry = new THREE.BufferGeometry()

geometry.setFromPoints(pointsArr);

// const material = new THREE.PointsMaterial({
//     color: 0xffff00,
//     size: 10.0 // 点对象像素尺寸
// })
//
// const points = new THREE.Points(geometry, material)

const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
})

const linc = new THREE.Line(geometry, material)

export default linc