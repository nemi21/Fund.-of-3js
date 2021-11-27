import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';

function main() {
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 40;
    const aspect = 2 //the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const objects = [];
    const spread = 15;

    function addObject(x, y, obj){
        obj.position.x = x * spread;
        obj.position.y = y * spread;
    }

    function createMaterial(){
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });

        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }

    function addSolidGeometry(x, y, geometry){
        const mesh = new THREE.Mesh(geometry, createMaterial());
    }
    
    function addLineGeometry(x, y, geometry){
        const material = new THREE.LineBasicMaterial({color: 0000000});
        const mesh = new THREE.LineSegments(geometry, material);
        addObject(x, y, mesh);

    }

    {
        const width = 8;
        const height = 8;
        const depth = 8;
        addSolidGeometry(-2, 2, new THREE.BoxGeometry(width, height, depth));
    }

    {
        const radius = 7;
        const segments = 24;
        addSolidGeometry(-1, 2, new THREE.CircleGeometry(radius, segments));
    }

    {
        const radius = 6;
        const height = 8;
        const segments = 16;
        addSolidGeometry(0, 2, new THREE.ConeGeometry(radius, height, segments));
    }

    {
        const radiusTop = 4;
        const radiusBottom = 4;
        const height = 8;
        const radialSegments = 12;
        addSolidGeometry(1, 2, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments));
    }

    {
        const radius = 7;
        addSolidGeometry(2, 2, new THREE.DodecahedronGeometry(radius));
    }

    {
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

        const extrudeSettings = {
            steps: 2,
            depth: 2,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize : 1,
            bevelSegmentsL: 2,
        };

        addSolidGeometry(-2, 1, new THREE.ExtrudeGeometry(shape, extrudeSettings));
    }
    {
        const radius = 7;
        addSolidGeometry(-1, 1, new THREE.IcosahedronGeometry(radius));
    }
    {
        const points = [];
        for(let i = 0; i < 10; ++i){
            points.push(new THREE.Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }
        addSolidGeometry(0, 1, new THREE.LatheGeometry(points));
    }

   {
    function klein(v, u, target) {
        u *= Math.PI;
        v *= 2 * Math.PI;
        u = u * 2;

        let x, z;

        if(u < Math.PI){
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + ( 2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
            x = -8 *  Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
        } else{
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Mathcos(u) / 2)) * Math.cos(v + Math.PI);
            z = -8 * Math.sin(u);
        }  
        
        const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
        target.set(x, y, z).multiplyScalar(0.75);
    }
        const slices = 25;
        const stacks = 25;
        addSolidGeometry(2, 1, new THREE.ParamerticGeometry(klein, slices, stacks));

    }

    {
        const width = 9;
        const height = 9;
        const widthSegments = 2;
        const heightSegments = 2;
        addSolidGeometry(-2, 0 , new THREE.PlaneGeometry(width, height, widthSegments, heightSegments));
    }

    {
        const verticesofCube = [
            -1, -1, -1,  1, -1, -1,  1, 1, -1,  -1, 1, -1,
            -1, -1, 1,  1, -1, 1,  1, 1, 1,  -1, 1, 1, 
        ];

        const indicesOfFaces = [
            2, 1, 0,    0, 3, 2,
            0, 4, 7,    7, 3, 0,
            0, 1, 5,    5, 4, 0,
            1, 2, 6,    6, 5, 1,
            2, 3, 7,    7, 6, 2,
            4, 5, 6,    6, 7, 4,
        ];

        const radius = 7;
        const detail = 2;
        addSolidGeometry(-1, 0, new THREE.PolyhedronGeometry(verticesofCube, indicesOfFaces, radius, detail));
    }

    {
        const innerRadius = 2;
        const outerRadius = 7;
        const segments = 18;
        addSolidGeometry(0, 0, new THREE.RingGeometry(innerRadius, outerRadius, segments));
    }

    {
        const shape = new THREE.Shape();
        const x = -2.5;
        const y = -5;
        shape.moveTo(x + 2.5, y + 2.5);
        shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
        addSolidGeometry(1, 0, new THREE.ShapeGeometry(shape));
    }

    {
        const radius = 7;
        const widthSegments = 12;
        const heightSegments = 8;
        addSolidGeometry(2, 0, new THREE.ShapeGeometry(radius, widthSegments, heightSegments));
    }

    {
        const radius = 7;
        addSolidGeometry(-2, -1, new THREE.TetrahedronGeometry(radius));
    }

    {
        const loader = new THREE.FontLoader();
        //promisify font loading
        function loadFont(url){
            return new Promise((resolve, reject) => {
                loader.load(url, resolve, undefined, reject);
            });
        }

        async function doit() {
            const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');
            const geometry = new THREE.TextGeometry('three.js', {
                font: font,
                size: 3.0,
                height: .2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.15,
                bevelSize: .3,
                bevelSegments: 5,
            });

            const mesh = new THREE.Mesh(geometry, createMaterial());
            geometry.computeBoundingBox();
            geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);
        }
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x){
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        cube.position.x = x;
        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),  
    ];

    function resizeRendererToDisplaySize(renderer) {

        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height; 

        if(needResize){
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001; // convert time to seconds

        if(resizeRendererToDisplaySize(renderer)){
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
    }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();