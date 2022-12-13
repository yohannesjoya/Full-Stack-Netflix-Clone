import "./Home.css";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../requests";
import Nav from "../NabBar/Nav";
import { useGlobalState } from "../../GlobalStateProvider";

function Home() {
  // const [{ user }] = useGlobalState();
  return ( 
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />

      <Row title="Top Rated" fetchURL={requests.fetTopRatedMovies} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />

      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default Home;
