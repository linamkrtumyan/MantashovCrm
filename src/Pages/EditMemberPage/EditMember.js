import React, { useEffect, useState } from "react";
import Input from "../../Components/Forms/Input/Input";
import Textarea from "../../Components/Forms/Textarea/Textarea";
import Button from "../../Components/Forms/Button/Button";
import "./editMember.css";
import { useHistory, useParams } from "react-router-dom";
import store, {
  fetchMemberForEdit,
  fetchCountries,
  fetchStates,
  fetchCities,
  editMember,
  fetchContactTypes,
  fetchCategories,
  fetchOrganizations,
  fetchPositions,
  cleanForm,
  cleanImages,
} from "../../store";
import { connect } from "react-redux";
import OneImageUpload from "../../Components/Forms/OneImageUpload/OneImageUpload";
import AddOrganization from "../AddMemberPage/components/AddOrganization";
import { scrollToView } from "../../helpers/scrollToView";
import instagramIcon from "../../img/instagram.png";
import facebookIcon from "../../img/facebook.png";
import linkedinIcon from "../../img/linkedin.png";
import phoneIcon from "../../img/phone.png";

function EditMember({
  fetchMemberForEdit,
  // countries,
  // fetchCountries,
  // states,
  // cities,
  fetchStates,
  fetchCities,
  state,
  country,
  editMember,
  // fetchContactTypes,
  // contactTypes,
  fetchCategories,
  category,
  fetchOrganizations,
  fetchPositions,
  cleanForm,
  profileImage,
}) {
  const history = useHistory();
  const path = useHistory();
  const [isActive, setIsActive] = useState(true);
  const [changeImage, setChangeImage] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);
  const [dateNow] = useState(new Date(Date.now()).toISOString().split("T")[0]);

  let { id } = useParams();

  useEffect(() => {
    cleanForm();
    fetchMemberForEdit(id);
    // fetchCountries();
    // fetchContactTypes();
    fetchCategories();
    fetchPositions();
    cleanImages();
  }, []);

  // useEffect(() => {
  //   if (country) {
  //     fetchStates(country);
  //   }
  // }, [country]);

  // useEffect(() => {
  //   if (state) {
  //     fetchCities(state);
  //   }
  // }, [state]);
  // useEffect(() => {
  //   if (category) {
  //     fetchOrganizations(category);
  //   }
  // }, [category]);

  const handleCancel = () => {
    history.push("/members/1");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let {
      birthDate,
      // city,
      // contacts = {},
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
      // locationArm,
      // locationEng,
      // locationRu,
      addedOrganizations = [],
      position,
      facebook,
      phone,
      linkedin,
      instagram,
      annualTurnover,
    } = store.getState().formReducer;

    const header = store.getState().imageReducer.header[0]?.name ?? null;

    // if (!contacts) {
    //   contacts = {};
    // }
    // const cont = Object.values(contacts);

    const changePath = () => {
      path.push("/members/1");
    };
    let member = {
      // locationArm,
      // locationEng,
      // locationRu,
      // cityId: city,
      id: +id,
      firstNameArm,
      lastNameArm,
      firstNameEng,
      lastNameEng,
      firstNameRu,
      lastNameRu,
      image: header,
      descriptionArm,
      descriptionEng,
      descriptionRu,
      birthDate,
      email,
      // organizationId: organization,
      organizations: addedOrganizations,
      positionId: position,
      // contacts: cont,
      turnover: annualTurnover,
      isActive,
      imageDeleted,
      facebook,
      phone,
      linkedin,
      instagram,
    };
    editMember(member, changePath);
    cleanForm();
    // cleanImages();
  };

  return (
    <div>
      <form
        onFocus={scrollToView}
        onSubmit={handleSubmit}
        className="add_member_container"
      >
        <div>
          <button
            type="button"
            onClick={() => history.goBack()}
            className="arrow_left"
          >
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
                <div className="upload_cont" style={{ display: "flex" }}>
                  <img
                    src={`${profileImage ? profileImage : ""}`}
                    alt=""
                    className="uploaded_image"
                  />
                  <div className="middle">
                    <div
                      onClick={() => {
                        setChangeImage(true);
                        setImageDeleted(true);
                      }}
                      className="member_edit_text"
                    >
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="container_body">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="firstNameEng" type="text" placeholder="First Name"   required={false}/>
                <Input id="firstNameArm" type="text" placeholder="??????????"   required={false}/>
                <Input id="firstNameRu" type="text" placeholder="??????"   required={false}/>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Input id="lastNameEng" type="text" placeholder="Last Name"  required={false} />
                <Input id="lastNameArm" type="text" placeholder="????????????????"   required={false}/>
                <Input id="lastNameRu" type="text" placeholder="??????????????"   required={false}/>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Textarea
                  id="descriptionEng"
                  type="text"
                  placeholder="Description"
                  required={false}
                />
                <Textarea
                  id="descriptionArm"
                  type="text"
                  placeholder="????????????????"
                  required={false}
                />
                <Textarea
                  id="descriptionRu"
                  type="text"
                  placeholder="????????????????"
                  required={false}
                />
              </div>

              <div style={{ display: "flex" }}>
                <Input
                  id="birthDate"
                  type="date"
                  max={dateNow}
                  placeholder="Birthdate"
                />
                <Input
                  id="annualTurnover"
                  type="text"
                  placeholder="Annual Turnover"
                />
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                style={{ width: "31%", margin: "0 14px" }}
                type="button"
                className={isActive ? "button red" : "button"}
              >
                {isActive ? "Active" : "Passive"}
              </button>
            </div>
          </div>

          {/* <div className="location_container">
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
                <Input id="locationArm" type="text" placeholder="??????????" />
                <Input id="locationRu" type="text" placeholder="??????????" />
              </div>
            </div>
          </div> */}

          <div className="location_container">
            <div className="container_title">Occupation</div>
            <div className="container_body">
              <div>
                <AddOrganization />
              </div>
            </div>
          </div>

          <div className="location_container">
            <div className="container_title">Contact</div>
            <div className="container_body">
              <div style={{ display: "flex" }}>
                {/* <div className="" style={{ display: "flex", maxWidth: "100%" }}>
                  {contactTypes.map((contactType) => (
                    <EditPhone key={contactType.id} contactType={contactType} />
                  ))}
                </div> */}
                <div>
                  <div
                    className=""
                    style={{ display: "flex", maxWidth: "100%" }}
                  >
                    {/* {contactTypes.map((contactType) => (
                    <AddPhone key={contactType.id} contactType={contactType} />
                  ))} */}
                    <Input
                      id="phone"
                      type="text"
                      placeholder="Phone"
                      labelIcon={phoneIcon}
                    />
                    <Input
                      id="instagram"
                      type="url"
                      placeholder="Instagram"
                      labelIcon={instagramIcon}
                      required={false}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <Input
                      id="facebook"
                      type="url"
                      placeholder="Facebook"
                      labelIcon={facebookIcon}
                      required={false}
                    />
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="Linkedin"
                      labelIcon={linkedinIcon}
                      required={false}
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <Input
                  id="email"
                  type="email"
                  required={true}
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="action_container">
          <Button
            onClick={handleCancel}
            title="Cancel"
            className="action_btn cancel_btn"
          />

          <Button title="Save" className="action_btn" />
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
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
    profileImage: state.formReducer.image,
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
    cleanImages: () => dispatch(cleanImages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditMember);
