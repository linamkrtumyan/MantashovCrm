import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./editMember.css";
import { useHistory, useParams } from "react-router-dom";
import store, {
  fetchMemberForEdit,
  fetchMemberForm,
  fetchCountries,
  fetchStates,
  fetchCities,
  editMember,
  fetchContactTypes,
  fetchCategories,
  fetchOrganizations,
  fetchPositions,
  cleanForm,
} from "../../store";
import Select from "../../Components/Forms/Select/Select";
import { connect } from "react-redux";
import Multiselect from "../../Components/Forms/MultiSelect/Multiselect";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";
import EditPhone from "./components/EditPhone";

function EditMember({
  fetchMemberForEdit,
  organizations,
  countries,
  fetchCountries,
  states,
  cities,
  fetchStates,
  fetchCities,
  state,
  country,
  editMember,
  fetchContactTypes,
  contactTypes,
  fetchCategories,
  categories,
  category,
  fetchOrganizations,
  fetchPositions,
  positions,
  cleanForm,
}) {
  const history = useHistory();
  const path = useHistory();
  const [isActive, setIsActive] = useState(true);
  const [changeImage, setChangeImage] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetchMemberForEdit(id);
    fetchCountries();
    fetchContactTypes();
    fetchCategories();
    fetchPositions();
    cleanForm();
  }, []);

  useEffect(() => {
    if (country) {
      fetchStates(country);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      fetchCities(state);
    }
  }, [state]);
  useEffect(() => {
    if (category) {
      fetchOrganizations(category);
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      birthdate,
      city,
      contacts,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      email,
      firstNameArm,
      firstNameEng,
      firstNameRu,
      lastNameArm,
      lastNameEng,
      lastNameRu,
      locationArm,
      locationEng,
      locationRu,
      organization,
      position,
    } = store.getState().formReducer;

    const image = store.getState().imageReducer.header;

    const cont = Object.values(contacts);

    const changePath = () => {
      path.push("/members");
    };
    let member = {
      locationArm,
      locationEng,
      locationRu,
      cityId: city,
      id: +id,
      firstNameArm,
      lastNameArm,
      firstNameEng,
      lastNameEng,
      firstNameRu,
      lastNameRu,
      image,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      birthdate,
      email,
      organizationId: organization,
      positionId: position,
      contacts: cont,
      isActive,
    };
    // console.log(member, "sended member");
    editMember(member, changePath);
    // cleanImages();
  };

  return (
    <div>
      <div className="add_member_container">
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Edit Member</p>
          </div>
        </div>

        <div className="add_member_component">
          <div className="location_container">
            <div style={{ margin: "20px 0" }} className="">
              {changeImage ? (
                <OneImageUpload label="Upload Image" />
              ) : (
                <>
                  <div className="member_image_container">
                    <img
                      src={`/images/profile/${id}/profile_picture.png`}
                      alt=""
                      className="member_edit_image"
                      style={{ width: "100%" }}
                    />
                    <div className="member_image_middle">
                      <div
                        onClick={() => setChangeImage(true)}
                        className="member_edit_text"
                      >
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="firstNameEng" type="text" placeholder="First Name" />
                <Input id="firstNameArm" type="text" placeholder="Անուն" />
                <Input id="firstNameRu" type="text" placeholder="Имя" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="lastNameEng" type="text" placeholder="Last Name" />
                <Input id="lastNameArm" type="text" placeholder="Ազգանուն" />
                <Input id="lastNameRu" type="text" placeholder="Фамилия" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Textarea
                  id="descriptionEng"
                  type="text"
                  placeholder="Description"
                />
                <Textarea
                  id="descriptionArm"
                  type="text"
                  placeholder="Նկարագիր"
                />
                <Textarea
                  id="descriptionRu"
                  type="text"
                  placeholder="Описание"
                />
              </div>
              <div style={{ display: "flex" }}>
                <Input id="birthdate" type="date" placeholder="" />
                <button
                  onClick={() => setIsActive(!isActive)}
                  style={{ width: "31%", margin: "0 14px" }}
                  className={isActive ? "button red" : "button"}
                >
                  {/* <input type="checkbox" /> */}
                  <p>{isActive ? "Active" : "Passive"}</p>
                </button>
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Location</div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select
                  placeholder="Select Country"
                  items={countries}
                  id="country"
                />

                <Select placeholder="Select State" items={states} id="state" />

                <Select placeholder="Select City" items={cities} id="city" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="locationEng" type="text" placeholder="Address" />
                <Input id="locationArm" type="text" placeholder="Հասցե" />
                <Input id="locationRu" type="text" placeholder="Адрес" />
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Occupation</div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select
                  placeholder="Select Sphere"
                  items={categories}
                  id="category"
                />

                <Select
                  placeholder="Select Organization"
                  items={organizations}
                  id="organization"
                />

                <Select
                  placeholder="Select Position"
                  items={positions}
                  id="position"
                />
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Contact</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                <div className="" style={{ display: "flex", maxWidth: "100%" }}>
                  {contactTypes.map((contactType) => (
                    <EditPhone key={contactType.id} contactType={contactType} />
                  ))}
                </div>
              </div>
              <div className="">
                <Input id="email" type="email" placeholder="Email" />
              </div>
            </div>
          </div>
        </div>

        <div className="action_container">
          <Button title="Cancel" className="action_btn cancel_btn" />
          <div onClick={handleSubmit}>
            <Button title="Save" className="action_btn" />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    countries: state.locationsReducer.countries,
    states: state.locationsReducer?.states,
    cities: state.locationsReducer?.cities,
    state: state.formReducer.state,
    country: state.formReducer.country,
    contactTypes: state.membersReducer.contactTypes,
    categories: state.organizationsReducer.categories,
    category: state.formReducer.category,
    organizations: state.organizationsReducer.organizations,
    organization: state.formReducer.organization,
    positions: state.organizationsReducer.positions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMemberForEdit: (id) => dispatch(fetchMemberForEdit(id)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (id) => dispatch(fetchStates(id)),
    fetchCities: (id) => dispatch(fetchCities(id)),
    editMember: (member, path) => dispatch(editMember(member, path)),
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchOrganizations: (id) => dispatch(fetchOrganizations(id)),
    fetchPositions: () => dispatch(fetchPositions()),
    cleanForm: () => dispatch(cleanForm()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMember);
