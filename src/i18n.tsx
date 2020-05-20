import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: {
          dark_theme: "Dark Theme",
          pallete_tip_1:
            "A primary color is the color displayed most frequently across your app’s screens and components.",
          pallete_tip_2:
            "A secondary color provides more ways to accent and distinguish your product. Having a secondary color is optional, and should be applied sparingly to accent select parts of your UI.",
          dark_theme_tip_1:
            "Dark theme turns the light surfaces of the page dark, creating an experience ideal for night. Try it out!",
          dark_theme_tip_2:
            "Your Dark theme setting will apply to this browser only.",
          language: "Language",
          group_name: "Group Name",
          active: "Active",
          organization: "Organization",
          deactive: "Deactive",
          user: "User",
          role: "Role",
          edit: "Edit",
          no_results_found: "No results found",
          function: "Function",
          group: "Group",
          add_new: "Add new",
          show: "Show",
          app_name: "Jiapu",
          add_person: "Add Person",
          functions: "Functions",
          secret_key: "Secret Key",
          lets_work: "Let's Work",
          lets_go: "Let's Go",
          sign_in: "SIGN IN",
          sign_out: "Sign out",
          username: "User name",
          password: "Password",
          delete: "Delete",
          this_field_is_required: "This field is required",
          dashboard: "Dashboard",
          users: "Users",
          fields: "Fields",
          database_viewer: "Database Viewer",
          export: "Export",
          import: "Import",
          roles: "Roles",
          batches: "Batches",
          monitor: "Monitor",
          quality_control: "Quality Control",
          search: "Search",
          total: "Total",
          add: "Add",
          show_search_options: "Show search options",
          organizations: "Organizations",
          name: "Name",
          add_new_group: "Add new group",
          groups: "Groups",
          email: "Email",
          fullname: "Full Name",
          saving: "Saving",
          updating: "Updating",
          deleting: "Deleting",
          url: "Url",
          home: "Home",
          dark: "Dark",
          primary: "Primary",
          pallete: "Pallete",
          secondary: "Secondary"
        },
        home: {
          no_rules: "It seems you don't have any rules"
        },
        theme: {
          dark: "On",
          light: "Off"
        },
        color: {
          red: "Red",
          pink: "Pink",
          purple: "Purple",
          deepPurple: "Deep Purple",
          indigo: "Indigo",
          blue: "Blue",
          lightBlue: "Light Blue",
          cyan: "Cyan",
          teal: "Teal",
          green: "Green",
          lightGreen: "Light Green",
          lime: "Lime",
          yellow: "Yellow",
          amber: "Amber",
          orange: "Orange",
          deepOrange: "Deep Orange"
        }
      },
      vi: {}
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
