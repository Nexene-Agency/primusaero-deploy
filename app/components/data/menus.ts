import {Selectable} from "@framework/model";

export const SERVICE_MENU_ITEMS: Selectable[] = [
  {
    id: "privateAircraftOperation",
    name: "services.privateAircraftOperation",
    target: "#",
    context: "/images/services-1.png"
  },
  {
    id: "aircraftCharter", name: "services.aircraftCharter", target: "#",
    context: "/images/services-2.png"
  },
  {
    id: "aircraftAcquisition", name: "services.aircraftAcquisition", target: "#",
    context: "/images/services-3.png"
  },
  {
    id: "maintenance", name: "services.maintenance", target: "#",
    context: "/images/services-4.png"
  },
  {
    id: "technicalManagement", name: "services.technicalManagement", target: "#",
    context: "/images/services-5.png"
  },
  {
    id: "sparePartsAndLogistics", name: "services.sparePartsAndLogistics", target: "#",
    context: "/images/services-6.png"
  },
  {
    id: "consultingServices", name: "services.consultingServices", target: "#",
    context: "/images/services-7.png"
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