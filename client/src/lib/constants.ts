import { ICON_PATHS } from "./icons";

export const NAV_ITEMS = [
  {
    label: "home",
    href: "/",
    iconPaths: ICON_PATHS.home,
  },
  {
    label: "people",
    href: "/people",
    iconPaths: ICON_PATHS.people,
  },
  {
    label: "jobs",
    href: "/jobs",
    iconPaths: ICON_PATHS.briefcase,
  },
  {
    label: "messaging",
    href: "/messaging",
    iconPaths: ICON_PATHS.chat,
  },
  {
    label: "notifications",
    href: "/notifications",
    iconPaths: ICON_PATHS.bell,
  },
];

export const SIDEBAR_ROUTES = ["/", "/notifications", "/jobs", "/network"];
