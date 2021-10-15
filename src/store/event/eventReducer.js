import {
  FETCH_PAST_EVENTS_REQUEST,
  FETCH_PAST_EVENTS_SUCCESS,
  FETCH_PAST_EVENTS_FAILURE,
  FETCH_UPCOMING_EVENTS_REQUEST,
  FETCH_UPCOMING_EVENTS_SUCCESS,
  FETCH_UPCOMING_EVENTS_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  TRANSFER_EVENT_DELETE,
  FETCH_EVENT_DETAILS_REQUEST,
  FETCH_EVENT_DETAILS_SUCCESS,
  FETCH_EVENT_DETAILS_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  FETCH_EVENTS_BY_PAGE_REQUEST,
  FETCH_EVENTS_BY_PAGE_SUCCESS,
  FETCH_EVENTS_BY_PAGE_FAILURE,
  FETCH_EVENT_FOR_EDIT_REQUEST,
  FETCH_EVENT_FOR_EDIT_SUCCESS,
  FETCH_EVENT_FOR_EDIT_FAILURE,
  EVENT_EDIT_REQUEST,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_FAILURE,
  CLEAN_EVENT,
  EDIT_AGENDAS,
  EDIT_IMAGES,
  DELETE_EVENT_IMAGE_FROM_STORE,
} from "./types";

const initialState = {
  loading: false,
  pastEvents: [],
  upcomingEvents: [],
  error: null,
  count: 0,
  currentPage: 1,
  success: null,
  // fetch: false,
  event: {},
  detailsImages: [],
  addresses: [],
  eventDetails: [],
  eventsByPage: [],
  eventForEdit: [],
  agendas: [],
  eventImages: [],
  fetch: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_BY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_BY_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,

        eventsByPage: action.payload.eventsByPage.events,
        count: action.payload.eventsByPage.count,
        // membersByPage: [],

        error: null,
      };
    case FETCH_EVENTS_BY_PAGE_FAILURE:
      return {
        ...state,
        loading: false,

        eventsByPage: [],
        error: action.payload.error,
      };
    case FETCH_PAST_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pastEvents: action.payload.pastEvents?.events,
        pastEventsCount: action.payload.pastEvents.count,
        error: null,
      };
    case FETCH_PAST_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        pastEvents: [],
        error: action.payload.error,
      };

    case FETCH_UPCOMING_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_UPCOMING_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        upcomingEvents: action.payload.upcomingEvents?.events,
        upcomingEventsCount: action.payload.upcomingEvents.count,
        error: null,
      };
    case FETCH_UPCOMING_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        upcomingEvents: [],
        error: action.payload.error,
      };

    case FETCH_EVENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventDetails: action.payload.eventDetails,
        detailsImages: action.payload.eventDetails.images,
        error: null,
      };
    case FETCH_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        eventDetails: [],
        error: action.payload.error,
      };

    case DELETE_EVENT_IMAGE_FROM_STORE:
      return {
        ...state,
        detailsImages: [
          ...state.detailsImages.slice(0, action.payload.deleteId),
          ...state.detailsImages.slice(action.payload.deleteId + 1),
        ],
      };

    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case EVENT_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EVENT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case EVENT_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        fetch: false,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        fetch: true,
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        fetch: false,
      };

    case TRANSFER_EVENT_DELETE:
      return {
        ...state,
        event: action.payload.event,
      };

    //   case DELETE_NEWS_IMAGE_FROM_STORE:
    //     return {
    //       ...state,
    //       detailsImages: [
    //         ...state.detailsImages.slice(0, action.payload.deleteId),
    //         ...state.detailsImages.slice(action.payload.deleteId + 1),
    //       ],
    //     };
    case FETCH_EVENTS_BY_PAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_FOR_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,

        eventForEdit: action.payload.eventForEdit,
        detailsImages: action.payload.eventForEdit.images,
        error: null,
      };
    case FETCH_EVENT_FOR_EDIT_FAILURE:
      return {
        ...state,
        loading: false,

        eventForEdit: {},

        error: action.payload.error,
      };
    // case EVENT_EDIT_SUCCESS_FAILURE:
    //   return {
    //     ...state,
    //     success: true,
    //   };
    case CLEAN_EVENT:
      return {
        ...state,
        eventForEdit: {},
      };
    case EDIT_AGENDAS:
      return {
        ...state,
        agendas: action.payload.agendas,
      };
    case EDIT_IMAGES:
      return {
        ...state,
        eventImages: action.payload.eventImages,
      };
    default:
      return state;
  }
};

export default reducer;
