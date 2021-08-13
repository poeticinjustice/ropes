import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
// import persons from './data/persons.js'
import members from './data/senate117.js'
import User from './models/userModel.js'
import Person from './models/personModel.js'
import Research from './models/researchModel.js'
import Comment from './models/commentModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Person.deleteMany()
    // await Research.deleteMany()
    // await Comment.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const senateMembers = members.map((member) => {
      return { ...member, user: adminUser }
    })

    await Person.insertMany(senateMembers)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Person.deleteMany()
    await Research.deleteMany()
    await Comment.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
