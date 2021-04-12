import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";
import axios from "axios";


export default class App extends React.Component {

  constructor() {
    super();
    this.state = { db: null, err: null, results: null, id: null, canonical_url: null }
  }

  componentDidMount() {
    initSqlJs()
      .then(SQL => this.setState({ db: new SQL.Database() }))
      .catch(err => this.setState({ err }));

    axios.post(`http://localhost:5000/article`, {
       "article":{
          "id":"b73b8b0e-0240-42a9-874c-00445d51dd8a",
          "canonical_url":"/culture/archive/2020/08/tracee-ellis-ross-on-hollywood-girlfriends-netflix/615754/",
      }}).then(res => {
        const data = JSON.parse(res.config.data);
        this.setState({id: data.article.id, canonical_url: data.article.canonical_url});
      }).catch((e) => console.log('error', e));
  }

  exec(sql) {
    let results = null, err = null;
    try {
      results = this.state.db.exec(sql);
    } catch (e) {
      err = e
    }
    this.setState({ results, err })
  }

  render() {
    let { db, err, results, canonical_url, id } = this.state;
    if (!db) return <pre>Loading...</pre>;

    return (
      <div className="App">
        id: <textarea>{id}</textarea>
        canonical_url: <textarea>{canonical_url}</textarea>
      </div>
    );
  }

}
