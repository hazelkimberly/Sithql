import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';
import Modal from './Modal.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';

const QuestionEntry = ({ question }) => {
  const { question_id, question_body, question_helpfulness, answers } = question;
  const [updateQuestionHelpfulness, setUpdateQuestionHelpfulness] = useState(question_helpfulness);
  const [isQuestionHelpful, setIsQuestionHelpful] = useState(false);
  const [currAnswerList, setCurrAnswerList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHelpfulQuestionClick = (id) => {
    if (!isQuestionHelpful) {
      axios.put(`/qa/questions/${id}/helpful`, null)
        .then(() => {
          setUpdateQuestionHelpfulness(updateQuestionHelpfulness + 1);
          setIsQuestionHelpful(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const totalAnswers = Object.keys(answers).length;

  const handleLoadMoreAnswers = () => {
    setCurrAnswerList(answerList);
    setIsAnswerExpanded(true);
  };

  const handleCollapseAnswers = () => {
    setCurrAnswerList(answerList.slice(0, 2));
    setIsAnswerExpanded(false);
  };

  useEffect(() => {
    axios.get(`/qa/questions/${question_id}/answers/?count=${totalAnswers}`)
      .then((response) => {
        const sortedAnswerList = response.data.results.sort((a, b) => {
          const isSellerA = a.answerer_name === 'Seller';
          const isSellerB = b.answerer_name === 'Seller';

          if (isSellerA && !isSellerB) {
            return -1;
          } if (!isSellerA && isSellerB) {
            return 1;
          }
          return b.helpfulness - a.helpfulness;
        });
        setAnswerList(sortedAnswerList);
        setCurrAnswerList(sortedAnswerList.slice(0, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='question-container'>
      <div className='question-header'>
        <div className='question-indicator' style={{ fontWeight: 'bold' }}>
          <div>Q:</div>
          <div>{question_body}</div>
        </div>
        <div className='question-details-container'>
          <div className='qa-helpful-container'>
            Helpful?
            <button
              type='button'
              className='yes'
              style={{ textDecoration: isQuestionHelpful ? 'none' : 'underline', cursor: isQuestionHelpful && 'default' }}
              onClick={() => { handleHelpfulQuestionClick(question_id); }}
            >
              Yes
            </button>
            (
            {updateQuestionHelpfulness}
            )
            |
            <button
              type='button'
              className='add-answer'
              style={{ textDecoration: 'underline' }}
              onClick={() => { setIsModalOpen(true); }}
            >
              Add Answer
            </button>
          </div>
        </div>
      </div>
      <div className='answer-indicator'>
        {totalAnswers > 0 && <div style={{ fontWeight: 'bold' }}>A:</div>}
        <AnswerList
          currAnswerList={currAnswerList}
          totalAnswers={totalAnswers}
          handleLoadMoreAnswers={handleLoadMoreAnswers}
          handleCollapseAnswers={handleCollapseAnswers}
          isAnswerExpanded={isAnswerExpanded}
        />
      </div>
      {
        isModalOpen && (
          <Modal>
            <AddAnswerForm questionId={question_id} questionBody={question_body} setIsModalOpen={setIsModalOpen} />
          </Modal>
        )
      }
    </div>
  );
};

export default QuestionEntry;