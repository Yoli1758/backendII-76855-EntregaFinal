import mongoose from 'mongoose'
import { config } from '../../config/db/config.js'


const baseMongooseOptions = {
    serverSelectionTimeoutMS: 10000,
}


export async function connectionMongoDB(dbName = 'back2_final') {


    const tryConnect = async (uri, label) => {
        try {
            await mongoose.connect(uri, { dbName, ...baseMongooseOptions })
            console.log(`🎉 MongoDB connected succesfully to ${label}`)
            return true;
        } catch (error) {
            console.log(`❌ Failed to connection to ${label}:${error.message}`)
            return false;
        }
    }

    if (config.mongodb_atlas && await tryConnect(config.mongodb_atlas, "REMOTE MONGO URI")) {
        return true;
    }

    if (config.mongodb_local && await tryConnect(config.mongodb_atlas, "LOCAL MONGO URI")) {
        return true;
    }
    console.log("🚨 Falling to connection a BD");
    return false;
}
