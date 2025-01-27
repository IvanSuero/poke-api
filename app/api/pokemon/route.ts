import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const number = searchParams.get("number")

  if (!number) {
    return NextResponse.json({ error: "Pokemon number is required" }, { status: 400 })
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)

    if (!res.ok) {
      throw new Error("Failed to fetch pokemon data")
    }

    const data = await res.json()
    console.log(data.name)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Pokemon data:", error)
    return NextResponse.json({ error: "Failed to fetch Pokemon data" }, { status: 500 })
  }
}

