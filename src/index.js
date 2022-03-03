import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import bootstrap, { Dropdown } from "bootstrap";

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
                <td>
                  {filmData.category.map((filmCategory) => (
                    <div>{filmCategory.name}</div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="filmDataBottom">Description: {filmData.description}</p>
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
          <p className="filmDataBottom" id="reviewData">
            Review:{" "}
            {filmData.reviews.map((filmReview) => (
              <div class="reviews">
                <ul>
                  <li>
                    Review ID: {filmReview.review_id} -{" "}
                    {filmReview.consumer_review}
                  </li>
                </ul>
              </div>
            ))}
          </p>
        </div>
        <div id="bottomMap">
          <p id="Map">
            Film ID: {filmData.film_id}
            <br />
          </p>
          <p id="reviewMap">
            <Post />
            <Put />
            <Delete />
          </p>
        </div>
      </div>
    );
  }
}

class Post extends React.Component {
  state = {
    film_id: "",
    consumer_review: "",
  };

  onFilmIDChange = (e) => {
    this.setState({
      film_id: e.target.value,
    });
  };

  onConsumerReviewChange = (e) => {
    this.setState({
      consumer_review: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      film_id: this.state.film_id,
      consumer_review: this.state.consumer_review,
    };
    console.log(data);
    axios
      .post(
        `http://54.89.161.241:8080/Home/Review/Add?film_id=${this.state.film_id}&consumer_review=${this.state.consumer_review}`
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    window.location.reload(false);
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
          <input
            placeholder="Film ID"
            value={this.state.film_id}
            onChange={this.onFilmIDChange}
            required
          />
          <input
            placeholder="Review"
            value={this.state.consumer_review}
            onChange={this.onConsumerReviewChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

class Put extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      review_id: "",
      consumer_review: "",
    };
  }

  onReviewIDChange = (e) => {
    this.setState({
      review_id: e.target.value,
    });
  };

  onConsumerReviewChange = (e) => {
    this.setState({
      consumer_review: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://54.89.161.241:8080/Home/Review/Update/${this.state.review_id}?consumer_review=${this.state.consumer_review}`
      )

      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    function delay(delayInms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }

    async function sample() {
      console.log("waiting...");
      let delayres = await delay(100);
      window.location.reload(false);
    }
    sample();
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="put">
        <form className="put" onSubmit={this.handleSubmit}>
          <input
            placeholder="Review ID"
            value={this.state.review_id}
            onChange={this.onReviewIDChange}
            required
          />
          <input
            placeholder="Review"
            value={this.state.consumer_review}
            onChange={this.onConsumerReviewChange}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

class Delete extends React.Component {
  state = {
    review_id: "",
  };

  handleChange = (event) => {
    this.setState({ review_id: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(
        `http://54.89.161.241:8080/Home/Review/Delete/${this.state.review_id}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });

    function delay(delayInms) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    }

    async function sample() {
      console.log("waiting...");
      let delayres = await delay(100);
      window.location.reload(false);
    }
    sample();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="Review ID" onChange={this.handleChange} />
          <button type="submit">Delete</button>
        </form>
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
      .get("http://54.89.161.241:8080/Home/Film/All")
      .then((response) => this.setState({ films: response.data }));
  }

  render() {
    const film = this.state.films;
    const filterText = this.props.filterText.toLowerCase();

    const rows = [];

    this.state.films.forEach((film) => {
      if (film.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }
      rows.push(<FilmRow filmInfo={film} key={film.title} />);
    });

    return (
      <div>
        <div>{rows}</div>
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
          placeholder="Search Film...."
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
      <div>
        <div></div>
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
      </div>
    );
  }
}

ReactDOM.render(<FilmWikiHomePage />, document.getElementById("root"));
