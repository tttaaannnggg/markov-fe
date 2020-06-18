import React, { useState, useEffect } from "react";
import "./App.css";
import Markov from "ez-markov";

function App() {
  return (
    <div className="App-header">
      <CorpusContainer postId={Math.floor(Math.random() * 9)} />
    </div>
  );
}

function CorpusContainer(props) {
  const [blogPost, setBlogPost] = useState({});
  const [markov, setMarkov] = useState(new Markov());
  useEffect(() => {
    console.log("fetching");
    fetch("https://ttaanngg.com/api/posts/" + props.postId)
      .then(data => data.json())
      .then(post => {
        setBlogPost(post[0] || {});
        const mk = new Markov();
        mk.addCorpus(post[0].body);
        setMarkov(mk);
      });
  }, []);
  return (
    <div>
      <CorpusDisplay blogPost={blogPost} markov={markov} />
    </div>
  );
}

function CorpusDisplay(props) {
  const { markov, blogPost } = props;
  const [sentence, setSentence] = useState("");
  useEffect(() => {
    const newSen = markov.getSentence() || "";
    const timeout = setTimeout(() => {
      console.log({ sentence, timeout: sentence.length * 75 });
      setSentence(newSen);
    }, Math.floor(sentence.length * 75));
    return () => {
      clearTimeout(timeout);
    };
  }, [markov, sentence]);
  return <div>{sentence}</div>;
}

export default App;
