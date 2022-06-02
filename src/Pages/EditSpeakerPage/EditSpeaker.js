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
  fetchSpeakerById,
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
  organizationId,
  image,
  fetchSpeakerById,
}) {
  let history = useHistory();
  let { id } = useParams();
  const [mainImg, setMainImg] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchSpeakers();
    }
  }, [fetch]);

  useEffect(() => {
    if (id) {
      fetchSpeakerById(id);
    }
  }, [id]);

  const cancelEdit = () => {
    history.push("/speakers/1");
  };

  const handleEdit = (e) => {
    e.preventDefault();

    let { nameEng, nameArm, nameRu, organizationId } =
      store.getState().formReducer;
    let header = store.getState().imageReducer.header;
    const changePath = () => {
      history.push("/speakers/1");
    };
    let speaker = {
      id: parseInt(id),
      fullNameEng: nameEng,
      fullNameArm: nameArm,
      fullNameRu: nameRu,
      organizationId,
      image: header && header[0] ? header[0].name : null,
      imageDeleted: !mainImg,
    };
    editSpeaker(speaker, changePath);
    cleanForm();
    cleanImages();
  };
  return (
    <div>
      <div>
        <button onClick={() => history.goBack()} className="arrow_left">
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="add_member_title">
          <p>Edit Speaker</p>
        </div>
      </div>
      <form
        onFocus={scrollToView}
        onSubmit={(e) => handleEdit(e)}
        className="add_member_container"
      >
        <div className="add_member_component">
          <div className="location_container">
            {mainImg ? (
              <div className="upload_cont">
                <img className="uploaded_image" src={`${image}`} alt="" />
                <div className="middle">
                  <div onClick={() => setMainImg(false)}>
                    <svg viewBox="0 0 24 24" className="close">
                      <path
                        d="M 2 2 L 22 22 M 2 22 L22 2"
                        stroke="red"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <OneImageUpload label="Header Image" />
            )}
            {/* <div style={{ margin: "20px 0" }} className="">
              <OneImageUpload label="Upload Image" />
            </div> */}
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="nameEng" type="text" placeholder="Fullname"   required={false}/>
                <Input id="nameArm" type="text" placeholder="Անուն Ազգանուն"   required={false}/>
                <Input id="nameRu" type="text" placeholder="Имя Фамилия"   required={false}/>
              </div>
              <Select
                placeholder="Select Organization"
                items={organizations}
                id="organizationId"
                value={organizationId}
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
    organizationId: state.formReducer.organizationId,
    image: state.formReducer?.image,
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
    fetchSpeakerById: (id) => {
      dispatch(fetchSpeakerById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSpeaker);
