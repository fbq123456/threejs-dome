import * as THREE from 'three';

import { GLTFLoader  } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();
const model = new THREE.Group()

loader.load('../public/img/建筑模型.gltf',(glt) => {{
    glt.scene.traverse((obj) => {
        console.log(obj)
        if(obj.isMesh) {
            // 画边线
            const edges = new THREE.EdgesGeometry(obj.geometry)
            const edgesMaterial = new THREE.LineBasicMaterial({
                color:0x00ffff
            })
            const line = new THREE.LineSegments(edges,edgesMaterial)
            obj.add(line)

            //修改材质
            obj.material = new THREE.MeshLambertMaterial({
                color:0x004444,
                transparent:true,
                opacity:0.5,
            })
        }
    })
    model.add(glt.scene)
}})


export default model