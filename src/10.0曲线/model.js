import * as THREE from 'three';


const geometry = new THREE.BufferGeometry(); //创建一个几何体对象


const R = 100 //圆弧半径
const N = 50  //分段数量

const sp = 2 * Math.PI / N //两个相邻点间隔弧度

const arr = []

for (let i = 0; i < N; i++) {
 const angle = sp * i
    const x = 200+ R * Math.cos(angle)
    const y = 200+ R * Math.sin(angle)
    arr.push(x,y,0)
}


//类型数组创建顶点数据
const vertices = new Float32Array(arr);
// 创建属性缓冲区对象
const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 线材质
const material = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
const line = new THREE.LineLoop(geometry, material); //线条模型对象


export default line;