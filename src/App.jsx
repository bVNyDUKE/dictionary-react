import React, { useState } from 'react'

function ResultBox({ meanings }) {
  if (Object.entries(meanings).length === 0) {
    return null
  }
  return (
    <div className="space-y-3">
      {meanings.map((data) => (
        <div key={data.word}>
          <div>
            Word: {data.word}
          </div>
          <div>
            Phonetic: {data.phonetic}
            { (data.phonetics.legth !== 0 && data.phonetics[0].audio)
          && (
            <audio
              className="inline-block ml-5"
              controls
              label="audio"
              src={`https:${data.phonetics[0].audio}`}
            >
              <track kind="captions" />
            </audio>
          ) }
          </div>
          <div>
            Origin:
            {' '}
            {data.origin}
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [meanings, setMeaning] = useState([])
  const [loading, setLoading] = useState(false)

  const displayLoading = () => (
    <div className="flex justify-start items-center">
      <div className="spinner-border mr-2 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status" />
      <span>Searching...</span>
    </div>
  )

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const search = document.getElementById('search').value
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`, {
      method: 'GET',
    })

    setLoading(false)

    if (!res.ok) {
      setMeaning([])
      return false
    }

    const data = await res.json()
    console.log(data)
    setMeaning(data)
    return true
  }

  return (
    <>

      <section className="p-5 border bottom-1">
        <header className="text-3xl">
          Dictionary
        </header>
      </section>

      <main className="max-w-3xl m-auto mt-5">
        <form action="GET" onSubmit={submit}>

          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter a word"
            className="w-1/3 m-auto p-5 bg-gray-200 h-10 focus:outline-none focus:ring-gray-500 focus:ring-1"
          />

        </form>
        <div className="mt-5 p-2">
          {loading && displayLoading() }
          {meanings.length === 0
            ? <p>No Results</p>
            : <ResultBox meanings={meanings} /> }
        </div>
      </main>

    </>
  )
}

export default App
