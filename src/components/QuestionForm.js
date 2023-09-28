import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionItem from "./QuestionItem";

function QuestionForm(onAddQuestion, onDeleteQuestion) {
  const [questions, setQuestions] = useState([]);

  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });
 
  useEffect(() => {
    // Fetch questions from the server
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAnswerChange = (event, index) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = event.target.value;
    setFormData({
      ...formData,
      answers: updatedAnswers,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ensure prompt and answers are not empty
    if (formData.prompt.trim() === "" || formData.answers.some(answer => answer.trim() === "")) {
      alert("Please provide a prompt and all answers.");
      return;
    }
    // onAddQuestion(formData)
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(newQuestion => {
        // Update state to display the new question
        onAddQuestion(newQuestion);

        // Reset the form
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      })
  }



  
{/* <div>
<QuestionList questions={questions}/>
</div> */}
  // console.log(formData);
  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
   
      {/* <button onClick={handleDelete}> Delete Question</button> */}
    </section>
  );
}

export default QuestionForm;