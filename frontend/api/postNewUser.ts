

export function getPost(options): Promise<PostInterface>{
  return fetch('http://localhost:3000/register')
  .then(res=>res.json())
  .then(data => {
    console.log(data)
    return data})
  
}