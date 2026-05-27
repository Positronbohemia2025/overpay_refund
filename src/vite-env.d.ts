/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INTAKE_BASE_URL?: string;
  readonly VITE_NEWSLETTER_BASE_URL?: string;
  readonly VITE_MAX_UPLOAD_BYTES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS Modules: imported as a record of class names.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
