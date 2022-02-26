import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../Components/Forms/Button/Button";
import Input from "../../Components/Forms/Input/Input";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import Select from "../../Components/Forms/Select/Select";
import { scrollToView } from "../../helpers/scrollToView";
import store, {
  fetchOrganizations,
  addSpeaker,
  cleanForm,
  cleanImages,
} from "../../store";

function AddSpeakerPage({
  fetchOrganizations,
  addSpeaker,
  organizations,
  cleanForm,
  cleanImages,
}) {
  let history = useHistory();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const cancelAdd = () => {
    history.push("/speakers");
  };

  const handleCreate = (e) => {
    e.preventDefault();

    let { fullNameEng, fullNameArm, fullNameRu, organizationId } =
      store.getState().formReducer;
    let header = store.getState().imageReducer.header[0];

    let speaker = {
      fullNameEng,
      fullNameArm,
      fullNameRu,
      organizationId,
      image: header && header[0] ? header[0].name : null,
    };
    const changePath = () => {
      history.push("/speakers");
    };
    addSpeaker(speaker, changePath);
    cleanForm();
    cleanImages();
  };
  return (
    <div>
      <form
        onFocus={scrollToView}
        onSubmit={(e) => handleCreate(e)}
        className="add_member_container"
      >
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Add Speaker</p>
          </div>
        </div>

        <div className="add_member_component">
          <div className="location_container">
            <div style={{ margin: "20px 0" }} className="">
              <OneImageUpload label="Upload Image" />
            </div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="fullNameEng" type="text" placeholder="Fullname" />
                <Input
                  id="fullNameArm"
                  type="text"
                  placeholder="Անուն Ազգանուն"
                />
                <Input id="fullNameRu" type="text" placeholder="Имя Фамилия" />
              </div>
              <Select
                placeholder="Select Organization"
                items={organizations}
                id="organizationId"
              />
            </div>
          </div>
        </div>

        <div className="action_container">
          <div onClick={() => cancelAdd()}>
            <Button
              type="reset"
              title="Cancel"
              className="action_btn cancel_btn"
            />
          </div>

          <div>
            <Button
              type="submit"
              title="Create"
              className="action_btn is-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    organizations: state.organizationsReducer.organizations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    addSpeaker: (speaker, callback) => dispatch(addSpeaker(speaker, callback)),
    cleanForm: () => dispatch(cleanForm()),
    cleanImages: () => dispatch(cleanImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeakerPage);
