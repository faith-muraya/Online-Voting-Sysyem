import React from "react";
import "./application.css";

function application() {
  return (
    <div>
      <div className="form-container">
        <form>
          <label>
            Full Name <br />
            <input />
          </label>
          <br />
          <br />
          <label>
            What relevant experience or skills do you possess that make you a
            suitable candidate for this role?
            <input />
          </label>
          <br />
          <br />
          <label>
            What specific goals do you hope to achieve if elected to this
            position?
            <input />
          </label>
          <br />
          <br />
          <label>
            How do you plan to represent the interests of the student body or
            staff members if elected?
            <input />
          </label>
          <br />
          <br />
          <label>
            How will you navigate challenges or conflicts that may arise?
            <input />
          </label>
          <br />
          <br />
          <label>
            How do you plan to address the concerns and issues facing our
            university community?
            <input />
          </label>
          <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default application;
