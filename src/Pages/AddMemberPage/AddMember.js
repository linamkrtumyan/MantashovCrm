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
  fetchCities,
  fetchCountries,
  fetchEducations,
  fetchStates,
} from "../../store";
import {
  addMember,
  fetchContactTypes,
  fetchMemberForm,
  fetchOrganizations,
} from "../../store/members/actions";
import Multiselect from "../../Components/Forms/MultiSelect/Multiselect";
import store from "../../store";
import AddPhone from "./components/AddPhone";

function AddMember({
  fetchCountries,
  fetchStates,
  countries,
  country,
  states,
  state,
  cities,
  fetchCities,
  fetchEducations,
  educations,
  fetchOrganizations,
  organizations,
  fetchMemberForm,
  statuses,
  addMember,
  fetchContactTypes,
  contactTypes,
  cleanForm,
}) {
  const [numberDiv, setNumberDiv] = useState(false);

  const history = useHistory();
  useEffect(() => {
    fetchCountries();
    fetchEducations();
    fetchOrganizations();
    fetchMemberForm();
    fetchContactTypes();
  }, []);

  useEffect(() => {
    // console.log(country, "send id");
    fetchStates(country);
  }, [country]);
  useEffect(() => {
    // console.log(state, "send state id");
    fetchCities(state);
  }, [state]);

  const handleCreate = () => {
    // console.log("handle create");
    let {
      location,
      latitude,
      longitude,
      city,
      description,
      firstName,
      lastName,
      birthDate,
      email,
      password,
      educations,
      organizations,
      statuses,
      contacts,
    } = store.getState().formReducer;

    let keys = Object.keys(contacts);
    const values = keys.map((key) => contacts[key]);
    const image = store.getState().imageReducer.header;

    const contacts1 = keys.map((key, index) =>
      values[index].map((o) => ({ id: +key, value: o }))
    );

    let result = [];
    contacts1.forEach((contact1) => (result = result.concat(contact1)));
    // console.log(result, "result");
    // console.log(contacts1, "88888888");

    let member = {
      location,
      latitude: +latitude,
      longitude: +longitude,
      cityId: city,
      firstName,
      lastName,
      image: image[0],
      // image: null,
      birthdate: new Date(birthDate),
      description,
      email,
      password,
      // educationIds: educations?.map((education) => education.id),
      // organizationIds: organizations?.map((organization) => organization.id),
      // statusIds: statuses?.map((status) => status.id),
      educationIds: educations,
      organizationIds: organizations,
      statusIds: statuses,
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
      <div className="add_member_container">
        <div>
          <button onClick={() => history.goBack()} className="arrow_left">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div className="add_member_title">
            <p>Add Member</p>
          </div>
        </div>

        <div className="add_member_component">
          <div className="location_container">
            <div style={{ margin: "auto 0" }} className="">
              <OneImageUpload label="Upload Image" />
              <label class="checkbox my-2 is-flex is-justify-content-center is-align-items-center">
                <input type="checkbox" />
                Active
              </label>
            </div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="firstName" type="text" placeholder="First Name" />
                <Input id="lastName" type="text" placeholder="Last Name" />
                <Input id="birthDate" type="date" placeholder="Birthdate" />
              </div>

              <div>
                <Textarea
                  id="description"
                  type="text"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Location</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                <form className="location_item" autoComplete="off">
                  <Select
                    placeholder="Select Country"
                    items={countries}
                    id="country"
                  />
                </form>
                <form className="location_item" autoComplete="off">
                  <Select
                    placeholder="Select State"
                    items={states}
                    id="state"
                  />
                </form>
                <form className="location_item" autoComplete="off">
                  <Select placeholder="Select City" items={cities} id="city" />
                </form>
              </div>
              <div>
                <form className="location_item" autoComplete="off">
                  <Input id="location" type="text" placeholder="Address" />
                </form>
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Occupation</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                <div>
                  <Select
                    placeholder="Select Field"
                    // items={countries}
                    // id="country"
                  />
                </div>

                <form className="location_item" autoComplete="off">
                  <Multiselect
                    placeholder="Select Organizations"
                    items={organizations}
                    id="organizations"
                  />
                </form>
                <div>
                  <Input id="position" type="text" placeholder="Position" />
                </div>
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Contact</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                <div className="" style={{ display: "flex" }}>
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
          <Button title="Cancel" className="action_btn cancel_btn" />
          <div onClick={handleCreate}>
            <Button title="Create" className="action_btn" />
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
    country: state.formReducer.country,
    states: state.locationsReducer.states,
    state: state.formReducer.state,
    cities: state.locationsReducer.cities,
    educations: state.membersReducer.memberForm.educations,
    organizations: state.membersReducer.memberForm.organizations,
    statuses: state.membersReducer.memberForm.statuses,
    contactTypes: state.membersReducer.contactTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    fetchEducations: () => dispatch(fetchEducations()),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    fetchMemberForm: () => dispatch(fetchMemberForm()),
    addMember: (member, changePath) => dispatch(addMember(member, changePath)),
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    cleanForm: () => dispatch(cleanForm()),
    // addNews: (news) => dispatch(addNews(news)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
