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
    },
    party: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

const Person = mongoose.model('Person', personSchema)

export default Person
