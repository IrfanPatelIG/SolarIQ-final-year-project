// Simulated Backend using localStorage

const DB_KEY = 'solariq_db';

function getDB() {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
        return {
            users: [],
            currentUser: null,
            systemConfig: null,
            alerts: [
                { id: 1, type: 'critical', title: 'Inverter #04 Overheating', timestamp: new Date(Date.now() - 12*60000).toISOString(), desc: 'Temperature exceeding safety threshold (85°C).' },
                { id: 2, type: 'warning', title: 'Communication Lag', timestamp: new Date(Date.now() - 3600000).toISOString(), desc: 'Latency detected in sensor array B.' }
            ]
        };
    }
    return JSON.parse(raw);
}

function saveDB(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

const api = {
    login: (email, password) => {
        const db = getDB();
        const user = db.users.find(u => u.email === email && u.password === password);
        if (user) {
            db.currentUser = user;
            saveDB(db);
            return { success: true, user };
        }
        return { success: false, error: "Invalid credentials" };
    },
    
    register: (name, email, password) => {
        const db = getDB();
        if (db.users.some(u => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }
        const newUser = { id: Date.now(), name, email, password };
        db.users.push(newUser);
        db.currentUser = newUser;
        saveDB(db);
        return { success: true, user: newUser };
    },
    
    logout: () => {
        const db = getDB();
        db.currentUser = null;
        saveDB(db);
    },
    
    getCurrentUser: () => {
        return getDB().currentUser;
    },
    
    saveConfig: (config) => {
        const db = getDB();
        db.systemConfig = config;
        saveDB(db);
    },
    
    getConfig: () => {
        return getDB().systemConfig;
    },
    
    getMockDashboardData: () => {
        const db = getDB();
        const baseCapacity = db.systemConfig ? parseFloat(db.systemConfig.capacity || 10) : 10;
        
        return {
            currentGeneration: (baseCapacity * 0.85).toFixed(1),
            predictedYield: (baseCapacity * 8.2).toFixed(0),
            efficiency: db.systemConfig ? db.systemConfig.efficiency : "94.2",
            hourlyLabels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
            hourlyData: [
                baseCapacity * 2, 
                baseCapacity * 5, 
                baseCapacity * 8.4, 
                baseCapacity * 7, 
                baseCapacity * 3, 
                0
            ]
        }
    }
};

window.SolarAPI = api;
