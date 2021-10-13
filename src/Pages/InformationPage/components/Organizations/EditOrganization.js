import React, { useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../../../Components/Forms/Input/Input";
import Multiselect from "../../../../Components/Forms/MultiSelect/Multiselect";
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
}) {
  useEffect(() => {
    if (id) {
      fetchOrganizationDetails(id);
    }
  }, [id]);
  useEffect(() => {
    cleanForm();
    fetchCountries();
    fetchCategories();
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

  const handleDelete = () => {
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

    let organization = {
      address: { locationArm, locationEng, locationRu, cityId },
      organization: { id, nameArm, nameEng, nameRu, categoryIds, hashTags },
    };
    setModalOpen(false);
    editOrganization(organization);
    cleanForm();
    setEditId(null);
    cleanOrganization();
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
          <button onClick={handleDelete} className="button is-primary">
            Save
          </button>
        </footer>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state, "state");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    categories: state.organizationsReducer.categories,
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
    cleanLocation: () => dispatch(cleanLocation()),
    cleanOrganization: () => dispatch(cleanOrganization()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOrganization);
