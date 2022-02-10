import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addMember.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
// import Select from "../../Components/Forms/Select/Select";
import instagramIcon from "../../img/instagram.png";
import facebookIcon from "../../img/facebook.png";
import linkedinIcon from "../../img/linkedin.png";
import {
  cleanForm,
  cleanImages,
  fetchCategories,
  fetchCities,
  fetchCountries,
  fetchOrganizations,
  fetchPositions,
  fetchStates,
  cleanLocation,
  formOnChangeArray,
} from "../../store";
import {
  addMember,
  cleanMember,
  fetchContactTypes,
} from "../../store/members/actions";
import store from "../../store";
import AddPhone from "./components/AddPhone";
import AddOrganization from "./components/AddOrganization";
import { scrollToView } from "../../helpers/scrollToView";

function AddMember({
  fetchCountries,
  fetchStates,
  countries,
  countryId,
  states,
  stateId,
  cities,
  fetchCities,
  cleanMember,
  addMember,
  fetchContactTypes,
  contactTypes,
  cleanForm,
  fetchCategories,
  cleanLocation,
  // organizationsType,
  addedOrganizations = [],
}) {
  const [dateNow] = useState(new Date(Date.now()).toISOString().split("T")[0]);
  // console.log(isActive, "is active");
  const history = useHistory();
  useEffect(() => {
    fetchCountries();
    fetchContactTypes();
    fetchCategories();
    // cleanForm();
    cleanMember();
    cleanLocation();

    // organizationsType.map((org) => {
    //   formOnChangeArray("organizations", org.name, "");
    // });
  }, []);

  useEffect(() => {
    if (countryId) {
      fetchStates(countryId);
    }
  }, [countryId]);
  useEffect(() => {
    if (stateId) {
      fetchCities(stateId);
    }
  }, [stateId]);
  // useEffect(() => {
  //   if (categoryId) {
  //     fetchOrganizations(categoryId);
  //   }
  // }, [categoryId]);

  const cancelAdd = () => {
    history.push("/members");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    let {
      locationArm,
      locationEng,
      locationRu,

      cityId,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      firstNameArm,
      lastNameArm,
      firstNameEng,
      lastNameEng,
      firstNameRu,
      lastNameRu,
      birthdate,
      email,
      organizationId,
      positionId,
      contacts = {},
    } = store.getState().formReducer;
    const image = store.getState().imageReducer.header;
    let keys = Object.keys(contacts);
    const values = keys.map((key) => contacts[key]);
    let ok = false;
    values.map((value) => (value ? (ok = true) : (ok = false)));
    const contacts1 = keys.map((key, index) =>
      ok ? values[index].map((o) => ({ id: 1 + +key, value: o })) : []
    );
    let result = [];
    contacts1.forEach((contact1) => (result = result.concat(contact1)));

    let member = {
      locationArm,
      locationEng,
      locationRu,
      cityId,

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
      organizations: addedOrganizations,
      positionId,
      contacts: result,
    };

    const changePath = () => {
      history.push("/members");
    };
    addMember(member, changePath);
    cleanForm();
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
            <p>Add Member</p>
          </div>
        </div>

        <div className="add_member_component">
          <div className="location_container">
            <div style={{ margin: "20px 0" }} className="">
              <OneImageUpload label="Upload Image" />
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input
                  placeholder="Birthdate"
                  id="birthdate"
                  type="date"
                  max={dateNow}
                />
                <Input
                  id="turnover"
                  type="text"
                  placeholder="Annual turnover"
                />
              </div>
            </div>
          </div>

          {/* <div className="location_container">
            <div className="container_title">Location</div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select
                  placeholder="Select Country"
                  items={countries}
                  id="countryId"
                />

                <Select
                  placeholder="Select State"
                  items={states}
                  id="stateId"
                />

                <Select placeholder="Select City" items={cities} id="cityId" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="locationEng" type="text" placeholder="Address" />
                <Input id="locationArm" type="text" placeholder="Հասցե" />
                <Input id="locationRu" type="text" placeholder="Адрес" />
              </div>
            </div>
          </div> */}

          <div className="location_container">
            <div className="container_title">Occupation</div>
            <div className="container_body">
              <div>
                <AddOrganization />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Textarea
                  id="orgdescriptionEng"
                  type="text"
                  placeholder="Organization Description"
                  className="add_member-org_input"
                />
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Contact</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                <div className="" style={{ display: "flex", maxWidth: "100%" }}>
                  {/* {contactTypes.map((contactType) => (
                    <AddPhone key={contactType.id} contactType={contactType} />
                  ))} */}
                  <Input id="phone" type="text" placeholder="Phone" />
                  <Input
                    id="instagram"
                    type="url"
                    placeholder="Instagram"
                    labelIcon={instagramIcon}
                  />
                  <Input
                    id="facebook"
                    type="url"
                    placeholder="Facebook"
                    labelIcon={facebookIcon}
                  />
                  <Input
                    id="linkedin "
                    type="url"
                    placeholder="Linkedin"
                    labelIcon={linkedinIcon}
                  />
                </div>
              </div>

              <div style={{ display: "flex" }}></div>
              <div className="">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required={true}
                />
              </div>
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
  console.log(state, "state");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    statuses: state.membersReducer.memberForm.statuses,
    contactTypes: state.membersReducer.contactTypes,
    categories: state.organizationsReducer.categories,
    categoryId: state.formReducer.categoryId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchCategories: () => dispatch(fetchCategories()),
    addMember: (member, changePath) => dispatch(addMember(member, changePath)),
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    cleanForm: () => dispatch(cleanForm()),
    fetchPositions: () => dispatch(fetchPositions()),
    cleanMember: () => dispatch(cleanMember()),
    cleanLocation: () => dispatch(cleanLocation()),
    formOnChangeArray: (firstKey, secondKey, value) =>
      dispatch(formOnChangeArray(firstKey, secondKey, value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
