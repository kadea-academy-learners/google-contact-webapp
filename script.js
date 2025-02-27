let contacts = [];

/**
 * Initialisation de l'application dès que le DOM est chargé.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Récupération des boutons "Créer un contact" dans la sidebar et dans le conteneur principal
  const sideBar = document.getElementById("side-bar");
  const sidebarAjouterBtn = sideBar.querySelector("button"); // premier bouton dans la sidebar

  const mainContainer = document.querySelector(".contact-container");
  const mainAjouterBtn = mainContainer.querySelector("button");

  // Ajout des écouteurs d'événements sur les boutons d'ajout
  sidebarAjouterBtn.addEventListener("click", () => ouvreContact());
  if (mainAjouterBtn) {
    mainAjouterBtn.addEventListener("click", () => ouvreContact());
  }

  // Affichage initial des contacts
  rendreContacts();
});

/**
 * Fonction de rendu des contacts dans la section principale.
 */
function rendreContacts() {
  const contactContainer = document.querySelector(".contact-container");
  const headerContacts = document.querySelector("#main-section h3.title");

  // Vider le conteneur de contacts
  contactContainer.innerHTML = "";

  // Utiliser tous les contacts sans filtrage
  const allContacts = contacts;

  // Mise à jour du compteur de contacts dans le titre
  headerContacts.innerHTML = `Contacts <span>(${allContacts.length})</span>`;

  // Si aucun contact n'est présent, afficher le message et le bouton "Créer un contact"
  if (allContacts.length === 0) {
    const videDiv = document.createElement("div");
    videDiv.innerHTML = `
      <div>
        <div class="illus-size-2rem">
          <img
            src="./assets/illustrations/emptycontacts_animation_cell4.png"
            alt="Empty contact illustration"
          />
        </div>
        <p class="text text-align-center">Aucun contact</p>
        <div class="flex justify-center items-center margin-top-bottom-1rem">
          <button class="button button-radius-10 no-border flex items-center" type="button">
            <span class="material-symbols-outlined margin-right-04rem">person</span>
            Créer un contact
          </button>
        </div>
      </div>
    `;
    contactContainer.appendChild(videDiv);

    // Ajout d'un écouteur sur le bouton "Créer un contact" de l'affichage vide
    videDiv
      .querySelector("button")
      .addEventListener("click", () => ouvreContact());
  } else {
    // Création d'un conteneur pour la liste des contacts
    const listContainer = document.createElement("div");
    listContainer.className = "contact-list";

    // Pour chaque contact, création de son élément d'affichage
    allContacts.forEach((contact) => {
      const contactDiv = document.createElement("div");
      contactDiv.className =
        "contact-item flex justify-s-between items-center margin-bottom-1rem";
      contactDiv.innerHTML = `
        <div class="contact-info">
          <h4>${contact.name}</h4>
          <p>${contact.email} - ${contact.phone}</p>
          ${contact.label ? `<p>Libellé : ${contact.label}</p>` : ""}
        </div>

        <div class="contact-actions">
          <button class="modifier-btn button" data-id="${contact.id}">
            <span class="material-symbols-outlined">Modifier</span>
          </button>
          <button class="supprimer-btn button" data-id="${contact.id}">
            <span class="material-symbols-outlined">Supprimer</span>
          </button>
        </div>
      `;
      listContainer.appendChild(contactDiv);
    });

    contactContainer.appendChild(listContainer);

    // Ajout des écouteurs sur les boutons "Modifier"
    document.querySelectorAll(".modifier-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        const contact = contacts.find((c) => c.id === id);
        if (contact) {
          ouvreContact(contact);
        }
      });
    });

    // Ajout des écouteurs sur les boutons "Supprimer"
    document.querySelectorAll(".supprimer-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        supprimeContact(id);
      });
    });
  }
}

// cette fonctjion permet d'afficher une petite fênetre s'affiche au-dessus du contenu principal
function ouvreContact(contact = null) {
  // Création de l'overlay de la modal
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  });

  // Création du conteneur de la modal
  const modal = document.createElement("div");
  modal.className = "modal";
  Object.assign(modal.style, {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
  });

  const modification = contact !== null;

  modal.innerHTML = `
    <h2>${modification ? "Modifier le contact" : "Créer un contact"}</h2>
    <form id="contact-form">
      <div>
        <label>Nom :</label>
        <input type="text" name="name" value="${
          modification ? contact.name : ""
        }" required />
      </div>
      <div>
        <label>Email :</label>
        <input type="email" name="email" value="${
          modification ? contact.email : ""
        }" required />
      </div>
      <div>
        <label>Téléphone :</label>
        <input type="text" name="phone" value="${
          modification ? contact.phone : ""
        }" required />
      </div>
      <div>
        <label>Libellé :</label>
        <input type="text" name="label" value="${
          modification && contact.label ? contact.label : ""
        }" />
      </div>
      <div style="margin-top:10px; display: flex; justify-content: space-between;">
        <button type="submit" class="button">${
          modification ? "Enregistrer" : "Créer"
        }</button>
        <button type="button" class="button cancel-btn">Annuler</button>
      </div>
    </form>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Gestion de la soumission du formulaire
  const form = modal.querySelector("#contact-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formElement = new FormData(form);
    const newContact = {
      id: modification ? contact.id : Date.now(),
      name: formElement.get("name"),
      email: formElement.get("email"),
      phone: formElement.get("phone"),
      label: formElement.get("label"),
    };

    if (modification) {
      // Mise à jour du contact existant
      const index = contacts.findIndex((c) => c.id === contact.id);
      if (index !== -1) {
        contacts[index] = newContact;
      }
    } else {
      // Ajout d'un nouveau contact
      contacts.push(newContact);
    }
    document.body.removeChild(overlay);
    rendreContacts();
  });

  // Bouton Annuler : fermeture de la modal
  modal.querySelector(".cancel-btn").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
}

// la fonction qui permet de supprimer un contact
function supprimeContact(id) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce contact ?")) {
    contacts = contacts.filter((contact) => contact.id !== id);
    rendreContacts();
  }
}

console.log(index);
