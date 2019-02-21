
import SEO from '../components/Seo'
import React from "react"
import { graphql } from "gatsby"
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import Img from "gatsby-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Helmet
        title={frontmatter.title}
        meta={[
            { name: 'description', content: frontmatter.description },
            { name: 'keywords', content: frontmatter.keywords },
        ]}
      />

      <div id="blog-post">
        <header className="blog-banner">
          <nav className="top-bar">
            <Link className="home-link icon fa-home" to="/"/>
          </nav>
          <Img
              className="post-banner"
              fluid={frontmatter.cover.childImageSharp.fluid}/>
          <div className="inner">
            <header className="major">
              <h1 className="light">{frontmatter.title}</h1>
            </header>
            <div className="content">
              <p className="display"><h3 className="light signature">Jen Lipton,</h3> on {frontmatter.date}</p>
              {/* Tags here */}
              <p className="display">{frontmatter.description}</p>
            </div>
          </div>
        </header>

        <article className="dark">
          <div 
            className="inner"
            dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        description
        title
        tags
        keywords
        cover {
          childImageSharp{
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`


// import SEO from '../components/Seo'
// import React from "react"
// import { graphql } from "gatsby"
// import Helmet from 'react-helmet'


// export default function Template({
//   data, // this prop will be injected by the GraphQL query below.
// }) {
//   const { markdownRemark } = data // data.markdownRemark holds our post data
//   const { frontmatter, html } = markdownRemark
//   return (
//     <Layout>
//         <Helmet>
//           <title>{frontmatter.title}</title>
//           <meta name="description" content={frontmatter.description}/>
//         </Helmet>

//         <header>
//           {frontmatter.title}
//         </header>
//     </Layout>
//   )
// }

// export const pageQuery = graphql`
//   query($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         path
//         title
//         date(formatString: "MMMM DD, YYYY")
//         tags
//         description
//         keywords
//       }
//     }
//   }
// `