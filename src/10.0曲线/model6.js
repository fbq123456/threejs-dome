import * as THREE from 'three';


// const curve = new THREE.SplineCurve([
//     new THREE.Vector2(50,60),
//     new THREE.Vector2(25,0),
//     new THREE.Vector2(50,-60),
// ])
//
// const pointsArr = curve.getPoints(50)
//
//
//
//
// const geometry = new THREE.LatheGeometry(pointsArr,30)
//
// //创建网格材质
const material = new THREE.MeshLambertMaterial({
    color: '#ff8800',
    // wireframe: true,
    side: THREE.DoubleSide//双面可见
})

const heartShape = new THREE.Shape();



const x = 0, y = 0;

heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

console.log(heartShape)

const geometry = new THREE.ShapeGeometry( heartShape );

const mesh = new THREE.Mesh(geometry,material)
mesh.rotation.x = Math.PI;

export default mesh