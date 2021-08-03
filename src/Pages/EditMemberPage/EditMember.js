import React, { useEffect } from "react";
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
} from "../../store";
import Select from "../../Components/Forms/Select/Select";
import { connect } from "react-redux";
import Multiselect from "../../Components/Forms/MultiSelect/Multiselect";
import OneImageUpload from "../../Components/Forms/OneImageUpload.js/OneImageUpload";
import EditPhone from "./components/EditPhone";

function EditMember({
  fetchMemberForEdit,
  member,
  fetchMemberForm,
  educations,
  organizations,
  statuses,
  countries,
  fetchCountries,
  states,
  cities,
  fetchStates,
  fetchCities,
  stateId,
  countryId,
  editMember,
  fetchContactTypes,
  contactTypes,
}) {
  const history = useHistory();
  const path = useHistory();

  let { id } = useParams();

  useEffect(() => {
    fetchMemberForEdit(id);
    fetchMemberForm();
    fetchCountries();
    fetchContactTypes();
  }, []);

  useEffect(() => {
    fetchStates(countryId);
  }, [countryId]);

  useEffect(() => {
    fetchCities(stateId);
  }, [stateId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      birthdate,
      cityId,
      contacts,
      description,
      educationIds,
      email,
      firstName,
      lastName,
      latitude,
      location,
      longitude,
      password,
      organizationIds,
      statusIds,
    } = store.getState().formReducer;

    let keys = Object.keys(contacts);
    const values = keys.map((key) => contacts[key]);
    const image = store.getState().imageReducer.header;

    const contacts1 = keys.map((key, index) =>
      values[index].map((o) => ({ id: +key, value: o }))
    );

    let result = [];
    contacts1.forEach((contact1) => (result = result.concat(contact1)));

    const changePath = () => {
      path.push("/members");
    };
    let member = {
      location,
      latitude: +latitude,
      longitude: +longitude,
      cityId,
      id: +id,
      firstName,
      lastName,
      image: "",
      description,
      birthdate,
      email,
      password,
      educationIds,
      organizationIds,
      statusIds,
      contacts: result,
    };
    console.log(member, "sevded member");
    editMember(member, changePath);
    // cleanImages();
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
      <div className="edit_member_container">
        <div className="edit_member_title">Edit Member</div>

        <div className="edit_member_component">
          <form autoComplete="off">
            {/* <div>Add address</div> */}
            <Select
              placeholder="Select Country"
              items={countries}
              id="countryId"
            />
          </form>
          <form autoComplete="off">
            <Select placeholder="Select State" items={states} id="stateId" />
          </form>

          <form autoComplete="off">
            <Select placeholder="Select City" items={cities} id="cityId" />
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
          <Input id="birthdate" type="date" placeholder="Birthdate" />
          <Input id="email" type="text" placeholder="Email" />
          <Input id="password" type="text" placeholder="Password" />

          <form autoComplete="off">
            <Multiselect
              placeholder="Select Educations"
              items={educations}
              id="educationIds"
            />
          </form>
          <form autoComplete="off">
            <Multiselect
              placeholder="Select Organizations"
              items={organizations}
              id="organizationIds"
            />
          </form>
          <form autoComplete="off">
            <Multiselect
              placeholder="Select Statuses"
              items={statuses}
              id="statusIds"
            />
          </form>

          {contactTypes.map((contactType) => (
            <EditPhone key={contactType.id} contactType={contactType} />
          ))}
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
    member: state.membersReducer.memberForEdit,
    educations: state.membersReducer.memberForm?.educations,
    organizations: state.membersReducer.memberForm?.organizations,
    statuses: state.membersReducer.memberForm?.statuses,
    countries: state.locationsReducer.countries,
    states: state.locationsReducer?.states,
    cities: state.locationsReducer?.cities,
    stateId: state.formReducer.stateId,
    countryId: state.formReducer.countryId,
    contactTypes: state.membersReducer.contactTypes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMemberForEdit: (id) => dispatch(fetchMemberForEdit(id)),
    fetchMemberForm: () => dispatch(fetchMemberForm()),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (id) => dispatch(fetchStates(id)),
    fetchCities: (id) => dispatch(fetchCities(id)),
    editMember: (member) => dispatch(editMember(member)),
    fetchContactTypes: () => dispatch(fetchContactTypes()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMember);
