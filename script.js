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

const setSharedContent = (data) => {
  setText("[data-business-name]", data.businessName);
  setText("[data-tagline]", data.tagline);
  setText("[data-address]", data.address);
  setHref("[data-phone-link]", `tel:${cleanPhone(data.phone)}`);
  setText("[data-phone-link]", data.phone);
  setHref("[data-instagram]", data.instagram);
  setHref("[data-map-link]", mapUrl(data.address));
  setHref("[data-whatsapp-link]", whatsappUrl(data.phone));
};

const renderServices = (services) => {
  const servicesGrid = qs("[data-services]");
  const serviceSelect = qs("[data-service-select]");

  if (!servicesGrid || !serviceSelect) return;

  servicesGrid.innerHTML = services
    .map(
      (service, index) => `
        <button class="service-card reveal" type="button" data-service-index="${index}">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <span>${service.images && service.images.length ? "View examples" : "Details coming soon"}</span>
        </button>
      `
    )
    .join("");

  qsa("[data-service-index]", servicesGrid).forEach((card) => {
    card.addEventListener("click", () => {
      openServiceModal(services[Number(card.dataset.serviceIndex)]);
    });
  });

  services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.name;
    option.textContent = service.name;
    serviceSelect.append(option);
  });
};

const closeServiceModal = () => {
  const modal = qs("[data-service-modal]");

  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
};

const openServiceModal = (service) => {
  const modal = qs("[data-service-modal]");
  const title = qs("[data-service-modal-title]");
  const description = qs("[data-service-modal-description]");
  const gallery = qs("[data-service-modal-gallery]");

  if (!modal || !title || !description || !gallery) return;

  const images = service.images || [];
  title.textContent = service.name;
  description.textContent = service.description;
  gallery.innerHTML = images.length
    ? images
        .map(
          (image) => `
            <button class="service-modal-image" type="button" data-service-image="${image.src}" data-service-alt="${image.alt}" aria-label="Open ${image.alt}">
              <img src="${image.src}" alt="${image.alt}" loading="lazy" />
            </button>
          `
        )
        .join("")
    : '<p class="service-empty">Photos for this service will be added soon.</p>';

  qsa("[data-service-image]", gallery).forEach((button) => {
    button.addEventListener("click", () => {
      openLightbox(button.dataset.serviceImage, button.dataset.serviceAlt);
    });
  });

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
};

const initServiceModal = () => {
  const modal = qs("[data-service-modal]");
  const close = qs("[data-service-modal-close]");

  if (!modal || !close) return;

  close.addEventListener("click", closeServiceModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeServiceModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServiceModal();
    }
  });
};

const openLightbox = (src, alt) => {
  const lightbox = qs("[data-lightbox]");
  const lightboxImage = qs("[data-lightbox-image]");

  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
};

const initLightbox = () => {
  const lightbox = qs("[data-lightbox]");
  const lightboxImage = qs("[data-lightbox-image]");

  if (!lightbox || !lightboxImage) return;

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightboxImage.src = "";
  });
};

const renderGallery = (images) => {
  const gallery = qs("[data-gallery]");

  if (!gallery) return;

  gallery.innerHTML = images
    .map(
      (image) => `
        <button class="gallery-item reveal" type="button" aria-label="Open ${image.alt}">
          <img src="${image.src}" alt="${image.alt}" loading="lazy" />
        </button>
      `
    )
    .join("");

  qsa(".gallery-item", gallery).forEach((button, index) => {
    button.addEventListener("click", () => {
      openLightbox(images[index].src, images[index].alt);
    });
  });
};

const initBooking = (data) => {
  const form = qs("[data-booking-form]");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const service = formData.get("service");
    const date = formData.get("date");
    const message = `Hello JO'STYLE, I would like to book an appointment.\nName: ${name}\nService: ${service}\nDate: ${date}`;

    window.open(whatsappUrl(data.phone, message), "_blank", "noopener");
  });
};

const getCarouselIndex = (carousel) => Number(carousel.dataset.activeIndex || 0);

const setCarouselIndex = (carousel, index) => {
  const slides = qsa(".saree-slide", carousel);
  const dots = qsa(".saree-dot", carousel);
  const total = slides.length;

  if (!total) return;

  const nextIndex = (index + total) % total;
  carousel.dataset.activeIndex = String(nextIndex);

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === nextIndex);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === nextIndex);
  });
};

