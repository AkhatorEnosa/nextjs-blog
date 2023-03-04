import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layouts';
import utilStyles from '../styles/utils.module.css';
// import { getData } from '../lib/posts';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {

  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
  // const data = getData();
  // return {
  //   props: {
  //     posts: (await data).allData
  //   }
  // };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, I am Akhator Osakhogba and i am using this project to learn the basics of javascript.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`} className="text-blue-600 hover:text-red-500 duration-300">{title}</Link>
              <br />
              <Date dateString={date} className="text-sm text-gray-600"/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
