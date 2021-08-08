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
};

const reducer = (state = initialState, action) => {
  // console.log(action, " action payload");
  switch (action.type) {
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
        // upcomingEvents: action.payload.upcomingEvents,

        upcomingEvents: action.payload.upcomingEvents?.events,
        upcomingEventsCount: action.payload.pastEvents.count,

        error: null,
      };
    case FETCH_UPCOMING_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        upcomingEvents: [],
        error: action.payload.error,
      };

    //   case ADD_NEWS_REQUEST:
    //     return {
    //       ...state,
    //       loading: true,
    //     };
    //   case ADD_NEWS_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: null,
    //     };
    //   case ADD_NEWS_FAILURE:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: action.payload.error,
    //     };

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
