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
} from "./types";

const initialState = {
  loading: false,
  pastEvents: [],
  upcomingEvents: [],
  error: null,
  count: 0,
  currentPage: 1,
  success: null,
  event: {},
  detailsImages: [],
  addresses: [],
  eventDetails: [],
  eventsByPage: [],
};

const reducer = (state = initialState, action) => {
  // console.log(action, " action payload");
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

        error: null,
      };
    case FETCH_EVENT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        eventDetails: [],
        error: action.payload.error,
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

    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
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

    default:
      return state;
  }
};

export default reducer;
