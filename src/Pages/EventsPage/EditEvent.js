import React, { useEffect, useState } from "react";
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

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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
  eventForEdit,
}) {
  const [showAgendas, setShowAgendas] = useState(true);

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
          {/* <div
            className="see-agendas-btn"
            // onClick={setShowAgendas(true)}
          >
            See Agenta
          </div> */}

          {/* {
            showAgendas ?
            eventForEdit.agenda.map(item => (
              <div style={{display: 'flex'}}>
                <Input id="dateAndTime" type="date" value={item.dateAndTime} />
                <div>{item.descriptionArm}</div>
              </div>
            )) : null
          } */}
          {eventForEdit && eventForEdit.images ? (
            <Slide>
              {eventForEdit.images.map((item) => (
                <div>
                   <img
                  className="img-for-edit"
                  src={`/images/events/${id}/${item}`}
                  
                />
                <button>
                  <img />
                </button>
                </div>
              ))}
            </Slide>
          ) : null}
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
  console.log(
    state.eventReducer.eventForEdit,
    "state.eventReducer.eventForEdit"
  );
  return {
    countries: state.locationsReducer.countries,
    countryId: state.formReducer?.countryId,
    states: state.locationsReducer.states,
    stateId: state.formReducer?.stateId,
    cities: state.locationsReducer.cities,
    eventForEdit: state.eventReducer.eventForEdit,
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
