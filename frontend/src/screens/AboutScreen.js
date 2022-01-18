import React from 'react'

const AboutScreen = () => {
  return (
    <>
      <center>
        <h1>KNOW THE ROPES</h1>
        <h2>Records, Observations, and Positions on the Environment</h2>
        <hr WIDTH='50%' SIZE='3' NOSHADE />
      </center>
      <br></br>

      <h3>
        <a
          href='https://docs.google.com/presentation/d/1qgMqMMjtlKe2jGGTKvKx_-nsAhGuA3tECuDfwDHReJo/edit?usp=sharing'
          target='_blank'
          rel='noreferrer'
        >
          Click here to view a slideshow protoyping the app
        </a>
      </h3>
      <hr SIZE='3' NOSHADE />
      <br></br>
      <h3>Why did I decide to make this app?</h3>

      <p>
        I was looking for positions that politicians were taking on the
        environment, and I realized that it's quite difficult to find that info
        in one place. I wanted to know their official stances and what they said
        casually and publicly. I wanted to know how consistent they were when
        they spoke with their constituencies, and I wanted to compare their
        statements with their voting records.
      </p>

      <p>
        I found that ProPublica includes some of the best information relating
        to official candidate details--from voting records and government
        profiles to links to their homepages and social media accounts. Pro
        Publica is a comprehensive resource for official information about
        members of congress.{' '}
      </p>

      <p>Still, I was looking for more than official data. </p>

      <p>
        I want a specific resource covering how politicians vote on
        environmental issues, and I want to compare their votes with specific
        tweets they make about the subject. I want to know how and when they
        respond to news anchors about California wildfires and NYC flooding, and
        I want to find all that data easily, in one place--a complete resource
        about congress persons and their positions on the environment.
      </p>

      <p>
        I realized that I could create a site just for that, a site that
        references the robust information that ProPublica provides and a site
        that links to specific tweets, a site where one can post images and
        screenshots to ensure their statements can be found in case a link
        changes or an account is deactivated. So that's what I'm creating
      </p>

      <p>Stay tuned for more updates.</p>

      <p>
        <em>
          *Current bug: Heroku's ephemeral file system doesn't keep all those
          images and screenshots that I mentioned, so it really takes a lot away
          from the whole purpose of my app! I'm working on that :)
        </em>
      </p>
    </>
  )
}

export default AboutScreen
