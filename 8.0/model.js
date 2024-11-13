import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"


// 加载glt模型对象
const loader = new GLTFLoader()

// 添加组
const model = new THREE.Group()

// 添加环境贴图
const textCube = new THREE.CubeTextureLoader()
    .setPath('../public/img/环境贴图1/')
    .load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'
])
textCube.encoding = THREE.sRGBEncoding; //设置纹理贴图编码方式和WebGL渲染器一致
// 加载模型
loader.load("../public/img/轿车.glb",glt => {
// loader.load("../public/img/金属.glb",glt => {

    // glt.scene.traverse(obj => {
    //     if(obj.isMesh) {//判断是否是网格材质
    //         obj.material.metalness = 1.0
    //         obj.material.roughness = 0.35
    //         obj.material.envMap = textCube
    //         obj.material.envMapIntensity = 1.0
    //         obj.material.clearcoat = 1 //清漆层
    //         obj.material.clearcoatRoughness = 0.01  //清漆层粗糙度
    //
    //     }
    //
    // })
    model.add(glt.scene)

    const mesh = glt.scene.getObjectByName('外壳01');
    mesh.material = new THREE.MeshPhysicalMaterial({
        color: mesh.material.color, //默认颜色
        // color: 0x222222,//换一种颜色
        metalness: 0.9,//车外壳金属度
        roughness: 0.5,//车外壳粗糙度
        clearcoat: 1, //清漆层
        clearcoatRoughness: 0.01, //清漆层粗糙度
        envMap: textCube, //环境贴图
        envMapIntensity: 2.5, //环境贴图对Mesh表面影响程度
    })



})

export default model
