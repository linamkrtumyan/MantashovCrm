import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./addMember.css";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";
import Select from "../../Components/Forms/Select/Select";
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
} from "../../store";
import {
  addMember,
  cleanMember,
  fetchContactTypes,
} from "../../store/members/actions";
import store from "../../store";
import AddPhone from "./components/AddPhone";

function AddMember({
  fetchCountries,
  fetchStates,
  countries,
  countryId,
  states,
  stateId,
  cities,
  fetchCities,

  fetchOrganizations,
  organizations,
  cleanMember,
  statuses,
  addMember,
  fetchContactTypes,
  contactTypes,
  cleanForm,
  fetchCategories,
  categories,
  categoryId,
  fetchPositions,
  positions,
  cleanLocation,
}) {
  const [isActive, setIsActive] = useState(true);
  // console.log(isActive, "is active");
  const history = useHistory();
  useEffect(() => {
    fetchCountries();
    fetchContactTypes();
    fetchCategories();
    fetchPositions();
    cleanForm();
    cleanMember();
    cleanLocation();
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
  useEffect(() => {
    if (categoryId) {
      fetchOrganizations(categoryId);
    }
  }, [categoryId]);

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
      contacts,
    } = store.getState().formReducer;
    const image = store.getState().imageReducer.header;

    let keys = Object.keys(contacts);
    console.log(keys, "keys");

    const values = keys.map((key) => contacts[key]);
    console.log(values, "values");
    let ok = false;
    values.map((value) => (value ? (ok = true) : (ok = false)));

    const contacts1 = keys.map((key, index) =>
      ok ? values[index].map((o) => ({ id: 1 + +key, value: o })) : []
    );

    let result = [];
    contacts1.forEach((contact1) => (result = result.concat(contact1)));
    // console.log(result, "result");
    // console.log(contacts1, "88888888");

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

      organizationId,
      positionId,
      contacts: result,
    };

    const changePath = () => {
      history.push("/members");
    };
    // console.log(member, "uxarkvox member");
    addMember(member, changePath);

    cleanForm();
  };

  return (
    <div>
      <form onSubmit={(e) => handleCreate(e)} className="add_member_container">
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
              <div style={{ display: "flex" }}>
                <Input placeholder="Birthdate" id="birthdate" type="date" />
                {/* <button
                  onClick={() => setIsActive(!isActive)}
                  style={{ width: "31%", margin: "0 14px" }}
                  className={isActive ? "button red" : "button"}
                >
                  <p>{isActive ? "Active" : "Passive"}</p>
                </button> */}
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
          </div>

          <div className="location_container">
            <div className="container_title">Occupation</div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Select
                  placeholder="Select Sphere"
                  items={categories}
                  id="categoryId"
                />

                <Select
                  placeholder="Select Organization"
                  items={organizations}
                  id="organizationId"
                />

                <Select
                  placeholder="Select Position"
                  items={positions}
                  id="positionId"
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
                    <AddPhone key={contactType.id} contactType={contactType} />
                  ))}{" "}
                </div>
              </div>
              <div className="">
                <Input id="email" type="text" placeholder="Email" />
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
            <Button type="submit" title="Create" className="action_btn" />
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
    organizations: state.organizationsReducer.organizations,
    positions: state.organizationsReducer.positions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    fetchOrganizations: (categoryId) =>
      dispatch(fetchOrganizations(categoryId)),
    fetchCategories: () => dispatch(fetchCategories()),
    addMember: (member, changePath) => dispatch(addMember(member, changePath)),
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    cleanForm: () => dispatch(cleanForm()),
    fetchPositions: () => dispatch(fetchPositions()),
    cleanMember: () => dispatch(cleanMember()),
    cleanLocation: () => dispatch(cleanLocation()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
