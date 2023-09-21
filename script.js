document.addEventListener("DOMContentLoaded", function () {
  const elem = document.querySelector('input[type="range"]');
  const target = document.querySelector('.value');

  // Get the "Most popular" label and its container
  const mostPopularLabelon = document.getElementById('most-popular-label-on');
  const mostPopularLabeltw = document.getElementById('most-popular-label-tw');
  const mostPopularLabelth = document.getElementById('most-popular-label-th');
  const pricingContainer = document.querySelector('.pricing-container');

  const pricingForm = document.getElementById("pricingForm"); // Replace with the appropriate form ID

  elem.addEventListener("input", function () {
      var newValue = elem.value;
      target.innerHTML = newValue;
      updateCardHighlight(newValue);
  });

  // Function to update the card highlighting and "Most popular" label
  function updateCardHighlight(newValue) {
      // Get the pricing cards by ID
      var freePlan = document.getElementById('free-plan');
      var proPlan = document.getElementById('pro-plan');
      var enterprisePlan = document.getElementById('enterprise-plan');

      if (newValue === '0') {
          // Hide the "Most popular" label when the slider is at 0
          mostPopularLabelon.style.display = 'none';
          mostPopularLabeltw.style.display = 'none';
          mostPopularLabelth.style.display = 'none';
          freePlan.classList.remove('highlighted');
          proPlan.classList.remove('highlighted');
          enterprisePlan.classList.remove('highlighted');
      } else if (newValue >= 1 && newValue <= 10) {
          // Highlight Plan 1 (Free)
          freePlan.classList.add('highlighted');
          proPlan.classList.remove('highlighted');
          enterprisePlan.classList.remove('highlighted');

          // Show the "Most popular" label and center it above the Free plan
          mostPopularLabelon.textContent = "Most popular";
          mostPopularLabelon.style.display = 'block';
          mostPopularLabeltw.style.display = 'none';
          mostPopularLabelth.style.display = 'none';

          // Append the Free plan card to the pricing container
          pricingContainer.innerHTML = '';
          pricingContainer.appendChild(freePlan);
          pricingContainer.appendChild(mostPopularLabelon);
      } else if (newValue >= 11 && newValue <= 20) {
          // Highlight Plan 2 (Pro)
          freePlan.classList.remove('highlighted');
          proPlan.classList.add('highlighted');
          enterprisePlan.classList.remove('highlighted');

          // Show the "Most popular" label and center it above the Pro plan
          mostPopularLabeltw.textContent = "Most popular";
          mostPopularLabeltw.style.display = 'block';
          mostPopularLabelon.style.display = 'none';
          mostPopularLabelth.style.display = 'none';

          // Append the Pro plan card to the pricing container
          pricingContainer.innerHTML = '';
          pricingContainer.appendChild(proPlan);
          pricingContainer.appendChild(mostPopularLabeltw);
      } else {
          // Highlight Plan 3 (Enterprise)
          freePlan.classList.remove('highlighted');
          proPlan.classList.remove('highlighted');
          enterprisePlan.classList.add('highlighted');

          // Show the "Most popular" label and center it above the Enterprise plan
          mostPopularLabelth.textContent = "Most popular";
          mostPopularLabelth.style.display = 'block';
          mostPopularLabeltw.style.display = 'none';
          mostPopularLabelon.style.display = 'none';

          // Append the Enterprise plan card to the pricing container
          pricingContainer.innerHTML = '';
          pricingContainer.appendChild(enterprisePlan);
          pricingContainer.appendChild(mostPopularLabelth);
      }
  }

  const closeModalBtns = document.querySelectorAll("#closeModalBtn");
  const openModalBtns = document.querySelectorAll("#openModalBtn");
  const modal = document.getElementById("myModal");

  function openModal() {
      modal.style.display = "block";
  }

  function closeModal() {
      modal.style.display = "none";
  }

  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
          closeModal();
      }
  });

  for (const closeButton of closeModalBtns) {
      closeButton.addEventListener("click", () => {
          modal.style.display = "none";
      });
  }

  for (const openButton of openModalBtns) {
      openButton.addEventListener("click", () => {
          modal.style.display = "block";
      });
  }

  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
  const successToast = document.getElementById('successToast');
    
  function showSuccessToast() {
      successToast.style.display = "block";

      setTimeout(function () {
          successToast.style.display = "none";
      }, 3000); // Hide the toast after 3 seconds (adjust as needed)
  }
  pricingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstname = document.getElementById('firstname').value;
      const middlename = document.getElementById('middlename').value;
      const lastname = document.getElementById('lastname').value;
      const phonenumber1 = document.getElementById('phonenumber1').value;
      const phonenumber2 = document.getElementById('phonenumber2').value;
      const phonenumber3 = document.getElementById('phonenumber3').value;
      const dob = document.getElementById('dob').value;
      const address = document.getElementById('address').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const country = document.getElementById('country').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const formData = new FormData(pricingForm);

      const apiUrl = "https://forms.maakeetoo.com/formapi/763";

      fetch(apiUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
      })
      .then(response => {
          if (response.ok) {
              alert('Form submission failed. Please try again later.');
              pricingForm.reset(); // Reset the form
          } else {
            alert('Form submitted successfully. Thank you!');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while submitting the form. Please try again later.');
      });
      
      modal.style.display = "none"; // Close the modal
  });
  const getDataButton = document.getElementById("getDataButton");
  getDataButton.addEventListener("click", fetchData);
  
  function fetchData() {
    const apiUrl = "https://forms.maakeetoo.com/formapi/763"; // Replace with your API endpoint URL
    const accessCode = "S1L9NN32XV18T8822JQI054VO"; // Replace with your actual access code
    const dataContainer = document.getElementById("dataContainer");
  
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Code": accessCode
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Use response.text() to get the HTML content
        } else {
          throw new Error("An error occurred.");
        }
      })
      .then((data) => {
        dataContainer.innerHTML = data; // Insert the HTML table into the container
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while fetching data from the API.");
      });
  }
  
  
  
});
