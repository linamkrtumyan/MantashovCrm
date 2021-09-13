import React, { useEffect, useState } from "react";
import request from "../../store/request";

function ViewsInfoPage({ modalOpen, setModalOpen, id }) {

  const [intentions, setIntentions] = useState([])
  useEffect(() => {
    if (id) {
      request(`/admin/events/event/intentions/${id}`)
        .then((data) => {
          setIntentions(data)
          
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [id]);


  return (
    <div className={"modal " + (modalOpen ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-centered">Info Event</p>
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
          <div>
            <div>
              {intentions ? (
                intentions.map((intention) => (
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginLeft: 10,
                        width: "50%",
                      }}
                    >
                      {intention.firstName} {intention.lastName}
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      {intention.intention === 'false' ? "Not viewed" : intention.intention}
                      </div>
                    <hr></hr>
                  </div>
                ))
              ) : (
                <p>Nothing to show</p>
              )}
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


export default ViewsInfoPage;

