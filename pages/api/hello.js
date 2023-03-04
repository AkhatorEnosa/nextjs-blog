export default function handler(req, res) {
  res.status(200).json([
    {
      name: 'Akhator Osakhogba',
      age: '26',
      ambition: 'Rich',
    },
    {
      name: 'Peter Drury',
      age: '26',
      ambition: 'Rich',
    },
    {
      name: 'Mason John',
      age: '35',
      ambition: 'Rich',
    },
    {
      name: 'Akhator Osakhogba',
      age: '26',
      ambition: 'Rich',
    },
  ])
}
