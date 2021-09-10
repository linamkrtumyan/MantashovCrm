import React, { useEffect } from "react";
import Input from "../../Components/Forms/Input/Input";
import Select from "../../Components/Forms/Select/Select";

import store, {
  // deletePosition,
  // fetchPositionsAll,
  fetchCountries,
  fetchStates,
  fetchCities,
  cleanForm,
  cleanLocation,
  fetchEventDetailsForEdit,
} from "../../store";

import { connect } from "react-redux";

function EditEvent({
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
  cleanForm,
  fetchEventDetailsForEdit,
}) {
  useEffect(() => {
    if (id) {
      fetchEventDetailsForEdit(id);
    }
  }, [id]);

  useEffect(() => {
    fetchCountries();
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
  return (
    <div className={"modal " + (modalOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">Edit Event</p>
          <button
            onClick={() => {
              setModalOpen(false);
              // cleanForm();
              // setEditId(null);
              // cleanOrganization();
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
          <div className="is-flex ">
            <Select placeholder="Country" items={countries} id="countryId" />
            <Select placeholder="State" items={states} id="stateId" />
            <Select placeholder="City" items={cities} id="cityId" />
          </div>
          <div className="is-flex ">
            <Input id="locationArm" type="text" placeholder="Հասցե" />
            <Input id="locationEng" type="text" placeholder="Address" />
            <Input id="locationRu" type="text" placeholder="Адрес" />
          </div>

          <div className="is-flex ">
            <Input
              id="descriptionArm"
              type="text"
              placeholder="Նկարագրություն"
            />
            <Input id="descriptionEng" type="text" placeholder="Descriprion" />
            <Input id="descriptionRu" type="text" placeholder="Описание" />
          </div>
          <div className="is-flex ">
            <Input id="startDate" type="date" placeholder="Start Date" />
            <Input id="endDate" type="date" placeholder="End Date" />
          </div>
          <hr></hr>
          {/* <div>
          <p>Agenta</p>
          <div className="is-flex ">
            <Input id="dateAndTime" type="date" placeholder="Date and time" />
            <Input id="description" type="text" placeholder="Descriprion" />
          </div>
          </div> */}
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button
            // onClick={() => {
            //   setModalOpen(false);
            //   cleanForm();
            //   setEditId(null);
            //   cleanOrganization();
            // }}
            className="button"
          >
            Cancel
          </button>
          <button
            //  onClick={handleDelete}
            className="button is-primary"
          >
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountries: () => dispatch(fetchCountries()),
    fetchStates: (country) => dispatch(fetchStates(country)),
    fetchCities: (state) => dispatch(fetchCities(state)),
    // deletePosition: (id) => dispatch(deletePosition(id)),
    // fetchPositionsAll: () => dispatch(fetchPositionsAll()),
    cleanForm: () => dispatch(cleanForm()),
    cleanLocation: () => dispatch(cleanLocation()),
    fetchEventDetailsForEdit: (id) => dispatch(fetchEventDetailsForEdit(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
