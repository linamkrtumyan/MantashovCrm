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
}) {
  const [showPhone, setShowPhone] = useState(false);
  const [showViber, setShowViber] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showSkype, setShowSkype] = useState(false);

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
    console.log(state, "send state id");
    fetchCities(state);
  }, [state]);

  const handleCreate = () => {
    console.log("handle create");
    let {
      location,
      latitude,
      longitude,
      city,
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

    // Valodzya.map((Val,index) => ( t[index].map((o) => ({id:Val, value:o}) )))
    const contacts1 = keys.map((key, index) =>
      values[index].map((o) => ({ id: +key, value: o }))
    );

    let result = [];
    contacts1.forEach((contact1) => (result = result.concat(contact1)));
    console.log(result, "result");
    console.log(contacts1, "88888888");
    // const t = Valodzya.map((v) =>  charValodzya[v])

    let member = {
      location,
      latitude: +latitude,
      longitude: +longitude,
      cityId: city,
      firstName,
      lastName,
      // image: image[0],
      image: null,
      birthdate: new Date(birthDate),
      email,
      password,
      educationIds: educations?.map((education) => education.id),
      organizationIds: organizations?.map((organization) => organization.id),
      statusIds: statuses?.map((status) => status.id),
      contacts: result,
    };

    const changePath = () => {
      history.push("/members");
    };
    console.log(member, "uxarkvox member");
    addMember(member, changePath);
  };

  return (
    <div>
      <button onClick={() => history.goBack()} className="arrow_left">
        ❮
      </button>
      {/* <button onClick={() => history.goBack()}>Go Back</button> */}
      <div className="add_member_container">
        <div className="add_member_title">Add Member</div>

        <div className="add_member_component">
          <form autoComplete="off">
            {/* <div>Add address</div> */}
            <Select
              placeholder="Select Country"
              items={countries}
              id="country"
            />
          </form>
          <form autoComplete="off">
            <Select placeholder="Select State" items={states} id="state" />
          </form>

          <form autoComplete="off">
            <Select placeholder="Select City" items={cities} id="city" />
          </form>
          <Input id="location" type="text" placeholder="Location" />
          <Input id="latitude" type="text" placeholder="Latitude" />
          <Input id="longitude" type="text" placeholder="Longitude" />

          <div>
            <div>Add member</div>
          </div>
          <Input id="firstName" type="text" placeholder="First Name" />
          <Input id="lastName" type="text" placeholder="Last Name" />
          <OneImageUpload label="Upload Image" />
          <Textarea id="description" type="text" placeholder="Description" />
          <Input id="birthDate" type="date" placeholder="Birthdate" />
          <Input id="email" type="text" placeholder="Email" />
          <Input id="password" type="text" placeholder="Password" />
          <form autoComplete="off">
            <Multiselect
              placeholder="Select Educations"
              items={educations}
              id="educations"
            />
          </form>
          <form autoComplete="off">
            <Multiselect
              placeholder="Select Organizations"
              items={organizations}
              id="organizations"
            />
          </form>
          <form autoComplete="off">
            <Multiselect
              placeholder="Select Statuses"
              items={statuses}
              id="statuses"
            />
          </form>

          {contactTypes.map((contactType) => (
            <AddPhone key={contactType.id} contactType={contactType} />
          ))}
        </div>

        {/* {contactTypes.map((contactType) => (
          <li key={contactType.id}>{contactType.name}</li>
        ))} */}

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
    // addNews: (news) => dispatch(addNews(news)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMember);
