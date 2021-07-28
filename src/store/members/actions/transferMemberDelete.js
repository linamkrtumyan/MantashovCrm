import { TRANSFER_MEMBER_DELETE } from "../types";

export const transferMemberDelete = (member) => {
  console.log(member, "mtav transfer");
  return (dispatch) => {
    dispatch({
      type: TRANSFER_MEMBER_DELETE,
      payload: { member },
    });
  };
};
