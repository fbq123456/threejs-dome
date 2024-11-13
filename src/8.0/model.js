import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import gui from '../gui/index.js'


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

    glt.scene.traverse(obj => {
        console.log(obj,'obj')
        // if(obj.isMesh) {//判断是否是网格材质
        //     console.log('obj.material',obj.material);
        //     // obj.material.metalness = 1.0
        //     // obj.material.roughness = 0.35
        //     // obj.material.envMap = textCube
        //     // obj.material.envMapIntensity = 1.0
        //     // obj.material.clearcoat = 1 //清漆层
        //     // obj.material.clearcoatRoughness = 0.01  //清漆层粗糙度
        //
        // }

    })
    console.log( glt.scene.getObjectByName('车标'),'s')
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


    const glass = glt.scene.getObjectByName('玻璃01');

    glass.material = new THREE.MeshPhysicalMaterial({
        metalness: 0, //金属度
        roughness: 0, //粗造度
        envMap:textCube, // 环境贴图
        envMapIntensity: 1.0, //影响度
        transmission:1.0, //透光率
        ior:1.5 //折射率
    })


    const metalnessName =  gui.addFolder('外壳')
    metalnessName.add(mesh.material,'metalness',0.1,1).name('金属度')
    metalnessName.add(mesh.material,'roughness',0.1,1).name('粗糙度')
    metalnessName.add(mesh.material,'clearcoat',0.1,1).name('清漆层')
    metalnessName.add(mesh.material,'clearcoatRoughness',0.1,1).name('清漆层粗糙度')
    metalnessName.add(mesh.material,'envMapIntensity',0.1,10).name('表面影响程度')

    const glassName =  gui.addFolder('前挡风玻璃')
    glassName.add(glass.material,'metalness',0,1).name('金属度')
    glassName.add(glass.material,'roughness',0,1).name('粗糙度')
    glassName.add(glass.material,'envMapIntensity',0,10).name('表面影响程度')
    glassName.add(glass.material,'transmission',0.1,10).name('透光率')
    glassName.add(glass.material,'ior',1,2.333).name('折射率')
})

export default model
