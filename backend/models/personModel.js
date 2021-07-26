import mongoose from 'mongoose'

const personSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
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
    research: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Research',
      },
    ],
    numResearch: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

const Person = mongoose.model('Person', personSchema)

export default Person
