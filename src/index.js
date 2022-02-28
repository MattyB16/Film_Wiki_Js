import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import bootstrap from "bootstrap";

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;
    return (
      <div id="filmRow">
        <div>
          <h3 id="filmTitle">{filmData.title}</h3>
          <table id="filmData">
            <thead>
              <tr>
                <th>Release Year</th>
                <th>Length</th>
                <th>Rating</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{filmData.release_year}</td>
                <td>{filmData.length}</td>
                <td>{filmData.rating}</td>
                <td>{}</td>
              </tr>
            </tbody>
          </table>
          <p className="filmDataBottom">Description: {filmData.description}</p>
          <p className="filmDataBottom">
            Review:{" "}
            {filmData.reviews.map((filmReview) => (
              <div class="reviews">{filmReview.consumer_review}</div>
            ))}
          </p>
          <p className="filmDataBottom">
            Actors:{" "}
            {filmData.actors.map((filmActor) => (
              <div>
                <ul>
                  <li>{filmActor.firstName + " " + filmActor.lastName} </li>
                </ul>
              </div>
            ))}
          </p>
        </div>
        <div>
          <button className="reviewButtons">Add Review</button>
          <button className="reviewButtons">Delete Review</button>
          <br />
        </div>
      </div>
    );
  }
}

class FilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { films: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/Home/Film/All")
      .then((response) => this.setState({ films: response.data }));
  }

  render() {
    const film = this.state.films;
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.films.forEach((film) => {
      console.log(film.actors[0]);

      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <div>
        <div>{rows}</div>
        <div>
          <br />
          <button>Add Film</button>
        </div>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form className="SearchBar">
        <input
          type="text"
          placeholder="Search...."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

class Logo extends React.Component {
  render() {
    return null;
  }
}

class FilmWikiHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div className="FilmWikiHomePageCenter">
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

// const FILMS = [
//   {
//     film_id: 1,
//     title: "Rush Hour",
//     description: "Good",
//     release_year: 1999,
//     length: 134,
//     rating: "PG",
//     language_id: 1,
//   },
//   {
//     film_id: 2,
//     title: "Rush Hour 2",
//     description: "very Good",
//     release_year: 2000,
//     length: 140,
//     rating: "G",
//     language_id: 1,
//   },
//   {
//     film_id: 3,
//     title: "Adventures of Gym Lad",
//     description: "Good Stuff",
//     release_year: 2000,
//     length: 140,
//     rating: "OG",
//     language_id: 1,
//   },
// ];

// const ACTORS = [
//   {
//     actor_id: 1,
//     first_title: "Jackie",
//     last_title: "Chan",
//   },
//   {
//     actor_id: 2,
//     first_title: "Chris",
//     last_title: "Tucker",
//   },
//   {
//     actor_id: 3,
//     first_title: "Creatine",
//     last_title: "Callum",
//   },
// ];

// const CATEGORIES = [
//   {
//     category_id: 1,
//     title: "Action",
//   },
//   {
//     category_id: 2,
//     title: "Comedy",
//   },
//   {
//     category_id: 3,
//     title: "Gym Lads",
//   },
// ];

// const LANGUAGES = [
//   {
//     language_id: 1,
//     title: "English",
//   },
//   {
//     language_id: 2,
//     title: "Spanish",
//   },
//   {
//     language_id: 3,
//     title: "GymLadish",
//   },
// ];

// z

ReactDOM.render(<FilmWikiHomePage />, document.getElementById("root"));
