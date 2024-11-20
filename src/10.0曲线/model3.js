import * as THREE from 'three';

// 三维向量Vector3创建一组顶点坐标
// const arr = [
//     new THREE.Vector3(-50, 20, 90),
//     new THREE.Vector3(-10, 40, 40),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(60, -60, 0),
//     new THREE.Vector3(70, 0, 80)
// ]

const p1 = new THREE.Vector3(0, 0,100);
const p2 = new THREE.Vector3(0, 0,30);
const p3 = new THREE.Vector3(0, 0,0);
const p4 = new THREE.Vector3(30, 0,0);
const p5 = new THREE.Vector3(100, 0,0);

const line1 = new THREE.LineCurve3(p1, p2); // 创建直线

const curve = new THREE.QuadraticBezierCurve3(p2, p3, p4); // 创建贝塞尔曲线

const line2 = new THREE.LineCurve3(p4, p5); // 创建直线

const CurvePath = new THREE.CurvePath()  //拼接曲线

CurvePath.curves.push(line1,curve,line2);

// 三维样条曲线
// const curve = new THREE.CatmullRomCurve3(arr);


const geometry = new THREE.TubeGeometry( CurvePath, 100, 3, 30 ); //创建管道
// 线材质
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide  //双面显示看到管道内壁
});
// 线模型

const mesh = new THREE.Mesh(geometry, material)

export default mesh;