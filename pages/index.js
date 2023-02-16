import Head from 'next/head';
import Layout, { siteTitle } from '../components/layouts';
import utilStyles from '../styles/utils.module.css';
import { getData } from '../lib/posts';

export async function getStaticProps() {
  const data = getData();
  return {
    props: {
      posts: (await data).allData
    }
  };
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, debitis aperiam. Corrupti eligendi aut cum? Fugiat!</p>
        <p className='mt-10'>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn" className='text-blue-700'>our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog Posts</h2>
        <ul className={utilStyles.list}>
          {posts.slice(1, 10).map(({ id, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {id}
              <br />
              {title}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
