import Layout from '../../components/layouts';
import { getPostTitle, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = getPostData(params.title);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getPostTitle();
  return {
    paths,
    fallback: false,
  };
}

export default function Post(){
  return <Layout></Layout>
}
