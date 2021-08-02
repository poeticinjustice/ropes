import asyncHandler from 'express-async-handler'
import axios from 'axios'

// @desc    Fetch member data from ProPublica API
// @route   GET /api/propub/:id
// @access  Public

const getpropubMemberById = asyncHandler(async (req, res) => {
  const propubMemberLink = `https://api.propublica.org/congress/v1/members/${req.params.id}`

  const uri = encodeURI(propubMemberLink)
  const headers = {
    'user-agent': 'node.js',
    'X-API-Key': process.env.PRO_PUB_API_KEY,
  }

  const proPubResponse = await axios.get(uri, { headers })
  res.json(proPubResponse.data)
})

export { getpropubMemberById }
