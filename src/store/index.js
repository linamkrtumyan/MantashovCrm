export { fetchMembersByPage } from "./members/actions";
export {
  fetchNewsByPage,
  fetchNewsDetails,
  deleteNews,
  transferNewsDelete,
  editNews,
  deleteNewsImageFromStore,
} from "./news/actions";
export { changeCurrentPage } from "./pagination/actions";
export { formOnChange } from "./form/actions";
export { onLoginFunction, authorize } from "./login/actions";
export {
  uploadImage,
  cleanImages,
  deletedImages,
  uploadOneImage,
  deleteImageFromStore,
} from "./images/actions";
export { openModal, closeModal, callAction } from "./modal/actions";

export { default } from "./configureStore";
