import {Selectable} from "@framework/model";

export const SERVICE_MENU_ITEMS: Selectable[] = [
  {
    id: "private-aircraft-operation",
    name: "services.privateAircraftOperation",
    target: "services/private-aircraft-operation",
    context: "/images/services-1.png"
  },
  {
    id: "aircraft-acquisition", name: "services.aircraftAcquisition", target: "/services/aircraft-acquisition",
    context: "/images/services-3.png"
  },
  {
    id: "technical-management", name: "services.technicalManagement", target: "/services/technical-management",
    context: "/images/services-5.png"
  },
  {
    id: "consulting-services", name: "services.consultingServices", target: "/services/consulting-services",
    context: "/images/services-7.png"
  },
  {
    id: "aircraft-charter", name: "services.aircraftCharter", target: "/services/aircraft-charter",
    context: "/images/services-2.png"
  },
  {
    id: "maintenance", name: "services.maintenance", target: "/services/maintenance",
    context: "/images/services-4.png"
  },
  {
    id: "spare-parts-and-logistics",
    name: "services.sparePartsAndLogistics",
    target: "/services/spare-parts-and-logistics",
    context: "/images/services-6.png"
  },
];
export const MENU_ITEMS: Selectable[] = [
  {id: "services", name: "menu.services", target: "#", children: SERVICE_MENU_ITEMS},
  {id: "aboutUs", name: "menu.aboutUs", target: "#"},
  // {id: "partnersCustomers", name: "menu.partnersCustomers", target: "#"},
  {id: "newsroom", name: "menu.newsroom", target: "#"},
  {id: "contactUs", name: "menu.contactUs", target: "#"},
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