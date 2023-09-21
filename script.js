var elem = document.querySelector('input[type="range"]');
var target = document.querySelector('.value');

// Get the "Most popular" label and its container
var mostPopularLabelon = document.getElementById('most-popular-label-on');
var mostPopularLabeltw = document.getElementById('most-popular-label-tw');
var mostPopularLabelth = document.getElementById('most-popular-label-th');
var pricingContainer = document.querySelector('.pricing-container');

// Function to update the card highlighting and "Most popular" label
function updateCardHighlight(newValue) {
    // Get the pricing cards by ID
    var freePlan = document.getElementById('free-plan');
    var proPlan = document.getElementById('pro-plan');
    var enterprisePlan = document.getElementById('enterprise-plan');

    if (newValue === '0') {
        // Hide the "Most popular" label when slider is at 0
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

elem.addEventListener("input", function () {
    var newValue = elem.value;
    target.innerHTML = newValue;
    updateCardHighlight(newValue);
});
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
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
    const submitBtn = document.getElementById("submitBtn");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const slider = document.getElementById("slider").value;
      const selectedPlan = document.querySelector(
        'input[name="plan"]:checked'
      ).value;
  
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Slider:", slider);
      console.log("Selected Plan:", selectedPlan);
  
      const formData = {
        name: name,
        email: email,
        slider: slider,
        selectedPlan: selectedPlan,
      };
  
       const apiUrl = "https://forms.maakeetoo.com/formapi/748";
      //const proxyServer = "https://cors-anywhere.herokuapp.com/";
      fetch("https://forms.maakeetoo.com/formapi/748", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "AccessCode": "5133D6YDPLFVKX3UU3RSSLN63",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => console.log("res", response))
        .then((data) => {
          console.log("API Response:", data);
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
  
      showSuccessToast();
  
      form.reset();
    });
  });
  
  function showSuccessToast() {
    var toast = document.getElementById("toast");
    toast.style.display = "block";
  
    setTimeout(function () {
      toast.style.display = "none";
    }, 3000);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");
    const sliderValue1 = document.getElementById("sliderValue");
    const freeRadio = document.getElementById("free");
    const proRadio = document.getElementById("pro");
    const enterpriseRadio = document.getElementById("enterprise");
  
    function updateSliderValue() {
      if (freeRadio.checked) {
        slider.value = 10;
      } else if (proRadio.checked) {
        slider.value = 35;
      } else if (enterpriseRadio.checked) {
        slider.value = 75;
      }
    }
  
    slider.value = 50;
    sliderValue.value = slider.value;
  
    slider.addEventListener("input", function () {
      sliderValue1.value = slider.value;
  
      const sliderValue = parseInt(slider.value);
  
      if (sliderValue >= 0 && sliderValue <= 20) {
        freeRadio.checked = true;
      } else if (sliderValue > 20 && sliderValue <= 50) {
        proRadio.checked = true;
      } else {
        enterpriseRadio.checked = true;
      }
    });
  
    freeRadio.addEventListener("change", updateSliderValue);
    proRadio.addEventListener("change", updateSliderValue);
    enterpriseRadio.addEventListener("change", updateSliderValue);
  });
  const getDataButton = document.getElementById("getDataButton");
getDataButton.addEventListener("click", fetchData);

// Function to fetch and display data
function fetchData() {
    // Replace with your actual API endpoint
    const accessCode = "5133D6YDPLFVKX3UU3RSSLN63"; 
    const apiUrl = "https://forms.maakeetoo.com/formapi/748";
    //const proxyServer = "https://cors-anywhere.herokuapp.com/";
    // Make a GET request to the endpoint with the access code in the header
    fetch("https://forms.maakeetoo.com/formapi/748", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "AccessCode": "5133D6YDPLFVKX3UU3RSSLN63",
        }
    })
    .then(response => response.json())
    .then(data => {
        // Display the retrieved data in the "dataContainer" div
        const dataContainer = document.getElementById("dataContainer");
        dataContainer.innerHTML = JSON.stringify(data, null, 2); // Convert data to JSON format for display
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}