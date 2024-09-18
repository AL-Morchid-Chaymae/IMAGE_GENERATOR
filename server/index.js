import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { MongoClient } from 'mongodb'; // Utiliser import pour mongodb

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Fonction pour se connecter à MongoDB avec mongoose
const connectDB = () => {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
        console.error('MONGODB_URL is not defined in environment variables');
        return;
    }

    mongoose.set('strictQuery', true);
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected'))
        .catch((err) => {
            console.error('Failed to connect to DB');
            console.error(err);
        });
};

// Fonction pour tester la connexion à MongoDB avec le package mongodb
const testMongoConnection = async () => {
    const uri = process.env.MONGODB_URL;

    if (!uri) {
        console.error('MONGODB_URL is not defined in environment variables');
        return;
    }

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB');
        console.error(err);
    } finally {
        await client.close();
    }
};

// Route par défaut
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello GFG Developers!',
    });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

// Démarrer le serveur et tester la connexion
const startServer = async () => {
    try {
        // Tester la connexion MongoDB avec le package mongodb
        await testMongoConnection();
        
        // Connexion à MongoDB avec mongoose
        connectDB();

        // Démarrer le serveur Express
        app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();
