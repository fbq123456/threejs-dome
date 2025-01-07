import * as THREE from "three"

//加载贴图
const map = new THREE.TextureLoader().load( '../public/img/指南针.png' );

//创建精灵材质
const material = new THREE.SpriteMaterial( {
    map: map,
    transparent: true,
    color: '#1ed76d'
} );

const sprite = new THREE.Sprite( material );
sprite.scale.set(200, 200, 1)

export default sprite