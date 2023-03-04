import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  //Using remark to convert markdown to HTML strings
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  // Convert processed markdown to string
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

// const currPath = process.cwd();
// const postsDirectory = path.join(currPath, 'posts');

// export async function getData() {
//  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//  const data = await res.json();

//   data.slice(1, 10).map((x) => { 
    
//       fs.open(`${postsDirectory}/${x.title}.js`, 'w', function (err) {
//               if (err) {
//                 throw err;
//               }

//               fs.writeFile(`${postsDirectory}/${x.title}.js`, {
//                   "title": `${x.title}`,
//                   "body": `${x.body}`
//               }, (err) => { 
//                 if(err) { 
//                   throw err
//                 }
//                 console.log("Data has been written to file successfully."); 
//                 }); 

//               console.log('Saved!');
//             })
    
//   })

//     return {
//       allData: data
//     };
// }

// export function getPostTitle() {
//   const data = getData();
   
//   return data.slice(1, 10).map((x) => {

//     return {
//       params: {
//         title: x.title
//       }
//     }
//   });
// }

// export  function createFiles() {
//   const data = getData();
   
//   return data.slice(1, 10).map((x) => {

//     return (
//       fs.open(`${x.title}.js`, 'w', function (err) {
//               if (err) throw err;
//               console.log('Saved!');
//             })
//     )
//   });

  
// }
