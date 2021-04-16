import mongoose from 'mongoose'

const personSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    party: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    researchPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Research',
      },
    ],
    numResearchPosts: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Person = mongoose.Model('Person', personSchema)

export default Person
