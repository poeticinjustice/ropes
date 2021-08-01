import express from 'express'
const router = express.Router({ mergeParams: true })
import axios from 'axios'

// @desc    Fetch data from ProPublica API
// @route   GET /api/propub/:id
// @access  Public

const getProPubMember = router.get('/:id', async (req, res) => {
  const link = `https://api.propublica.org/congress/v1/members/${req.params.id}`
  try {
    const uri = encodeURI(link)
    const headers = {
      'user-agent': 'node.js',
      'X-API-Key': process.env.PRO_PUB_API_KEY,
    }

    const proPubResponse = await axios.get(uri, { headers })
    return res.json(proPubResponse.data)
  } catch (err) {
    console.error(err.message)
    return res.status(404).json({ msg: 'No ProPublica data found' })
  }
})

router.route('/').get(getProPubMember)

export default router
