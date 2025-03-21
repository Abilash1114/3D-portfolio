gsap.registerPlugin(ScrollTrigger);

let condenser, camera, render, scene, model;

function init() {
    condenser = document.querySelector('.scene')

    scene = new THREE.Scene();

    // Camera Setup //

    const fav = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fav, aspect, near, far)
    camera.position.set(0, 1.5, 5);


    // lighting Setup //

    ambientLight = new THREE.AmbientLight(0x404040, 2, 10);
    scene.add(ambientLight);

            const pointLight = new THREE.PointLight(0x3980e9, 5, 20); // Color, Intensity, Distance
        pointLight.position.set(-4, 5, 10);
        scene.add(pointLight);

    // Render Setup //

    render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    render.setSize(window.innerWidth, window.innerHeight);
    render.setPixelRatio(window.devicePixelRatio);
    condenser.appendChild(render.domElement);


    // loading Manager //

    const loadingmanager = new THREE.LoadingManager(() => {
        const loadingscreen = document.getElementById('loadingscreen');
        if (loadingscreen) {
            loadingscreen.classList.add('finsed')
        }
        document.body.classList.add('ready')
    });

    // module Load //

    const loader = new THREE.GLTFLoader(loadingmanager);

    loader.load('assets/images/man.glb',(gltf)=>{
        model = gltf.scene;
        model.scale.set(1.3,1.3,1.3);
        scene.add(model);
        ScrollTrigger.refresh();
        animate();
    });

    function animate(){
     requestAnimationFrame(animate);
     render.render(scene,camera)
    }


}

init();