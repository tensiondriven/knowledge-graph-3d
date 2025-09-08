// 3D Knowledge Graph Visualizer with Schema.org
class NestedSphereVisualizer {
    constructor() {
        // Check if Three.js is available
        if (typeof THREE === "undefined") {
            console.error("THREE.js is not loaded");
            document.getElementById("loading").innerHTML = "❌ THREE.js not loaded";
            return;
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.spheres = [];
        this.schemaNodes = [];
        this.connections = [];
        
        // Make available globally for testing
        window.visualizer = this;
        
        this.init();
    }

    init() {
        try {
            // Setup renderer
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000011);
            document.body.appendChild(this.renderer.domElement);

            // Setup camera
            this.camera.position.set(0, 0, 50);

            // Create nested spheres (skybox shells)
            this.createNestedSpheres();

            // Add Schema.org data layer
            this.createSchemaNodes();
            this.createSchemaConnections();

            // Add lighting
            const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
            this.scene.add(ambientLight);
            
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(10, 10, 5);
            this.scene.add(directionalLight);

            // Start animation loop
            this.animate();

            // Update info
            this.updateStats();

            // Handle window resize
            window.addEventListener("resize", () => this.onWindowResize());

        } catch (error) {
            console.error("Initialization error:", error);
            document.getElementById("stats").innerHTML = `❌ Error: ${error.message}`;
        }
    }

    createNestedSpheres() {
        const sphereConfigs = [
            { radius: 45, segments: 32, color: 0x1a1a2e, opacity: 0.08, speed: 0.001 },
            { radius: 35, segments: 24, color: 0x16213e, opacity: 0.12, speed: 0.002 },
            { radius: 25, segments: 20, color: 0x0f3460, opacity: 0.15, speed: 0.004 },
            { radius: 18, segments: 16, color: 0x0e4b99, opacity: 0.18, speed: 0.008 },
            { radius: 12, segments: 12, color: 0x2e86ab, opacity: 0.22, speed: 0.015 },
        ];

        sphereConfigs.forEach((config, index) => {
            const geometry = new THREE.SphereGeometry(config.radius, config.segments, config.segments);
            const material = new THREE.MeshLambertMaterial({ 
                color: config.color,
                transparent: true,
                opacity: config.opacity,
                wireframe: true
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            sphere.userData = { 
                speed: config.speed, 
                axis: new THREE.Vector3(
                    Math.random() - 0.5, 
                    Math.random() - 0.5, 
                    Math.random() - 0.5
                ).normalize()
            };
            
            this.spheres.push(sphere);
            this.scene.add(sphere);
        });
    }

    createSchemaNodes() {
        if (!window.SCHEMA_CORE_TYPES) {
            console.warn("Schema data not loaded yet, using fallback");
            return;
        }

        SCHEMA_CORE_TYPES.forEach(nodeData => {
            const geometry = new THREE.PlaneGeometry(nodeData.size * 2, nodeData.size * 2);
            const material = new THREE.MeshBasicMaterial({ 
                color: nodeData.color,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(nodeData.x, nodeData.y, nodeData.z);
            mesh.userData = { 
                id: nodeData.id,
                parent: nodeData.parent,
                type: "schema-node" 
            };
            
            this.schemaNodes.push(mesh);
            this.scene.add(mesh);
        });
    }

    createSchemaConnections() {
        if (!window.SCHEMA_RELATIONSHIPS) {
            console.warn("Schema relationships not loaded yet");
            return;
        }

        SCHEMA_RELATIONSHIPS.forEach(rel => {
            const fromNode = this.schemaNodes.find(n => n.userData.id === rel.from);
            const toNode = this.schemaNodes.find(n => n.userData.id === rel.to);
            
            if (fromNode && toNode) {
                const points = [fromNode.position, toNode.position];
                const geometry = new THREE.BufferGeometry().setFromPoints(points);
                const material = new THREE.LineBasicMaterial({ 
                    color: 0x444444, 
                    transparent: true, 
                    opacity: 0.3 
                });
                
                const line = new THREE.Line(geometry, material);
                line.userData = { type: "connection", relationship: rel.type };
                
                this.connections.push(line);
                this.scene.add(line);
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate nested spheres at different rates
        this.spheres.forEach(sphere => {
            sphere.rotateOnAxis(sphere.userData.axis, sphere.userData.speed);
        });

        // Make schema nodes face camera (billboard effect)
        this.schemaNodes.forEach(node => {
            node.lookAt(this.camera.position);
        });

        // Slowly orbit camera
        const time = Date.now() * 0.0001;
        this.camera.position.x = Math.cos(time) * 60;
        this.camera.position.z = Math.sin(time) * 60;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }

    updateStats() {
        const stats = document.getElementById("stats");
        if (stats) {
            stats.innerHTML = `
                <div class="status">✓ Visualization Active</div>
                Spheres: ${this.spheres.length}<br>
                Schema Nodes: ${this.schemaNodes.length}<br>
                Connections: ${this.connections.length}<br>
                Status: Schema.org layer loaded<br>
                Next: CUDA physics backend
            `;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize when DOM and scripts are ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => new NestedSphereVisualizer(), 100);
    });
} else {
    setTimeout(() => new NestedSphereVisualizer(), 100);
}
