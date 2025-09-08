// Schema.org core types for visualization
const SCHEMA_CORE_TYPES = [
    // Top-level Thing hierarchy
    { id: "Thing", parent: null, x: 0, y: 0, z: 0, color: 0xff6b35, size: 0.8 },
    
    // Major categories
    { id: "Action", parent: "Thing", x: 5, y: 0, z: 0, color: 0xe74c3c, size: 0.6 },
    { id: "CreativeWork", parent: "Thing", x: -5, y: 0, z: 0, color: 0x3498db, size: 0.6 },
    { id: "Event", parent: "Thing", x: 0, y: 5, z: 0, color: 0x2ecc71, size: 0.6 },
    { id: "Intangible", parent: "Thing", x: 0, y: -5, z: 0, color: 0x9b59b6, size: 0.6 },
    { id: "Organization", parent: "Thing", x: 0, y: 0, z: 5, color: 0xf39c12, size: 0.6 },
    { id: "Person", parent: "Thing", x: 0, y: 0, z: -5, color: 0x1abc9c, size: 0.6 },
    { id: "Place", parent: "Thing", x: 3, y: 3, z: 0, color: 0x34495e, size: 0.6 },
    { id: "Product", parent: "Thing", x: -3, y: -3, z: 0, color: 0xe67e22, size: 0.6 },
    
    // CreativeWork subtypes
    { id: "Article", parent: "CreativeWork", x: -8, y: 2, z: 0, color: 0x3498db, size: 0.4 },
    { id: "Book", parent: "CreativeWork", x: -8, y: -2, z: 0, color: 0x3498db, size: 0.4 },
    { id: "Movie", parent: "CreativeWork", x: -5, y: 3, z: 2, color: 0x3498db, size: 0.4 },
    { id: "Dataset", parent: "CreativeWork", x: -5, y: -3, z: -2, color: 0x3498db, size: 0.4 },
    
    // Organization subtypes
    { id: "Corporation", parent: "Organization", x: 2, y: 0, z: 8, color: 0xf39c12, size: 0.4 },
    { id: "EducationalOrganization", parent: "Organization", x: -2, y: 0, z: 8, color: 0xf39c12, size: 0.4 },
    { id: "GovernmentOrganization", parent: "Organization", x: 0, y: 2, z: 8, color: 0xf39c12, size: 0.4 },
    
    // Place subtypes
    { id: "AdministrativeArea", parent: "Place", x: 6, y: 6, z: 0, color: 0x34495e, size: 0.4 },
    { id: "LocalBusiness", parent: "Place", x: 3, y: 6, z: 3, color: 0x34495e, size: 0.4 },
    
    // Product subtypes
    { id: "Vehicle", parent: "Product", x: -6, y: -6, z: 0, color: 0xe67e22, size: 0.4 },
    { id: "SoftwareApplication", parent: "Product", x: -3, y: -6, z: -3, color: 0xe67e22, size: 0.4 },
    
    // Event subtypes
    { id: "BusinessEvent", parent: "Event", x: 3, y: 8, z: 0, color: 0x2ecc71, size: 0.4 },
    { id: "SocialEvent", parent: "Event", x: -3, y: 8, z: 0, color: 0x2ecc71, size: 0.4 },
    
    // Action subtypes
    { id: "ConsumeAction", parent: "Action", x: 8, y: 2, z: 0, color: 0xe74c3c, size: 0.4 },
    { id: "CreateAction", parent: "Action", x: 8, y: -2, z: 0, color: 0xe74c3c, size: 0.4 }
];

// Relationships between schema types
const SCHEMA_RELATIONSHIPS = [
    { from: "Person", to: "Organization", type: "memberOf" },
    { from: "Person", to: "CreativeWork", type: "creator" },
    { from: "Event", to: "Place", type: "location" },
    { from: "Event", to: "Person", type: "attendee" },
    { from: "Organization", to: "Place", type: "location" },
    { from: "Product", to: "Organization", type: "manufacturer" },
    { from: "Article", to: "Person", type: "author" },
    { from: "Movie", to: "Person", type: "director" },
    { from: "LocalBusiness", to: "Organization", type: "parentOrganization" }
];
