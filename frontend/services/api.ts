const API_URL = process.env.NEXT_PUBLIC_API_URL!

export async function getProdutos() {
  const res = await fetch(`${API_URL}/produtos`)
  return res.json()
}

export async function createProduto(data: any) {
  await fetch(`${API_URL}/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}