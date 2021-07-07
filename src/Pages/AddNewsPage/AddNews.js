import React from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addNewsPage.css";
import { useHistory } from "react-router-dom";

function AddNews() {
  const history = useHistory();

  const onImageChange = (event) => {
    console.log(event.target.files.name, "event");
    // if (event.target.files && event.target.files[0]) {
    //   let img = event.target.files[0];
    //   this.setState({
    //     image: URL.createObjectURL(img)
    //   });
    // }
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        <svg
          width="60px"
          height="60px"
          viewBox="0 0 50 80"
          //   xml:space="preserve"
        >
          <polyline
            fill="#343333"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="
	45.63,75.8 0.375,38.087 45.63,0.375 "
          />
        </svg>
      </button>
      {/* <button onClick={() => history.goBack()}>Go Back</button> */}
      <div className="add_member_container">
        <div className="add_member_title">Add News</div>

        <div className="add_member_component">
          <Input type="text" placeholder="Title" />
          {/* <Input type="text" placeholder="Last Name" />
          <Input type="date" placeholder="Birthdate" />
          <Input type="text" placeholder="Location" /> */}
          <Textarea type="text" placeholder="Text" />
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={onImageChange}
          />
        </div>
        <div className="action_container">
          <Button title="Cancel" className="action_btn cancel_btn" />

          <Button title="Create" className="action_btn" />
        </div>
      </div>
    </div>
  );
}

export default AddNews;
