import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../Components/Forms/Button/Button";
import Input from "../../Components/Forms/Input/Input";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import Select from "../../Components/Forms/Select/Select";
import { scrollToView } from "../../helpers/scrollToView";
import store, {
  editSpeaker,
  cleanForm,
  cleanImages,
  formOnChange,
  fetchOrganizations,
  fetchSpeakers,
} from "../../store";

function EditSpeaker({
  editSpeaker,
  organizations,
  cleanForm,
  cleanImages,
  speakers,
  formOnChange,
  fetchOrganizations,
  fetchSpeakers,
  loading,
  fetch,
}) {
  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchSpeakers();
    }
    if (speakers.length) {
      const speaker = speakers.find((s) => s.id === parseInt(id));
      formOnChange("fullNameEng", `${speaker.nameEng}`);
      formOnChange("fullNameArm", `${speaker.nameArm}`);
      formOnChange("fullNameRu", `${speaker.nameRu}`);
    }
  }, [fetch]);

  const cancelEdit = () => {
    history.push("/speakers");
  };

  const handleEdit = (e) => {
    e.preventDefault();

    let { fullNameEng, fullNameArm, fullNameRu, organizationId } =
      store.getState().formReducer;
    let header = store.getState().imageReducer.header;
    const changePath = () => {
      history.push("/speakers");
    };
    let speaker = {
      id: parseInt(id),
      fullNameEng,
      fullNameArm,
      fullNameRu,
      organizationId,
      image: header && header[0] ? header[0].name : null,
    };
    editSpeaker(speaker, changePath);
    cleanForm();
    cleanImages();
  };
  return (
    <div>
      <form
        onFocus={scrollToView}
        onSubmit={(e) => handleEdit(e)}
        className="add_member_container"
      >
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Edit Speaker</p>
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
          <div onClick={() => cancelEdit()}>
            <Button
              type="reset"
              title="Cancel"
              className="action_btn cancel_btn"
            />
          </div>

          <div>
            <Button
              type="submit"
              title="Edit"
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
    speakers: state.speakerReducer.speakers,
    organizations: state.organizationsReducer.organizations,
    fetch: state.speakerReducer.fetch,
    loading: state.speakerReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSpeaker: (speaker, callback) =>
      dispatch(editSpeaker(speaker, callback)),
    cleanForm: () => dispatch(cleanForm()),
    cleanImages: () => dispatch(cleanImages()),
    formOnChange: (key, value) => dispatch(formOnChange(key, value)),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchSpeakers: () => {
      dispatch(fetchSpeakers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSpeaker);
