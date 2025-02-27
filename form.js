/*const contacts = []; // Liste des contacts

function displayContacts() {
  const contactContainer = document.querySelector('.contact-container');
  contactContainer.innerHTML = '';

  contacts.forEach(contact => {
    const contactElement = document.createElement('div');
    contactElement.classList.add('contact');
    contactElement.innerHTML = `
      <p>${contact.prenom} ${contact.nom}</p>
      <p>${contact.entreprise}</p>
      <p>${contact.fonction}</p>
      <p>${contact.email}</p>
      <p>${contact.telephone}</p>
    `;
    contactContainer.appendChild(contactElement);
  });
}

// Appelez cette fonction pour afficher les contacts
displayContacts();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const prenom = event.target.prenom.value;
  const nom = event.target.nom.value;
  const entreprise = event.target.entreprise.value;
  const fonction = event.target.fonction.value;
  const email = event.target.email.value;
  const telephone = event.target.telephone.value;

  const contact = {
    prenom,
    nom,
    entreprise,
    fonction,
    email,
    telephone
  };

  // Ajoutez le contact à la liste (à implémenter)
  addContact(contact);
});

function addContact(contact) {
  // Implémentez la logique pour ajouter le contact à la liste
  console.log('Contact ajouté:', contact);
}*/