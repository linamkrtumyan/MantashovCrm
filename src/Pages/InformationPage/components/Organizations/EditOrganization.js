import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Input from "../../../../Components/Forms/Input/Input";
import Multiselect from "../../../../Components/Forms/MultiSelect/Multiselect";
import OneImageUpload from "../../../../Components/Forms/OneImageUpload/OneImageUpload";
import Select from "../../../../Components/Forms/Select/Select";
import Textarea from "../../../../Components/Forms/Textarea/Textarea";
import store, {
  deletePosition,
  fetchPositionsAll,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchCategories,
  fetchOrganizationsTable,
  fetchOrganizationDetails,
  cleanForm,
  cleanLocation,
  cleanOrganization,
  cleanImages,
} from "../../../../store";
import { editOrganization } from "../../../../store/organizations/actions";

function EditOrganization({
  modalOpen,
  setModalOpen,
  id,
  fetchCountries,
  fetchStates,
  countries,
  countryId,
  states,
  stateId,
  cities,
  fetchCities,
  fetchCategories,
  categories,
  editOrganization,
  fetchOrganizationDetails,
  cleanForm,
  cleanOrganization,
  setEditId,
  headerImage,
  cleanImages,
}) {
  const [mainImg, setMainImg] = useState(true);
  const [orgImage, setOrgImage] = useState("");

  useEffect(() => {
    cleanForm();
    fetchCountries();
    fetchCategories();
    if (id) {
      fetchOrganizationDetails(id);
    }
    setOrgImage(headerImage);
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
    if (id) {
      fetchOrganizationDetails(id);
    }
  }, [id]);

  useEffect(() => {
    setOrgImage(headerImage);
  }, [headerImage]);

  const handleEdit = () => {
    let {
      locationArm,
      locationEng,
      locationRu,
      cityId,
      nameArm,
      nameEng,
      nameRu,
      categoryIds,
      hashTags,
    } = store.getState().formReducer;
    const image = store.getState().imageReducer.header[0]?.name ?? null;
    let organization = {
      address: { locationArm, locationEng, locationRu, cityId },
      organization: {
        id,
        nameArm,
        nameEng,
        nameRu,
        categoryIds,
        hashTags,
        image,
        imageDeleted: !mainImg,
      },
    };
    setModalOpen(false);
    editOrganization(organization);
    cleanForm();
    cleanImages();
    setEditId(null);
    cleanOrganization();
    setMainImg(true);
  };

  return (
    <div className={"modal " + (modalOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">
            Edit Organization
          </p>
          <button
            onClick={() => {
              setModalOpen(false);
              cleanForm();
              setEditId(null);
              cleanOrganization();
            }}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <div
            className="is-flex is-justify-content-center"
            style={{ marginBottom: "20px" }}
          >
            {mainImg ? (
              <div className="upload_cont">
                <img className="uploaded_image" src={`${headerImage}`} alt="" />
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
              // );
              // }
              <OneImageUpload label="Header Image" />
            )}
          </div>
          <div className="is-flex ">
            <Input id="nameArm" type="text" placeholder="Անվանում" />
            <Input id="nameEng" type="text" placeholder="Name" />
            <Input id="nameRu" type="text" placeholder="Название" />
          </div>
          <div className="is-flex is-justify-content-center">
            <Multiselect
              placeholder="Select Sphere"
              items={categories}
              id="categoryIds"
            />
          </div>

          <div className="is-flex ">
            <Select
              placeholder="Select Country"
              items={countries}
              id="countryId"
            />

            <Select placeholder="Select State" items={states} id="stateId" />

            <Select placeholder="Select City" items={cities} id="cityId" />
          </div>

          <div className="is-flex ">
            <Input id="locationArm" type="text" placeholder="Հասցե" />
            <Input id="locationEng" type="text" placeholder="Address" />
            <Input id="locationRu" type="text" placeholder="Адрес" />
          </div>
          <div>
            <div className="is-flex is-justify-content-center">
              <Textarea id="hashTags" type="text" placeholder="Hashtags" />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button
            onClick={() => {
              setModalOpen(false);
              cleanForm();
              setEditId(null);
              cleanOrganization();
            }}
            className="button"
          >
            Cancel
          </button>
          <button onClick={handleEdit} className="button is-primary">
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    categories: state.organizationsReducer.categories,
    headerImage: state.formReducer?.image,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrganizationDetails: (id) => dispatch(fetchOrganizationDetails(id)),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    deletePosition: (id) => dispatch(deletePosition(id)),
    fetchPositionsAll: () => dispatch(fetchPositionsAll()),
    fetchCategories: () => dispatch(fetchCategories()),
    editOrganization: (organization) =>
      dispatch(editOrganization(organization)),
    cleanForm: () => dispatch(cleanForm()),
    cleanImages: () => dispatch(cleanImages()),
    cleanLocation: () => dispatch(cleanLocation()),
    cleanOrganization: () => dispatch(cleanOrganization()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOrganization);
