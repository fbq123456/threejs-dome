// 引入Three.js
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("../../工厂.gltf", function (gltf) { //gltf加载成功后返回一个对象
  console.log(gltf)
  gltf.scene.traverse(obj => {
    if(obj.isMesh) {//判断是否是网格模型
      //批量设置所有Mesh都可以产生阴影和接受阴影
      obj.castShadow = true
      obj.receiveShadow = true
    }
  })
  model.add(gltf.scene); //三维场景添加到model组对象中
})
const group = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
model.add(group)

const map = new THREE.TextureLoader().load( '../public/img/雪花.png' );
//创建精灵材质
const material = new THREE.SpriteMaterial( {
  map: map,
  transparent: true,
} );



for (let i = 0; i < 15000; i++) {
  const sprite = new THREE.Sprite(material);
  group.add(sprite)
  sprite.scale.set(2, 2, 1)
  const x = 1000 * (Math.random() -0.5)
  const y = 500 * Math.random()
  const z = 1000 * (Math.random() -0.5)
  sprite.position.set(x, y, z)
}
// const clock = new THREE.Clock()

function loop() {
  // const t = clock.getDelta();
  group.children.forEach((sprite) => {
    // 调整雨滴下落的速度，使其与帧率无关
    // const fallSpeed = 60; // 设置固定的下落速度
    sprite.position.y -= 1

    // 如果雨滴低于地面，则重置位置
    if (sprite.position.y < 0) {
      sprite.position.y = 500;
    }
  });

  requestAnimationFrame(loop);
}

loop();

export default model;
