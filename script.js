const dataPath = "data.json";
let siteData = null;

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

const cleanPhone = (phone) => String(phone || "").replace(/\D/g, "");

const whatsappUrl = (phone, message = "") => {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/91${cleanPhone(phone)}${text}`;
};

const mapUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

const setText = (selector, value) => {
  qsa(selector).forEach((element) => {
    element.textContent = value;
  });
};

const setHref = (selector, value) => {
  qsa(selector).forEach((element) => {
    element.href = value;
  });
};

const renderServices = (services) => {
  const servicesGrid = qs("[data-services]");
  const serviceSelect = qs("[data-service-select]");

  servicesGrid.innerHTML = services
    .map(
      (service) => `
        <article class="service-card reveal">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </article>
      `
    )
    .join("");

  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.append(option);
  });
};

const renderGallery = (images) => {
  const gallery = qs("[data-gallery]");
  gallery.innerHTML = images
    .map(
      (image) => `
        <button class="gallery-item reveal" type="button" aria-label="Open ${image.alt}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>
      `
    )
    .join("");

  const lightbox = qs("[data-lightbox]");
  const lightboxImage = qs("[data-lightbox-image]");

  qsa(".gallery-item", gallery).forEach((button, index) => {
    button.addEventListener("click", () => {
      lightboxImage.src = images[index].src;
      lightboxImage.alt = images[index].alt;
      lightbox.classList.add("open");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightboxImage.src = "";
  });
};

const initBooking = (data) => {
  const form = qs("[data-booking-form]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const service = formData.get("service");
    const date = formData.get("date");
    const message = `Hello JO'STYLE, I would like to book an appointment.%0AName: ${name}%0AService: ${service}%0ADate: ${date}`;

    window.open(whatsappUrl(data.phone, decodeURIComponent(message)), "_blank", "noopener");
  });
};

const initRevealAnimations = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  qsa(".reveal").forEach((element) => observer.observe(element));
};

const initNavigation = () => {
  const toggle = qs(".nav-toggle");
  const links = qsa(".nav-links a");

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

const renderSite = (data) => {
  siteData = data;
  document.title = `${data.businessName} | ${data.tagline}`;

  setText("[data-business-name]", data.businessName);
  setText("[data-tagline]", data.tagline);
  setText("[data-address]", data.address);
  setText("[data-founder-name]", data.founder.name);
  setText("[data-founder-description]", data.founder.description);

  qs("[data-hero-bg]").style.setProperty("--hero-image", `url("${data.images.hero}")`);
  qs("[data-founder-image]").src = data.founder.image;
  qs("[data-founder-image]").alt = data.founder.name;

  setHref("[data-phone-link]", `tel:${cleanPhone(data.phone)}`);
  setText("[data-phone-link]", data.phone);
  setHref("[data-instagram]", data.instagram);
  setHref("[data-map-link]", mapUrl(data.address));
  setHref("[data-whatsapp-link]", whatsappUrl(data.phone));

  renderServices(data.services);
  renderGallery(data.gallery);
  initBooking(data);
  initRevealAnimations();
};

fetch(dataPath)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to load data.json");
    }
    return response.json();
  })
  .then(renderSite)
  .then(initNavigation)
  .catch((error) => {
    console.error(error);
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p style="padding:16px;background:#65111f;color:white;margin:0;">Website data could not be loaded. Please check data.json.</p>'
    );
  });
