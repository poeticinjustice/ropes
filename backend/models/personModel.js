import mongoose from 'mongoose'

const personSchema = mongoose.Schema(
  {
    propub_id: { type: String },
    description: {
      type: String,
    },
    title: { type: String },
    short_title: { type: String },
    api_uri: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    date_of_birth: { type: String },
    gender: { type: String },
    party: { type: String },
    leadership_role: { type: String },
    twitter_account: { type: String },
    facebook_account: { type: String },
    youtube_account: { type: String },
    govtrack_id: { type: String },
    cspan_id: { type: String },
    votesmart_id: { type: String },
    icpsr_id: { type: String },
    crp_id: { type: String },
    google_entity_id: { type: String },
    fec_candidate_id: { type: String },
    url: { type: String },
    rss_url: { type: String },
    contact_form: { type: String },
    in_office: { type: Boolean },
    dw_nominate: { type: Number },
    seniority: { type: String },
    next_election: { type: String },
    total_votes: { type: Number },
    missed_votes: { type: Number },
    total_present: { type: Number },
    last_updated: { type: String },
    ocd_id: { type: String },
    office: { type: String },
    phone: { type: String },
    state: { type: String },
    senate_class: { type: String },
    state_rank: { type: String },
    lis_id: { type: String },
    missed_votes_pct: { type: Number },
    votes_with_party_pct: { type: Number },
    votes_against_party_pct: { type: Number },

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
