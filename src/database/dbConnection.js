const mongoose =  require('mongoose')

if(!process.env.MONGODB_URI){
    throw new Error("Invalid MONGODB_URI")
}

const dbConnect = async()=> {
    try {
      const {connection} = await mongoose.connect(process.env.MONGODB_URI)  
      if(connection.readyState === 1){
        return Promise.resolve(true)
      }
    } catch (err) {
        return Promise.reject(err)
    }
}

module.exports = dbConnect;