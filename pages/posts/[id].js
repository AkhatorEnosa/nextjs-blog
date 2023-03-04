import Head from 'next/head'
import Layout from '../../components/layouts'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date';

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-bold'>{postData.title}</h1>
        <p className='text-sm text-gray-600'><Date dateString={postData.date}/></p>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} className="text-md pt-2"/>
      </div>
    </Layout>
  )
}
