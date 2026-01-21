import React from 'react';

const GuestView: React.FC = () => {  
  return (
    <>
      <section className="section section-hero">
        <div className="section-content">
          <h1 style={{ textTransform: "uppercase" }}>Welcome to <br /> <span className="highlight">Quizzical!</span></h1>
          <p>Challenge yourself with fun quizzes across multiple categories and levels!</p>
        </div>
      </section>

      <section className="section section-why">
        <div className="info-inner">
          <div className="info-image">
            <img src="/undraw_quiz_zvhe-removebg-preview.png" alt="Quiz fun" />
          </div>
          <div className="info-text">
            <h2>Learn, Play, Repeat</h2>
            <p>Pick your category and test your knowledge in fun and challenging quizzes.</p>
          </div>
        </div>
      </section>

      <section className="section section-about">
        <div className="info-inner">
          <div className="info-text">
            <h2>Track Your Progress</h2>
            <p>View your profile, see your scores, and improve your skills one quiz at a time.</p>
          </div>
          <div className="info-image">
            <img src="/undraw_questions.png" alt="Track progress" />
          </div>
        </div>
      </section>
    </>
  );
}

export default GuestView;