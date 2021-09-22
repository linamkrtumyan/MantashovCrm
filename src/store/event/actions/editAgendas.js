import { EDIT_AGENDAS } from "../types";

export const editAgendas = (agendas) => {
  console.log(agendas, "||||||||||||||||||||||||||||||||||||||||||\\");
  return {
    type: EDIT_AGENDAS,
    payload: {
      agendas,
    },
  };
};
