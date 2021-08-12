import mongoose from 'mongoose'

const researchSchema = mongoose.Schema(
  {
    person: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Person',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    link: { type: String },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Comment',
      },
    ],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Research = mongoose.model('Research', researchSchema, 'allResearch')

export default Research
