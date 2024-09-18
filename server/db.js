const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Afficher l'URL pour vérifier
console.log('MONGODB_URL:', process.env.MONGODB_URL);

// Connexion à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Failed to connect to DB');
        console.error(err);
    }
};

connectDB();
