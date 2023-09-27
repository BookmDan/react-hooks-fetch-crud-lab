// import React, { useState, useEffect } from "react";
// import QuestionItem from "./QuestionItem";

// function QuestionList() {
//   const [questions, setQuestions] = useState([])

//   useEffect(() => {
//     // Fetch questions from the server
//     fetch("http://localhost:4000/questions")
//       .then((response) => response.json())
//       .then((data) => setQuestions(data));
//   }, []);
  
//   return (
//     <section>
//       <h1>Quiz Questions</h1>
      // <ul>{questions.map((question) => (
      //     <QuestionItem key={question.id} question={question} />
      //   ))}</ul>
//     </section>
//   );
// }

// export default QuestionList;

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    // Fetch questions from the server
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions));
  }, []);
  // questions.map((question) => (
  //   <QuestionItem key={question.id} question={question} />
  //   ))
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{}</ul>
    </section>
  );
}

export default QuestionList;