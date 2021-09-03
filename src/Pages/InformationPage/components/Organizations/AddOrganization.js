import React, { useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../../../Components/Forms/Input/Input";
import Select from "../../../../Components/Forms/Select/Select";
import store, {
  fetchOrganizationsTable,
  fetchPositionsAll,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchCategories,
  addOrganization,
  cleanForm,
  cleanLocation,
  cleanOrganization,
} from "../../../../store";

function AddOrganization({
  modalOpen,
  setModalOpen,

  fetchOrganizationsTable,
  cleanOrganization,
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
  addOrganization,
  cleanForm,
  cleanLocation,

  added,
  setAdded,
}) {
  console.log(modalOpen, "modalOpen");

  useEffect(() => {
    cleanForm();

    fetchCountries();
    fetchCategories();
    cleanOrganization();
    // cleanLocation();
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
      categoryId,
    } = store.getState().formReducer;

    let organization = {
      address: { locationArm, locationEng, locationRu, cityId },
      organization: { nameArm, nameEng, nameRu, categoryId },
    };
    setModalOpen(false);
    addOrganization(organization);
    setAdded(added + 1);

    // fetchOrganizationsTable();
    cleanForm();
  };
  return (
    <div className={"modal " + (modalOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">Add Organization</p>
          <button
            onClick={() => setModalOpen(false)}
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
            <Select
              placeholder="Select Category"
              items={categories}
              id="categoryId"
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
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button onClick={() => setModalOpen(false)} className="button">
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
  console.log(state, "state");
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer.stateId,
    cities: state.locationsReducer.cities,
    categories: state.organizationsReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanLocation: () => dispatch(cleanLocation()),
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    fetchOrganizationsTable: (id) => dispatch(fetchOrganizationsTable(id)),
    fetchPositionsAll: () => dispatch(fetchPositionsAll()),
    fetchCategories: () => dispatch(fetchCategories()),
    addOrganization: (organization) => dispatch(addOrganization(organization)),
    cleanForm: () => dispatch(cleanForm()),
    cleanOrganization: () => dispatch(cleanOrganization()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddOrganization);