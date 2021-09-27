import { EDIT_AGENDAS } from "../types";

export const editAgendas = (agendas) => {
  return {
    type: EDIT_AGENDAS,
    payload: {
      agendas,
    },
  };
};
