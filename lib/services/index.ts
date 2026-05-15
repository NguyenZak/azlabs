import { NAV_LINKS, TECH_STACK, MOCK_SERVICES } from "./data";
import { CMSService } from "./cmsService";

/**
 * SERVICE LAYER
 * This layer abstracts the data source (hardcoded vs DB).
 * Use these functions in your components to keep them clean.
 */

export const StaticService = {
  getNavLinks: () => NAV_LINKS,
  getTechStack: () => TECH_STACK,
  getServices: () => MOCK_SERVICES,
};

export { CMSService };

