import {Selectable} from "@framework/model";

export const SERVICE_MENU_ITEMS: Selectable[] = [
  {
    id: "private-aircraft-operation",
    name: "services.privateAircraftOperation",
    target: "/services/private-aircraft-operation",
    context: "/images/private-aircraft-operation-mobile.webp"
  },
  {
    id: "aircraft-acquisition", name: "services.aircraftAcquisition", target: "/services/aircraft-acquisition",
    context: "/images/aircraft-acquisition-mobile.webp"
  },
  {
    id: "technical-management", name: "services.technicalManagement", target: "/services/technical-management",
    context: "/images/technical-management-mobile.webp"
  },
  {
    id: "consulting-services", name: "services.consultingServices", target: "/services/consulting-services",
    context: "/images/consulting-services-mobile.webp"
  },
  {
    id: "aircraft-charter", name: "services.aircraftCharter", target: "/services/aircraft-charter",
    context: "/images/aircraft-charter-mobile.webp"
  },
  {
    id: "maintenance", name: "services.maintenance", target: "/services/maintenance",
    context: "/images/maintenance-mobile.webp"
  },
  {
    id: "spare-parts-and-logistics",
    name: "services.sparePartsAndLogistics",
    target: "/services/spare-parts-and-logistics",
    context: "/images/spare-parts-and-logistics-mobile.webp"
  },
];
export const MENU_ITEMS: Selectable[] = [
  {id: "services", name: "menu.services", target: "#", children: SERVICE_MENU_ITEMS},
  {id: "aboutUs", name: "menu.aboutUs", target: "#"},
  // {id: "partnersCustomers", name: "menu.partnersCustomers", target: "#"},
  {id: "newsroom", name: "menu.newsroom", target: "#"},
  {id: "contactUs", name: "menu.contactUs", target: "/contact-us"},
];

export const LEGAL_MENU_ITEMS: Selectable[] = [
  {id: "notice", name: "footer.legal.notice", target: "#"},
  {id: "terms", name: "footer.legal.terms", target: "#"},
  {id: "privacy", name: "footer.legal.privacy", target: "#"},
  {id: "cookie", name: "footer.legal.cookie", target: "#"},
];

export const TESTIMONIALS_MENU_ITEMS: Selectable[] = [
  {id: "testimonials", name: "footer.testimonials.customers", target: "#"},
];

export const SOCIALS_MENU_ITEMS: Selectable[] = [
  {id: "facebook", name: "socials.facebook", target: "#"},
  {id: "linkedin", name: "socials.linkedin", target: "#"},
  {id: "instagram", name: "socials.instagram", target: "#"},
];