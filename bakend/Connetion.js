import mongoose from 'mongoose';


const ConnectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/amazon-2',
        console.log("Db Conneted"))
    } catch (error) {
        console.log("Db Connetion lose")
    }
}

export default ConnectDb