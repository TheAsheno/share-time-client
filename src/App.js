import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/style.css'
import './assets/css/animate.css'
import { Home, Navbar, Movie, Music, Game, Book, Board, AudioProvider } from './components'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <AudioProvider>
      <div >
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/music" element={<Music />} />
            <Route path="/game" element={<Game />} />
            <Route path="/book" element={<Book />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </main>
      </div>
    </AudioProvider>
  );
}

export default App;