const startCarousel = (carousel) => {
  const slides = qsa(".saree-slide", carousel);

  if (slides.length <= 1) return;

  const interval = Number(carousel.dataset.interval || 3600);
  window.setInterval(() => {
    setCarouselIndex(carousel, getCarouselIndex(carousel) + 1);
  }, interval);
};

const renderSareeTypes = (data) => {
  const sareeData = data.sareeSales;
  const grid = qs("[data-saree-types]");

  if (!sareeData || !grid) return;

  document.title = `${data.businessName} | Saree Sales`;
  setText("[data-saree-title]", sareeData.title);
  setText("[data-saree-intro]", sareeData.intro);
  setText("[data-saree-section-heading]", sareeData.sectionHeading);

  const hero = qs("[data-saree-hero-bg]");
  if (hero) {
    hero.style.setProperty("--hero-image", `url("${sareeData.heroImage}")`);
  }

  grid.innerHTML = sareeData.types
    .map(
      (type, typeIndex) => `
        <article class="saree-type-card reveal">
          <div class="saree-carousel" data-active-index="0" data-interval="${type.interval || 3600}">
            <div class="saree-slides">
              ${type.images
                .map(
                  (image, imageIndex) => `
                    <button
                      class="saree-slide ${imageIndex === 0 ? "active" : ""}"
                      type="button"
                      data-saree-image="${image.src}"
                      data-saree-alt="${image.alt}"
                      aria-label="Open ${image.alt}"
                    >
                      <img src="${image.src}" alt="${image.alt}" loading="lazy" />
                    </button>
                  `
                )
                .join("")}
            </div>
            <div class="saree-carousel-controls" aria-label="${type.name} gallery controls">
              <button type="button" data-carousel-prev aria-label="Previous ${type.name} photo">Prev</button>
              <div class="saree-dots">
                ${type.images
                  .map(
                    (_, imageIndex) => `
                      <button
                        class="saree-dot ${imageIndex === 0 ? "active" : ""}"
                        type="button"
                        data-carousel-dot="${imageIndex}"
                        aria-label="Show ${type.name} photo ${imageIndex + 1}"
                      ></button>
                    `
                  )
                  .join("")}
              </div>
              <button type="button" data-carousel-next aria-label="Next ${type.name} photo">Next</button>
            </div>
          </div>
          <div class="saree-type-copy">
            <p class="eyebrow">Saree Type ${typeIndex + 1}</p>
            <h3>${type.name}</h3>
            <p>${type.description}</p>
            <span>${type.priceNote}</span>
            <a
              class="btn btn-primary"
              href="${whatsappUrl(
                data.phone,
                `Hello JO'STYLE, I am interested in ${type.name}. Please share available saree photos, colors, and price details.`
              )}"
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp
            </a>
          </div>
        </article>
      `
    )
    .join("");

  qsa(".saree-carousel", grid).forEach((carousel) => {
    qs("[data-carousel-prev]", carousel).addEventListener("click", () => {
      setCarouselIndex(carousel, getCarouselIndex(carousel) - 1);
    });

    qs("[data-carousel-next]", carousel).addEventListener("click", () => {
      setCarouselIndex(carousel, getCarouselIndex(carousel) + 1);
    });

    qsa("[data-carousel-dot]", carousel).forEach((dot) => {
      dot.addEventListener("click", () => {
        setCarouselIndex(carousel, Number(dot.dataset.carouselDot));
      });
    });

    qsa("[data-saree-image]", carousel).forEach((slide) => {
      slide.addEventListener("click", () => {
        openLightbox(slide.dataset.sareeImage, slide.dataset.sareeAlt);
      });
    });

    startCarousel(carousel);
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

  if (!toggle) return;

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

const renderHomePage = (data) => {
  document.title = `${data.businessName} | ${data.tagline}`;

  setText("[data-founder-name]", data.founder.name);
  setText("[data-founder-description]", data.founder.description);

  const hero = qs("[data-hero-bg]");
  if (hero) {
    hero.style.setProperty("--hero-image", `url("${data.images.hero}")`);
  }

  const founderImage = qs("[data-founder-image]");
  if (founderImage) {
    founderImage.src = data.founder.image;
    founderImage.alt = data.founder.name;
  }

  renderServices(data.services);
  renderGallery(data.gallery);
  initBooking(data);
};

const renderSite = (data) => {
  siteData = data;
  setSharedContent(data);
  renderHomePage(data);
  renderSareeTypes(data);
  initLightbox();
  initServiceModal();
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
