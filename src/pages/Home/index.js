import { useState } from 'react'
import { Header } from '../../components/Header'
import { ItemList } from '../../components/ItemList'
import background from '../../assets/background.png'
import './styles.css'

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name) {
      const { avatar_url, name, html_url, bio, login } = newUser
      setCurrentUser({ avatar_url, name, html_url, bio, login })

      const reposData = await fetch(
        `https://api.github.com/users/${user}/repos`
      )
      const newRepos = await reposData.json()

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="Logo do GitHub" className="background" />
        <div className="info">
          <div>
            <input
              name="usuario"
              placeholder="@username"
              value={user}
              onChange={event => setUser(event.target.value)}
            />
            <button onClick={handleGetData}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="#999999"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img
                  src={currentUser.avatar_url}
                  className="profile-img"
                  alt="Imagem de perfil"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>
                    @
                    <a href={currentUser.html_url} target="_blank">
                      {currentUser.login}
                    </a>
                  </span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositórios ({repos.length})</h4>
              {repos.map(repo => (
                <ItemList
                  title={repo.name}
                  description={repo.description}
                  url={repo.html_url}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default App
