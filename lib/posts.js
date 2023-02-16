import fs from 'fs';
import path from 'path';

const currPath = process.cwd();
const postsDirectory = path.join(currPath, 'posts');

export async function getData() {
 const res = await fetch('https://jsonplaceholder.typicode.com/posts');
 const data = await res.json();

  data.slice(1, 10).map((x) => { 
    
      fs.open(`${postsDirectory}/${x.title}.js`, 'w', function (err) {
              if (err) throw err;
              console.log('Saved!');
            })
    
  })

    return {
      allData: data
    };
}

export function getPostTitle() {
  const data = getData();
   
  return data.slice(1, 10).map((x) => {

    return {
      params: {
        title: x.title
      }
    }
  });
}

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
